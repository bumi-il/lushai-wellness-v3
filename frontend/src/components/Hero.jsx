import { useLushaiContext } from '../context/Context';
import './css/Hero.css';

const heroTexts = {
    about: {
        header: 'About Us',
        description:
            'Discover our story and commitment to holistic wellness in India.',
    },
    treatments: {
        header: 'Treatments',
        description:
            'Explore our range of massages, facials and wellness packages.',
    },
    booking: {
        header: 'Book Now',
        description:
            'Secure your spot in paradise and rejuvenate with our holistic treatments.',
    },
    contact: {
        header: 'Contact Us',
        description:
            'Get in touch with us for any inquiries or to schedule an appointment.',
    },
};

const Hero = () => {
    const { path } = useLushaiContext();

    return (
        <div className='hero'>
            <h1>{heroTexts[path]?.header}</h1>
            <p>{heroTexts[path]?.description}</p>
        </div>
    );
};

export default Hero;
