import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <>
            <footer>
                <div className="footer-content">

                    <div>
                        <h2>
                            Soko<span>Link</span>
                        </h2>

                        <p>
                            Your on-line market place
                        </p>
                    </div>

                    <div>
                        <h3>
                            Quick Links
                        </h3>

                        <nav className="navlink-footer" id="navlinks">
                            <Link to="/">Home</Link>
                            <Link to="/listing">Listings</Link>
                            <Link to="/market-price">Market Price</Link>
                            <Link to="/about">About</Link>
                        </nav>

                    </div>

                    <div>
                        <h3>
                            Contact Us
                        </h3>

                        <p>Email: Sokolink@gmail.com</p>
                        <p>+254769253890</p>

                    </div>

                </div>

                <div className="copyright">

                    <p>
                        &copy;2027 SokoLink. All Rights Reserved
                    </p>

                </div>

            </footer>
        </>
    )
}
