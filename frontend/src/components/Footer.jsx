import './css/Footer.css';
import LushaiLogo from '../assets/images/lushai-logo-dark.jpg';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='border'></div>
            <div className='footer-content'>
                <div className='footer-logo'>
                    <NavLink to='/'>
                        <img
                            src={LushaiLogo}
                            alt='Lushai-logo'
                        />
                    </NavLink>
                </div>
                <div className='footer-info'>
                    <div className='footer-nav'>
                        <h3>Navigation</h3>
                        <ul>
                            <li>
                                <NavLink to='/'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/about'>About</NavLink>
                            </li>
                            <li>
                                <NavLink to='/treatments'>Treatments</NavLink>
                            </li>
                            <li>
                                <NavLink to='/contact'>Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='footer-social'>
                        <h3>Social</h3>
                        <ul>
                            <li>
                                <a
                                    href='https://www.instagram.com/lushai_wellness/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href='https://www.facebook.com/lushaiwellness/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Facebook
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='footer-links'>
                        <h3>Links</h3>
                        <ul>
                            <li>
                                <NavLink to='/terms'>
                                    Terms & Conditions
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/privacy'>Privacy Policy</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
