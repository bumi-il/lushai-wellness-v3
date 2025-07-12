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
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/about'>About</NavLink>
                        <NavLink to='/treatments'>Treatments</NavLink>
                        <NavLink to='/contact'>Contact</NavLink>
                        <NavLink to='/booking'>Booking</NavLink>
                    </div>
                    <div className='footer-social'>
                        <h3>Social</h3>
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
                    <div className='footer-links'>
                        <h3>Links</h3>
                        <NavLink to='/terms'>Terms & Conditions</NavLink>
                        <NavLink to='/privacy'>Privacy Policy</NavLink>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
