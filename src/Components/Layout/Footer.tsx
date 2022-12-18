import React from 'react'
import './Footer.scss'
import { FaFacebook, FaInstagramSquare, FaGithubAlt } from 'react-icons/fa'
const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="footer__wrapper">
                    <div className="socials">
                        <a href=""><FaFacebook /></a>
                        <a href=""><FaInstagramSquare /></a>
                        <a href=""><FaGithubAlt /></a>
                    </div>
                    <div className="footer-links">
                        <a href="">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer