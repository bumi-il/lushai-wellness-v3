import { useState } from 'react';
import './css/HeaderMobile.css';
import LushaiLogoDark from '../assets/images/lushai-logo-dark.jpg';
import LushaiLogoLight from '../assets/images/lushai-logo-light.jpg';
import LushaiLogo from '../assets/Lushai-logo.png';
import { NavLink } from 'react-router-dom';

const Logo = () => {
    return (
        <div className='header-mobile-logo'>
            <NavLink to='/'>
                <img
                    src={LushaiLogoDark}
                    alt='Lushai-logo'
                />
            </NavLink>
        </div>
    );
};

const Hamburger = ({ openMenu, setOpenMenu }) => {
    return (
        <div className='header-mobile-hamburger'>
            <label
                className='burger'
                htmlFor='burger'
            >
                <input
                    onChange={() => setOpenMenu((prev) => !prev)}
                    type='checkbox'
                    id='burger'
                    checked={openMenu}
                />
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
    );
};

const Menu = ({ setOpenMenu }) => {
    const handleClick = () => setOpenMenu(false);

    return (
        <div className='header-mobile-menu'>
            <div>
                <NavLink to='/' onClick={handleClick}>Home</NavLink>
                {/* <NavLink to='/about' onClick={handleClick}>About</NavLink> */}
                <NavLink to='/treatments' onClick={handleClick}>Treatments</NavLink>
                <NavLink to='/contact' onClick={handleClick}>Contact</NavLink>
            </div>
            <NavLink to='/booking' className='book-now' onClick={handleClick}>Book Now</NavLink>
        </div>
    );
};

const HeaderMobile = () => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <header className={'header-mobile ' + (openMenu ? 'open' : '')}>
            <div className='header-mobile-header'>
                <Logo />
                <Hamburger openMenu={openMenu} setOpenMenu={setOpenMenu} />
            </div>
            <Menu setOpenMenu={setOpenMenu} />
        </header>
    );
};

export default HeaderMobile;
