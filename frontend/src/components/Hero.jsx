import { useLushaiContext } from '../context/Context';
import './css/Hero.css';

const heroTexts = {
    about: 'About Us',
    booking: 'Booking Process and Policies',
    contact: 'Contact Us',
    treatments: 'Treatments and Services',
};

const Hero = () => {
    const { path, screenType } = useLushaiContext();

    return (
        <div className={'hero ' + (screenType === 'mobile' ? 'mobile' : '')}>
            <h1>{heroTexts[path]}</h1>
        </div>
    );
};

export default Hero;
