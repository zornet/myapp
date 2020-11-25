import React from 'react';
import logo from "./assets/images/logo-conti.png";
import "../Styles/Footer.css"

const Footer = () => {
    return(
        <div className="main-footer">
            <div className="footer-container">
                <div className="footer-row">
                    {/* column1 */}
                    <div className="footer-col">
                        <img alt='Continental Logo' src={logo} className="conti-logo" />
                    </div>

                    <div className="footer-rights">
                    <p> &copy; Continental all rights reserved</p>
                    </div>

                    {/* column2 */}
                    <div className="footer-col2">
                        <h4>Contact</h4>
                        <ul className="list-unstyled">
                            <li>Alexandra Fofel</li>
                            <li>e-mail: alexandra.fofel@continental-corporation.com</li>
                        </ul>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Footer;