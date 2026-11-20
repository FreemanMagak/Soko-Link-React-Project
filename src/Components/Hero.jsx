import FeaturedProduce from "./FeaturedProduce"
import { Link } from "react-router-dom"

export default function Hero({ produces }) {
    return (
        <>
            <section className="hero" id="home">

                <div className="hero-content">

                    <h1 className="hero-tagline">
                        Soko<span>Link</span>
                    </h1>

                    <h2 className="hero-slogan">
                        Know the Price.<br />
                        Find the Market.
                    </h2>

                    <p className="hero-description">
                        SokoLink connects farmers to market prices and better selling opportunities, <br />helping you make informed decisions and get more value from your harvest.
                    </p>

                    <div className="hero-btn">
                        <Link className="findproduce-btn" to="/market-price">Find Produce</Link>
                        <Link className="findproduce-btn" to="/listing">Sell Produce</Link>
                        <Link className="checkmarketprice-btn" to="/market-price">Check Market Prices</Link>
                    </div>
                </div>

            </section>

            <section className="lureSec" >

                <div className="betterPrice">
                    <i className="bi bi-leaf-fill" id="leaficon"> </i>
                    <h3 className="betterPrice-Head">Better Price </h3>
                    <p>Get real-time market prices <br /> and sell at your best value</p>

                </div>

                <div className="MoreBuyers">
                    <i className="bi bi-people-fill" id="peopleicon"></i>
                    <h3 className="betterPrice-Head">Better Price </h3>
                    <p> Connect with trusted buyers <br /> like hotels, schools and traders</p>

                </div>

                <div className="lessWaste">
                    <i className="bi bi-shield-fill-check" id="shieldicon"></i>
                    <h3 className="betterPrice-Head">Less Waste </h3>
                    <p>Find buyers before harvest<br /> and reduce post-harvest losses</p>
                </div>

                <div className="simpleToUse">
                    <i className="bi bi-phone-fill" id="phoneicon"></i>
                    <h3 className="betterPrice-Head">Better Price </h3>
                    <p>Works on your phone <br /> even basic ones &#40;USSD/SMS later&#41;</p>
                </div>

            </section>

            <section className="process-sec">

                <div className="process-tagline-div">

                    <p className="process-tagline">
                        Three Steps from Farm to buyer
                    </p>

                    <p className="process-slogan">
                        No Smartphone, no app download, no data bundle.
                    </p>

                </div>


                <div className="process-card">

                    <div className="process-card1">

                        <p className="process-p1">
                            List your produce
                        </p>

                        <p>
                            Dial the code, pick your crop then enter quantity, price and harvest date.
                        </p>

                    </div>

                    <div className="process-card2">

                        <p className="process-p2">
                            Get matched
                        </p>

                        <p>
                            We match your listing to buyers looking for your crop, in your area at your place
                        </p>

                    </div>

                    <div className="process-card3">

                        <p className="process-p3">
                            Agree and Sell
                        </p>

                        <p>
                            An SMS alert shares the buyer's details. Confirms the deal and record the sale.
                        </p>

                    </div>

                </div>

            </section>

            <section className="featproduce">

                <div className="process-tagline-div">
                    <h2 className="process-tagline">Featured Produce </h2>
                    <p className="process-slogan">Fresh Listings From Farmers Near You.</p>
                </div>

                <div className="Cards">
                    <FeaturedProduce featuredproduces={produces} />
                </div>

            </section>


        </>

    )
}
