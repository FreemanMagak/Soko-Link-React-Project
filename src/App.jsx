import NavBar from "./Components/NavBar"
import Footer from "./Components/Footer"
import { Link, Route, Routes } from "react-router-dom"
import { ProduceProvider } from "./Context/ProduceProvider"
import Home from "./Page/Home"
import Listing from "./Page/Listing"
import MarketList from "./Page/MarketList"
import About from "./Page/About"
import LoginSignup from "./Page/LoginSignup"
import ProduceDetails from "./Page/ProduceDetails"

export default function App() {
  return (
    <ProduceProvider>
      <div className="app-shell">
        <NavBar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/listing/:id" element={<ProduceDetails />} />
            <Route path="/market-price" element={<MarketList />} />
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
    </ProduceProvider>
  )
}

