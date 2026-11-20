
import { useState } from "react"

export default function ProduceCards({ featuredproduce, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")

    const handleDelete = async () => {
        setIsDeleting(true)
        setDeleteError("")

        try {
            await onDelete(featuredproduce.id)
        } catch {
            setDeleteError("Failed to delete listing. Please try again.")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="featured-produce-card">
            <div className="produce-image">
                <img src={featuredproduce.image} alt={featuredproduce.name} />
            </div>
            <div className="produce-info">
                <h4 className="produce-type">{featuredproduce.name}</h4>
                <p className="produce-location">Location: {featuredproduce.location}</p>
                <p className="produce-price">Price Ksh: {featuredproduce.priceperkg}</p>
                <p className="produce-date">Date: {featuredproduce.harvestDate}</p>
                {onDelete && (
                    <button
                        className="delete-produce-btn"
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete Listing"}
                    </button>
                )}
                {deleteError && <p className="delete-error" role="alert">{deleteError}</p>}
            </div>
        </div>
    )
}
