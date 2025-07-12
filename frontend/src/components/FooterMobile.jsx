import './css/FooterMobile.css';
import LushaiLogoDark from '../assets/images/lushai-logo-dark.jpg';
import { NavLink } from 'react-router-dom';

const FooterMobile = () => {
    return (
        <div className='footer-mobile'>
            <div className='border'></div>
            <div className='footer-mobile-content'>
                <div className='footer-mobile-logo'>
                    <img
                        src={LushaiLogoDark}
                        alt='Lushai-logo'
                    />
                </div>
                <div className='footer-mobile-info'>
                    <div className='footer-mobile-nav'>
                        <details>
                            <summary>Navigation</summary>
                            <div className='footer-mobile-nav-list'>
                                <NavLink to='/'>Home</NavLink>
                                <NavLink to='/about'>About</NavLink>
                                <NavLink to='/treatments'>Treatments</NavLink>
                                <NavLink to='/contact'>Contact</NavLink>
                                <NavLink to='/booking'>Booking</NavLink>
                            </div>
                        </details>
                    </div>
                    <div className='footer-mobile-social'>
                        <details>
                            <summary>Social</summary>
                            <div className='footer-mobile-social-list'>
                                <a
                                    href='https://www.instagram.com/lushai_wellness/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Instagram
                                </a>
                                <a
                                    href='https://www.facebook.com/lushaiwellness/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Facebook
                                </a>
                            </div>
                        </details>
                    </div>
                    <div className='footer-mobile-links'>
                        <details>
                            <summary>Links</summary>
                            <div className='footer-mobile-links-list'>
                                <NavLink to='privacy'>Privacy Policy</NavLink>
                                <NavLink to='terms'>Terms & Conditions</NavLink>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterMobile;
