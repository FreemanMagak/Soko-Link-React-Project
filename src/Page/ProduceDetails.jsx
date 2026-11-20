import { Link, useParams } from "react-router-dom"
import { useProduce } from "../Context/ProduceProvider"

export default function ProduceDetails() {
    const { id } = useParams()
    const { produces, isLoading } = useProduce()
    const produce = produces.find((item) => String(item.id) === id)

    if (isLoading) {
        return <main className="info-page">Loading listing...</main>
    }

    if (!produce) {
        return (
            <main className="info-page">
                <h1>Listing not found</h1>
                <Link to="/market-price">Return to Market Prices</Link>
            </main>
        )
    }

    return (
        <main className="produce-details-page">
            <Link to="/market-price">Back to Market Prices</Link>
            <article className="produce-details-card">
                <img src={produce.image} alt={produce.name} />
                <div>
                    <h1>{produce.name}</h1>
                    <p><strong>Location:</strong> {produce.location}</p>
                    <p><strong>Quantity:</strong> {produce.quantity} kg</p>
                    <p><strong>Price:</strong> Ksh {produce.priceperkg}/kg</p>
                    <p><strong>Harvest date:</strong> {produce.harvestDate}</p>
                </div>
            </article>
        </main>
    )
}
