import './css/Header.css';
import { NavLink } from 'react-router-dom';
import LushaiLogoDark from '../assets/images/lushai-logo-dark.jpg';
import LushaiLogoLight from '../assets/images/lushai-logo-light.jpg';
import LushaiLogo from '../assets/Lushai-logo.png';

const Logo = () => {
    return (
        <div className='header-logo'>
            <NavLink to='/'>
                <img
                    src={LushaiLogoDark}
                    alt='Lushai-logo'
                />
            </NavLink>
        </div>
    );
};

const Navigation = () => {
    return (
        <nav className='header-navigation'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/treatments'>Treatments</NavLink>
            <NavLink to='/contact'>Contact</NavLink>
            <NavLink to='/booking'>Booking</NavLink>
        </nav>
    );
};

const Header = () => {
    return (
        <header className='header'>
            <Logo />
            <Navigation />
        </header>
    );
};

export default Header;
