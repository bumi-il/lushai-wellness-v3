import './css/Booking.css';

const Process = () => {
    return <div className='booking-process'>Process</div>;
};

const Policies = () => {
    return <div className='booking-policies'>Policies</div>;
};

const Booking = () => {
    return (
        <div className='booking'>
            <Process />
            <Policies />
        </div>
    );
};

export default Booking;
