import './css/Home.css';
import Footer from '../components/Footer';
import homeHeroVideo from '../assets/home-hero-video.mp4';
import { useLushaiContext } from '../context/Context';
import HeaderMobile from '../components/HeaderMobile';
import Header from '../components/Header';
import { NavLink } from 'react-router-dom';
import lushaiVisualization from '../assets/LushaiVisualization.jpg';
import services from '../data/services.json';
import Service from '../components/Service';
import { useEffect, useState } from 'react';
import LushaiLogoDark from '../assets/images/lushai-logo-dark.jpg';
import LushaiLogoLight from '../assets/images/lushai-logo-light.jpg';
import LushaiLogo from '../assets/Lushai-logo.png';
import FooterMobile from '../components/FooterMobile';

const specialArray = [
    'Certified, experienced therapists',
    'Organic oils and skincare',
    'Flexible booking and easy rescheduling',
];

const specialObjects = [
    {
        image: 'https://cdn.pixabay.com/photo/2021/10/19/11/35/yoga-6723315_1280.jpg',
        header: specialArray[0],
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quasi incidunt quos perspiciatis consectetur tenetur, dolorum culpa numquam nihil molestiae?',
    },
    {
        image: 'https://cdn.pixabay.com/photo/2021/10/19/11/35/yoga-6723315_1280.jpg',
        header: specialArray[1],
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quasi incidunt quos perspiciatis consectetur tenetur, dolorum culpa numquam nihil molestiae?',
    },
    {
        image: 'https://cdn.pixabay.com/photo/2021/10/19/11/35/yoga-6723315_1280.jpg',
        header: specialArray[2],
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quasi incidunt quos perspiciatis consectetur tenetur, dolorum culpa numquam nihil molestiae?',
    },
];

const HomeHeroHeader = () => {
    const { scrollPosition } = useLushaiContext();

    const start = window.innerHeight * 0.92;
    const end = window.innerHeight;
    const progress = Math.min(
        Math.max((scrollPosition - start) / (end - start), 0),
        1
    );

    const r = Math.round(255 - (255 - 18) * progress);
    const g = Math.round(255 - (255 - 58) * progress);
    const b = Math.round(255 - (255 - 41) * progress);

    const color = `rgb(${r}, ${g}, ${b})`;

    return (
        <header className='home-hero-header'>
            <NavLink
                to='/about'
                style={{ color: color }}
            >
                About
            </NavLink>
            <NavLink
                to='/treatments'
                style={{ color: color }}
            >
                Treatments
            </NavLink>
            <NavLink
                to='/contact'
                style={{ color: color }}
            >
                Contact
            </NavLink>
        </header>
    );
};

const HomeHero = ({ show }) => {
    return (
        <div className='home-hero-container'>
            <div className='home-hero'>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source
                        src={homeHeroVideo}
                        type='video/mp4'
                    />
                </video>
                <div className='home-hero-overlay'>
                    {show && (
                        <div className='home-hero-overlay-content'>
                            <div>
                                <h1>LUSHAI WELLNESS</h1>
                                <h2>Holistic Spa Experience In India</h2>
                                <NavLink to='/booking'>Book Now</NavLink>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Welcome = () => {
    return (
        <div className='home-welcome'>
            <div className='home-welcome-text'>
                <h1>LUSHAI WELLNESS</h1>
                <h2>Holistic Spa Experience In India</h2>
                <NavLink to='/booking'>Book Now</NavLink>
                {/* <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Recusandae aut assumenda veritatis optio quae, asperiores
                    aspernatur facilis ea quibusdam eveniet, odio laudantium
                    commodi nisi? Placeat error quos ex nihil, atque pariatur,
                    enim, numquam in animi dicta unde.
                </p> */}
                {/* <NavLink to='/booking'>Book Now</NavLink> */}
            </div>
        </div>
    );
};

const Services = () => {
    return (
        <div className='home-services'>
            <h2>Our Services</h2>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo dignissimos eveniet accusantium earum
            </p>
            <div className='home-services-container'>
                {services.map((service, index) => (
                    <Service
                        service={service}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

const Special = () => {
    return (
        <div className='home-special'>
            <div className='home-special-card'>
                <img
                    src={specialObjects[0].image}
                    alt=''
                />
                <h2>{specialObjects[0].header}</h2>
                <p>{specialObjects[0].text}</p>
            </div>
            <div className='home-special-card'>
                <img
                    src={specialObjects[1].image}
                    alt=''
                />
                <h2>{specialObjects[1].header}</h2>
                <p>{specialObjects[1].text}</p>
            </div>
            <div className='home-special-card'>
                <img
                    src={specialObjects[2].image}
                    alt=''
                />
                <h2>{specialObjects[2].header}</h2>
                <p>{specialObjects[2].text}</p>
            </div>
        </div>
    );
};

const Home = () => {
    const { screenType, scrollPosition } = useLushaiContext();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (scrollPosition > window.innerHeight) {
            setShow(true);
        }
    }, [scrollPosition]);

    const start = 0;
    const end = window.innerHeight;
    const progress = Math.min(
        Math.max((scrollPosition - start) / (end - start), 0),
        1
    );

    const r = Math.round(255 - (255 - 18) * progress);
    const g = Math.round(255 - (255 - 58) * progress);
    const b = Math.round(255 - (255 - 41) * progress);

    return (
        <div className='home'>
            {screenType === 'mobile' ? (
                <HeaderMobile />
            ) : (
                scrollPosition > 0 && (
                    <div
                        className={
                            'home-header ' +
                            (scrollPosition < window.innerHeight + 20
                                ? 'hide'
                                : '')
                        }
                    >
                        <Header />
                    </div>
                )
            )}
            <HomeHeroHeader />
            <HomeHero show={show} />
            <div
                className={
                    show
                        ? 'home-hero-overlay-text-move'
                        : 'home-hero-overlay-text'
                }
                style={{
                    color: `rgb(${r}, ${g}, ${b})`,
                }}
            >
                <div>
                    <img
                        src={LushaiLogoDark}
                        alt=''
                    />
                </div>
                <h1>LUSHAI WELLNESS</h1>
                <h2>Holistic Spa Experience In India</h2>
                <NavLink to='/booking'>Book Now</NavLink>
                <p>
                    Escape into tranquility at the heart of nature. Lushai
                    Wellness offers soul-soothing treatments, natural therapies,
                    and a serene setting within a luxury resort in India. Let
                    your body unwind, your mind quiet, and your spirit rise.
                    This is more than a spa – it's a journey back to yourself
                </p>
            </div>
            <main className='home-main'>
                <div className='home-divider-1'></div>
                {/* <Welcome /> */}
                <div className='home-divider-2'></div>
                <Services />
                <Special />
            </main>
            {screenType === 'mobile' ? <FooterMobile /> : <Footer />}
        </div>
    );
};

export default Home;
