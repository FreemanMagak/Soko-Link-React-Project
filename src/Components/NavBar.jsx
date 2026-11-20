import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <header className="siteheader">
            <div className="logo">
                <Link to="/">Soko <span>Link</span></Link>
                <small className="subtitle">Know the price. Find the market</small>
            </div>

            <nav className="navlinks" id="navlinks">
                <Link to="/">Home</Link>
                <Link to="/listing">Listings</Link>
                <Link to="/market-price">Market Price</Link>
                <Link to="/about">About</Link>
            </nav>

            <div className="header-action">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=menu" />
            </div>

            <div className="button">
                <Link className="account-link login-btn" id="login-btn" to="/login">Login</Link>
                <Link className="account-link signup-btn" id="signup-btn" to="/signup">Sign Up</Link>
            </div>
        </header>
    )
}
