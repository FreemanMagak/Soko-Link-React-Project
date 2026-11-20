import { useState } from "react"
import { Link } from "react-router-dom"

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const closeMenu = () => setIsMenuOpen(false)

    return (
        <header className="siteheader">
            <div className="logo">
                <Link to="/">Soko <span>Link</span></Link>
                <small className="subtitle">Know the price. Find the market</small>
            </div>

            <nav className={isMenuOpen ? "navlinks show" : "navlinks"} id="navlinks">
                <Link to="/" onClick={closeMenu}>Home</Link>
                <Link to="/listing" onClick={closeMenu}>Listings</Link>
                <Link to="/market-price" onClick={closeMenu}>Market Price</Link>
                <Link to="/about" onClick={closeMenu}>About</Link>
            </nav>

            <button
                className="menu-button"
                type="button"
                aria-controls="navlinks"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            >
                {isMenuOpen ? "Close" : "Menu"}
            </button>

            <div className="button">
                <Link className="account-link login-btn" id="login-btn" to="/login">Login</Link>
                <Link className="account-link signup-btn" id="signup-btn" to="/signup">Sign Up</Link>
            </div>
        </header>
    )
}
