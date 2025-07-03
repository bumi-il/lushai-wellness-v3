import './css/CardDetails.css';

const CardDetails = ({ cardDetails, setCardDetails }) => {
    return (
        <div
            className='card-details-container'
            onClick={() => setCardDetails({})}
        >
            <div
                className='card-details'
                onClick={(e) => e.stopPropagation()}
            >
                
            </div>
        </div>
    );
};

export default CardDetails;
