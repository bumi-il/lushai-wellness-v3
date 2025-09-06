import './css/Service.css';

const Service = ({ service, activeService, setActiveService, index }) => {
    const { category, color, icon } = service;

    return (
        <div
            className='service'
            onMouseEnter={() => setActiveService(index)}
            onClick={() => setActiveService(index)}
            style={activeService === index ? { backgroundColor: color } : {}}
        >
            {/* <img src={icon} alt="" /> */}
            {/* <div className='service-mask-image-test'></div> */}
            <h3>
                {category.charAt(0).toUpperCase() +
                    category.split(' ')[1].charAt(0).toUpperCase()}
            </h3>
        </div>
    );
};

export default Service;
