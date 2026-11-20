import { useState, useMemo } from "react"
import ProduceCards from "../Components/ProduceCards"
import { useProduce } from "../Context/ProduceProvider"

export default function MarketList() {
    const { produces } = useProduce()

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedLocation, setSelectedLocation] = useState("all")
    const [sortBy, setSortBy] = useState("default")

    // Extract unique locations from produces
    const availableLocations = useMemo(() => {
        const locations = new Set(produces.map((p) => p.location).filter(Boolean))
        return Array.from(locations)
    }, [produces])

    // Compute aggregated market benchmarks for each crop
    const marketBenchmarks = useMemo(() => {
        const map = {}
        produces.forEach((item) => {
            const cropName = item.name.trim()
            if (!map[cropName]) {
                map[cropName] = {
                    name: cropName,
                    prices: [],
                    totalQty: 0,
                    locations: new Set()
                }
            }
            map[cropName].prices.push(Number(item.priceperkg))
            map[cropName].totalQty += Number(item.quantity || 0)
            if (item.location) map[cropName].locations.add(item.location)
        })

        return Object.values(map).map((group) => {
            const min = Math.min(...group.prices)
            const max = Math.max(...group.prices)
            const avg = Math.round(group.prices.reduce((a, b) => a + b, 0) / group.prices.length)
            return {
                name: group.name,
                avgPrice: avg,
                minPrice: min,
                maxPrice: max,
                totalQty: group.totalQty,
                locations: Array.from(group.locations).join(", ")
            }
        })
    }, [produces])

    // Filter and sort produce listings
    const filteredProduces = useMemo(() => {
        let results = produces.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()))
            const matchesLocation =
                selectedLocation === "all" ||
                item.location.toLowerCase() === selectedLocation.toLowerCase()

            return matchesSearch && matchesLocation
        })

        if (sortBy === "price-low") {
            results = [...results].sort((a, b) => a.priceperkg - b.priceperkg)
        } else if (sortBy === "price-high") {
            results = [...results].sort((a, b) => b.priceperkg - a.priceperkg)
        } else if (sortBy === "quantity") {
            results = [...results].sort((a, b) => (b.quantity || 0) - (a.quantity || 0))
        }

        return results
    }, [produces, searchTerm, selectedLocation, sortBy])

    return (
        <section className="market-section" id="marketprice">
            <div className="market-header">
                <h2>Real-Time Market Prices</h2>
                <p>
                    Track live crop commodity prices across Kenya. Make a decisions whether to buy or sell.
                </p>
            </div>

            {/* Price Benchmark Cards */}
            <div className="market-benchmark-container">
                <h3 className="section-subtitle">Regional Price Benchmarks</h3>
                <div id="marketPriceResults">
                    {marketBenchmarks.length === 0 ? (
                        <div className="market-price-card">
                            <h4>No Market Data</h4>
                            <p>Market data will populate once produce is listed.</p>
                        </div>
                    ) : (
                        marketBenchmarks.map((bm) => (
                            <div className="market-price-card" key={bm.name}>
                                <div className="card-top">
                                    <h4 className="crop-title">{bm.name}</h4>
                                    <span className="price-tag">Avg Ksh {bm.avgPrice}/kg</span>
                                </div>
                                <div className="card-details">
                                    <p><strong>Price Range:</strong> Ksh {bm.minPrice} - Ksh {bm.maxPrice} / kg</p>
                                    <p><strong>Total Volume:</strong> {bm.totalQty.toLocaleString()} kg listed</p>
                                    <p><strong>Primary Hubs:</strong> {bm.locations || "Various"}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Filter & Search */}
            <div className="market-search-filter-bar">
                <div className="filter-input-group">
                    <label htmlFor="produceSearch">Search Crop or Market</label>
                    <input
                        id="produceSearch"
                        type="text"
                        placeholder="Search Tomatoes, Nakuru, etc..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-input-group">
                    <label htmlFor="locationFilter">Filter by Location</label>
                    <select
                        id="locationFilter"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                        <option value="all">All Locations</option>
                        {availableLocations.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-input-group">
                    <label htmlFor="sortFilter">Sort by</label>
                    <select
                        id="sortFilter"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="quantity">Largest Quantity</option>
                    </select>
                </div>

                {(searchTerm || selectedLocation !== "all" || sortBy !== "default") && (
                    <button
                        className="clear-filter-btn"
                        onClick={() => {
                            setSearchTerm("")
                            setSelectedLocation("all")
                            setSortBy("default")
                        }}
                    >
                        Reset Filters
                    </button>
                )}
            </div>

            {/* Filter Status Message */}
            <div id="marketMessage">
                <p>
                    Showing <strong>{filteredProduces.length}</strong> of {produces.length} produce listings
                    {selectedLocation !== "all" && ` in ${selectedLocation}`}
                    {searchTerm && ` matching "${searchTerm}"`}.
                </p>
            </div>

            {/* Filtered Produce Listings Display */}
            <div className="market-produce-grid">
                {filteredProduces.length === 0 ? (
                    <div className="no-produce-found">
                        <h4>No produce found matching your search.</h4>
                        <p>Try clearing your filters or check back later as farmers add fresh harvests.</p>
                    </div>
                ) : (
                    <div className="featuredproduce-section d-flex flex-wrap gap-3 justify-content-start">
                        {filteredProduces.map((produce) => (
                            <ProduceCards
                                key={produce.id}
                                featuredproduce={produce}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
