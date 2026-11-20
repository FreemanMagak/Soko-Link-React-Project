import NavBar from "./Components/NavBar"
import Footer from "./Components/Footer"
import { useState, useEffect } from "react"
import { Link, Route, Routes } from "react-router-dom"
import Home from "./Page/Home"
import Listing from "./Page/Listing"
import MarketList from "./Page/MarketList"
import About from "./Page/About"
import LoginSignup from "./Page/LoginSignup"

export default function App() {
  const [produces, setProduces] = useState([])
  const API = "http://localhost:3000/produces"

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setProduces(data))
      .catch((err) => console.error("Failed to fetch produce:", err))
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
    <div className="app-shell">
      <NavBar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home produces={produces} />} />
          <Route
            path="/listing"
            element={
              <Listing
                produces={produces}
                onAddProduce={addProduce}
                onDeleteProduce={deleteProduce}
              />
            }
          />
          <Route path="/market-price" element={<MarketList produces={produces} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginSignup mode="login" />} />
          <Route path="/signup" element={<LoginSignup mode="signup" />} />
          <Route path="*" element={<main className="info-page">
            <h1>Page not found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Return home</Link>
          </main>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

