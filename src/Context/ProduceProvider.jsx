import { createContext, useContext, useEffect, useState } from "react"

export const ProduceContext = createContext(null)
const API = "http://localhost:3000/produces"

export function ProduceProvider({ children }) {
    const [produces, setProduces] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(API)
            .then((response) => response.json())
            .then((data) => setProduces(data))
            .catch((error) => console.error("Failed to fetch produce:", error))
            .finally(() => setIsLoading(false))
    }, [])

    const addProduce = async (produce) => {
        const response = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produce)
        })

        if (!response.ok) {
            throw new Error("Failed to save produce listing")
        }

        const createdProduce = await response.json()
        setProduces((currentProduces) => [...currentProduces, createdProduce])
    }

    const deleteProduce = async (id) => {
        const response = await fetch(`${API}/${encodeURIComponent(id)}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error("Failed to delete produce listing")
        }

        setProduces((currentProduces) => currentProduces.filter((produce) => produce.id !== id))
    }

    return (
        <ProduceContext.Provider value={{ produces, addProduce, deleteProduce, isLoading }}>
            {children}
        </ProduceContext.Provider>
    )
}

export function useProduce() {
    const context = useContext(ProduceContext)

    if (!context) {
        throw new Error("useProduce must be used within a ProduceProvider")
    }

    return context
}
