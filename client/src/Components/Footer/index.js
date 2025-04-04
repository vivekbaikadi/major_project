

import { LuMilk } from "react-icons/lu";
import { LiaShippingFastSolid } from "react-icons/lia";
import { CiDiscount1 } from "react-icons/ci";
import { CiDollar } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { GrTwitter } from "react-icons/gr";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';





const Footer=()=>{
    return(
        <footer>
            <div className="container">
                <div className="topInfo row">
                    <div className="col d-flex align-items-center">
                        <span><LuMilk/></span>
                        <span className="ml-2">Everyday fresh products</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <span><LiaShippingFastSolid/></span>
                        <span className="ml-2">Free delivery for order over $70</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <span><CiDiscount1/></span>
                        <span className="ml-2">Daily Mega Discounts</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <span><CiDollar/></span>
                        <span className="ml-2">Best price on the market</span>
                    </div>
                </div>

                <div className="row mt-4 linkWrapper">
                    <div className="col">
                        <h5>FRUIT & VEGETABLES</h5>
                        <ul>
                            <li>Fresh Vegetables</li>
                            <li>Herbs & Seasonings</li>
                            <li>Fresh Fruits</li>
                            <li>Cuts & Sprouts</li>
                            <li>Exotic Fruits & Veggies</li>
                            <li>Packaged Produce</li>
                            <li>Party Trays</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>BREAKFAST & DAIRY</h5>
                        <ul>
                            <li>Milk & Flavoured Milk</li>
                            <li>Butter and Margarine</li>
                            <li>Cheese</li>
                            <li>Eggs Substitutes</li>
                            <li>Honey</li>
                            <li>Marmalades</li>
                            <li>Sour Cream and Dips</li>
                            <li>Yogurt</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>PERSONAL CARE</h5>
                        <ul>
                            <li>Shampoo & Conditioner</li>
                            <li>Body Wash & Soap</li>
                            <li>Toothpaste & Oral Care</li>
                            <li>Deodorants & Antiperspirants</li>
                            <li>Shaving Products</li>
                            <li>Feminine Care Products</li>
                            <li>Hair Care & Styling Products</li>
                            <li>Skin Care</li>
                            <li>Hand Sanitizers</li>
                            <li>Cotton Swabs & Pads</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>CLEANING SUPPLIES</h5>
                        <ul>
                            <li>Dishwashing Liquid & Detergent</li>
                            <li>Laundry Detergent & Fabric Softener</li>
                            <li>All-Purpose Cleaners</li>
                            <li>Disinfectant Wipes & Sprays</li>
                            <li>Glass & Window Cleaners</li>
                            <li>Floor Cleaners</li>
                            <li>Bleach & Surface Disinfectants</li>
                            <li>Sponges & Scrubbers</li>
                            <li>Paper Towels</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5>HOMECARE & HOUSEHOLD</h5>
                        <ul>
                            <li>Light Bulbs</li>
                            <li>Batteries</li>
                            <li>Air Fresheners & Candles</li>
                            <li>Pest Control Products</li>
                            <li>Cleaning Tools</li>
                            <li>Packaged Produce</li>
                            <li>Storage Containers & Organizers</li>
                        </ul>
                    </div>
                </div>

                <div className="copyright mt-3 pt-3 d-flex">
                    <p className="mb-0">copyright 2024. All rights reserved</p>
                    <ul className="list list-inline">
                        <li className="list list-inline-item">
                            <Link to="#"><FaFacebookF/></Link>
                        </li>
                        <li className="list list-inline-item">
                            <Link to="#"><GrTwitter/></Link>
                        </li>
                        <li className="list list-inline-item">
                            <Link to="#"><FaInstagram/></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
export default Footer;