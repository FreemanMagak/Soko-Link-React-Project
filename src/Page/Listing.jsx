import { useState } from "react"
import ProduceCards from "../Components/ProduceCards"

// Default images for popular produce
const defaultImages = {
    Tomatoes: "/Tomatoes.webp",
    Potatoes: "/potatoes.webp",
    Spinach: "/Spinach.jpg",
    Maize: "/maize.jpg"
    
}

//benchmark price
const marketBenchmarks = {
    tomatoes: { avg: 40, min: 35, max: 48 },
    potatoes: { avg: 30, min: 25, max: 36 },
    spinach: { avg: 35, min: 30, max: 42 },
    maize: { avg: 35, min: 32, max: 40 },
    
}

export default function Listing({ produces = [], onAddProduce, onDeleteProduce }) {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        quantity: "",
        priceperkg: "",
        harvestDate: "",
        image: ""
    })

    const [formMessage, setFormMessage] = useState(null)
    const [messageType, setMessageType] = useState("") // "success" | "error"
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Dynamic price benchmark suggestion based on typed crop name
    const cropKey = formData.name.trim().toLowerCase()
    const benchmark = marketBenchmarks[cropKey]

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        if (formMessage) setFormMessage(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.name.trim() || !formData.location.trim() || !formData.quantity || !formData.priceperkg || !formData.harvestDate) {
            setMessageType("error")
            setFormMessage("Please fill in all required fields before listing your produce.")
            return
        }

        setIsSubmitting(true)

        // Select fallback image 
        const autoImage = formData.image.trim() || defaultImages[formData.name.trim()] || "/Tomatoes.webp"

        const newListing = {
            name: formData.name.trim(),
            location: formData.location.trim(),
            quantity: Number(formData.quantity),
            priceperkg: Number(formData.priceperkg),
            harvestDate: formData.harvestDate,
            image: autoImage
        }

        try {
            if (onAddProduce) {
                await onAddProduce(newListing)
            }
            setMessageType("success")
            setFormMessage(`Success! ${newListing.name} (${newListing.quantity} kg) has been successfully listed.`)
            setFormData({
                name: "",
                location: "",
                quantity: "",
                priceperkg: "",
                harvestDate: "",
                image: ""
            })
        } catch {
            setMessageType("error")
            setFormMessage("Failed to list produce. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="listing-section" id="listings">
            <div className="listing-header">
                <h2>List Your Produce</h2>
                <p>
                    Connect directly to verified buyers. Enter your crop details, quantity, asking price, and harvest date to broadcast to the market.
                </p>
            </div>

            <div className="listing-content-layout">
                {/* Produce Listing Form */}
                <div className="form-wrapper">
                    <h3>Add New Produce Listing</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="cropName">Produce Name *</label>
                            <input
                                id="cropName"
                                name="name"
                                type="text"
                                placeholder="e.g. Tomatoes"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="cropLocation">Farm / Market Location *</label>
                            <input
                                id="cropLocation"
                                name="location"
                                type="text"
                                placeholder="e.g. Nakuru, Kapsabet"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="cropQuantity">Quantity Available (kg) *</label>
                            <input
                                id="cropQuantity"
                                name="quantity"
                                type="number"
                                min="1"
                                placeholder="e.g. 500"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="cropPriceInput">Price per Kg (Ksh) *</label>
                            <input
                                id="cropPriceInput"
                                name="priceperkg"
                                type="number"
                                min="1"
                                placeholder="e.g. 40"
                                value={formData.priceperkg}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Price Guidance Element */}
                        <div id="cropPrice">
                            {benchmark ? (
                                <span className="price-hint">
                                    <strong>Market Guide for {formData.name}:</strong> Average ~Ksh {benchmark.avg}/kg (Range: Ksh {benchmark.min} - {benchmark.max})
                                </span>
                            ) : formData.name ? (
                                <span className="price-hint-neutral">
                                    Pricing competitively helps you connect with buyers faster.
                                </span>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="harvestDate">Harvest Date *</label>
                            <input
                                id="harvestDate"
                                name="harvestDate"
                                type="date"
                                value={formData.harvestDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="cropImage">Image URL (Optional)</label>
                            <input
                                id="cropImage"
                                name="image"
                                type="text"
                                placeholder="Leave blank to use default image"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" disabled={isSubmitting} className="submit-listing-btn">
                            {isSubmitting ? "Submitting Listing..." : "List Produce Now"}
                        </button>

                        {/* Status Message */}
                        {formMessage && (
                            <div
                                id="formMessage"
                                className={messageType === "success" ? "alert-success-custom" : "alert-error-custom"}
                            >
                                {formMessage}
                            </div>
                        )}
                    </form>
                </div>

                {/* Info Box */}
                <div className="listing-guidelines-box">
                    <h3>Tips for Fast Selling</h3>
                    <ul>
                        <li><strong>Be Accurate with Quantities:</strong> Buyers plan logistics based on actual weights.</li>
                        <li><strong>Fair Price:</strong> Use our Market Price tab to ensure your price matches wholesale rates.</li>
                        <li><strong>Advance Listing:</strong> List at least 3-5 days before harvest to arrange transport with zero loss.</li>
                        <li><strong>Direct Inquiries:</strong> Buyers will contact you directly via phone once matched.</li>
                    </ul>

                    <div className="listing-stat-banner">
                        <i className="bi bi-shield-check"></i>
                        <span>Zero Broker Fees &middot; 100% Direct to Farmer</span>
                    </div>
                </div>
            </div>

            {/* Current Active Listings Display */}
            <div className="active-listings-container">
                <div className="active-listings-header">
                    <h3>Current Active Produce Listings ({produces.length})</h3>
                    <p>Live listings currently visible to buyers on SokoLink.</p>
                </div>

                {produces.length === 0 ? (
                    <p className="no-listings-text">No active listings yet. Add your first produce above!</p>
                ) : (
                    <div className="featuredproduce-section d-flex flex-wrap gap-3 justify-content-start">
                        {produces.map((produce) => (
                            <ProduceCards
                                key={produce.id}
                                featuredproduce={produce}
                                onDelete={onDeleteProduce}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
