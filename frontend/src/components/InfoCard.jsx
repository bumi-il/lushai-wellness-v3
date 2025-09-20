import './css/InfoCard.css';

const InfoCard = ({ info }) => {
    const { Icon, title, description, color } = info;

    return (
        <div className='info-card'>
            <div
                className='info-card-icon'
                style={{ backgroundColor: color }}
            >
                <Icon size={25} />
            </div>
            <div className='info-card-info'>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;
