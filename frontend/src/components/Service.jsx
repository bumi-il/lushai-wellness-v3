import './css/Service.css';
import {
    Sparkles,
    Heart,
    Droplet,
    Diamond,
    Gift,
    Flower2,
    Star,
} from 'lucide-react';

const Service = ({ service, activeService, setActiveService, index }) => {
    const { category, color, icon } = service;

    const icons = {
        Sparkles,
        Heart,
        Droplet,
        Diamond,
        Gift,
        Flower2,
        Star,
    };

    const Icon = icons[icon];

    return (
        <div
            className='service'
            onMouseEnter={() => setActiveService(index)}
            onClick={() => setActiveService(index)}
            style={activeService === index ? { backgroundImage: `linear-gradient(135deg, ${color}, white)`} : { backgroundColor: 'white' }}
        >
            {/* <img src={icon} alt="" /> */}
            {/* <div className='service-mask-image-test'></div> */}
            <Icon
                color={activeService === index ? 'white' : 'black'}
                size={30}
                
            />
        </div>
    );
};

export default Service;
