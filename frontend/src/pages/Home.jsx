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
import abc from '../data/treatments_list_v2.json';
import {
    Sparkles,
    Heart,
    Droplet,
    Diamond,
    Gift,
    Flower2,
    Star,
    Icon,
} from 'lucide-react';
import { Instagram } from 'react-feather';
import ContactImg from '../assets/images/contact-img.jpg';
import BookingImg from '../assets/images/booking-img.jpg';
import InfoCard from '../components/InfoCard';
import { Phone, Mail, MapPin, Clock, Calendar, User } from 'lucide-react';
import beautyTouch from '../assets/images/services home/beauty-touch.jpg';
import couplesExperience from '../assets/images/services home/couples-experience.jpg';
import finishingTouches from '../assets/images/services home/finishing-touches.jpg';
import lushaiPackages from '../assets/images/services home/lushai-packages.jpg';
import lushaiRituals from '../assets/images/services home/lushai-rituals.jpg';
import serenSkin from '../assets/images/services home/seren-skin.jpg';
import shortEscape from '../assets/images/services home/short-escape.png';

const servicesImages = {
    beautyTouch,
    couplesExperience,
    finishingTouches,
    lushaiPackages,
    lushaiRituals,
    serenSkin,
    shortEscape,
};

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
                to='/'
                style={{ color: color }}
            >
                Home
            </NavLink>
            {/* <NavLink
                to='/about'
                style={{ color: color }}
            >
                About
            </NavLink> */}
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
                <h2>Holistic Spa Experience</h2>
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
    const [activeService, setActiveService] = useState(0);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setActiveService((prev) => (prev + 1) % abc.length)
    //     }, 5000);
    // }, [activeService])

    const Icons = {
        Sparkles,
        Heart,
        Droplet,
        Diamond,
        Gift,
        Flower2,
        Star,
    };

    const Icon = Icons[abc[activeService].icon];

    return (
        <div className='home-services'>
            <h2>Our Services</h2>
            <div className='home-services-container'>
                <div className='home-services-list'>
                    {abc.map((service, index) => (
                        <Service
                            service={service}
                            key={index}
                            activeService={activeService}
                            setActiveService={setActiveService}
                            index={index}
                        />
                    ))}
                </div>
                <div className='home-services-active'>
                    <div className='home-services-active-details'>
                        <div className='home-services-active-category'>
                            {/* <img src={abc[activeService].icon} alt="" /> */}
                            <span
                                style={{
                                    // styled background image
                                    backgroundImage: `linear-gradient(to right bottom, ${abc[activeService].color}, white)`,
                                }}
                            >
                                <Icon
                                    color='white'
                                    size={30}
                                />
                            </span>

                            <h3>{abc[activeService].category}</h3>
                        </div>
                        <p>
                            {abc[activeService].description.replace('—', ',')}
                        </p>
                        <NavLink to='/treatments'>Details</NavLink>
                    </div>
                    <img
                        src={servicesImages[abc[activeService].image]}
                        alt={abc[activeService].alt}
                        loading='lazy'
                    />
                </div>
            </div>
        </div>
    );
};

const contactInfo = [
    {
        Icon: Phone,
        title: 'Phone',
        description: '+91 7038788903',
        link: 'tel:+917038788903',
        color: 'green',
    },
    {
        Icon: Mail,
        title: 'Email',
        description: 'lushai.wellness@gmail.com',
        link: 'mailto:lushai.wellness@gmail.com',
        color: 'blue',
    },
    {
        Icon: Instagram,
        title: 'Instagram',
        description: '@lushai.wellness',
        link: 'https://www.instagram.com/lushai_wellness/',
        color: 'red',
    },
    {
        Icon: MapPin,
        title: 'Address',
        description:
            'SY.NA, 363/6, Porba Vaddo, inside effotel by sayaji, Prabhu wada, Calangute, Goa 403516, India',
        link: 'https://maps.app.goo.gl/bc1acaVKiYJumniM6',
        color: 'black',
    },
    {
        Icon: Clock,
        title: 'Hours',
        description: '10:00 AM - 10:00 PM (Sunday to Saturday)',
        color: 'orange',
    },
];

const ContactHome = () => {
    return (
        <div className='home-contact'>
            <div className='home-contact-text'>
                {/* <h2>Have any questions?</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Enim culpa excepturi laboriosam maiores libero nemo hic.
                    Quibusdam labore repudiandae in adipisci recusandae modi
                    autem ad! Officiis placeat quos optio veniam.
                </p> */}
                <h2>Contact Us</h2>
                <div className='home-contact-info'>
                    {contactInfo.map((item, index) => (
                        <InfoCard
                            key={index}
                            info={item}
                        />
                    ))}
                </div>
                <NavLink to='/contact'>Contact Us</NavLink>
            </div>
            <img
                src={ContactImg}
                alt=''
            />
        </div>
    );
};

const bookInfo = [
    {
        Icon: Calendar,
        title: 'Date Selection',
        description: 'Convenient calendar with real-time availability',
        color: 'green',
    },
    {
        Icon: Clock,
        title: 'Flexible Schedule',
        description: 'Choose a time that works for you',
        color: 'red',
    },
    {
        Icon: User,
        title: 'Therapist Selection',
        description: 'Choose your therapist of choice',
        color: 'blue',
    },
    {
        Icon: Gift,
        title: 'Special Offers',
        description: 'Get exclusive discounts and promotions',
        color: 'orange',
    },
];

const BookHome = () => {
    return (
        <div className='home-book'>
            <img
                src={BookingImg}
                alt=''
            />
            <div>
                {/* <h2>Ready to Book?</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto vitae hic mollitia similique quos magnam totam
                    eligendi sapiente modi sed debitis officia omnis quibusdam
                    soluta rerum at, necessitatibus accusantium aspernatur!
                </p> */}
                <h2>Booking Details</h2>
                <div className='home-book-info'>
                    {bookInfo.map((item, index) => (
                        <InfoCard
                            key={index}
                            info={item}
                        />
                    ))}
                </div>
                <NavLink to='/booking'>Book Now</NavLink>
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
                <h2>Holistic Spa Experience</h2>
                <NavLink to='/booking'>Book Now</NavLink>
                <p>
                    Escape into tranquility at the heart of nature. Lushai
                    Wellness offers soul-soothing treatments, natural therapies,
                    and a serene setting. Let your body unwind, your mind quiet,
                    and your spirit rise. This is more than a spa – it's a
                    journey back to yourself
                </p>
            </div>
            <main className='home-main'>
                <div className='home-divider-1'></div>
                {/* <Welcome /> */}
                <div className='home-divider-2'></div>
                <Services />
                <ContactHome />
                <BookHome />
            </main>
            {screenType === 'mobile' ? <FooterMobile /> : <Footer />}
        </div>
    );
};

export default Home;
