import './css/Contact.css';

const Info = () => {
    return <div className='contact-info'>Info</div>;
};

const Map = () => {
    return <div className='contact-map'>Map</div>;
};

const Form = () => {
    return <div className='contact-form'>Form</div>;
};

const Contact = () => {
    return (
        <div className='contact'>
            <Form />
            <Info />
            <Map />
        </div>
    );
};

export default Contact;
