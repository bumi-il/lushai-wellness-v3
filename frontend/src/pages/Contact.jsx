import { useState } from 'react';
import './css/Contact.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../utils/leafletIconFix';

const Form = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        setSubmitted(true);
        fetch('https://hook.eu2.make.com/p3ui0klbmbtbfgqgjav54iulg0ip0tjy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error('Email failed to send');
                }
                setForm({
                    firstName: '',
                    lastName: '',
                    email: '',
                    subject: '',
                    message: '',
                });
                setSubmitted(false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='contact-form-container'>
            <div className='contact-form-text'>
                <h1>Get in Touch</h1>
                <p>
                    Have a question or just want to say hi? We'd love to hear
                    from you.
                </p>
                <p>Fill up the form and our Team will get back to you soon.</p>
            </div>
            <form
                onSubmit={handleSubmit}
                className='contact-form'
            >
                <div>
                    <input
                        placeholder='First Name'
                        name='firstName'
                        type='text'
                        required
                        onChange={handleChange}
                        value={form.firstName}
                    />
                    <input
                        placeholder='Last Name'
                        name='lastName'
                        type='text'
                        required
                        onChange={handleChange}
                        value={form.lastName}
                    />
                </div>
                <div>
                    <input
                        placeholder='Email'
                        name='email'
                        type='email'
                        required
                        onChange={handleChange}
                        value={form.email}
                    />
                    <input
                        placeholder='Subject'
                        name='subject'
                        type='text'
                        onChange={handleChange}
                        value={form.subject}
                    />
                </div>
                <textarea
                    placeholder='Message'
                    name='message'
                    type='text'
                    required
                    onChange={handleChange}
                    value={form.message}
                />
                <button
                    type='submit'
                    onSubmit={handleSubmit}
                    disabled={submitted}
                >
                    {submitted ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

const Info = () => {
    return (
        <div className='contact-info'>
            <h1>Contact Information</h1>
            <p>
                Lalhmingthanga Building, Zarkawt, Aizawl, Mizoram 796007, India
            </p>
            <p>Phone: +91 1234567890</p>
            <p>Email: 0Np3l@example.com</p>
        </div>
    );
};

const Map = () => {
    return (
        <div className='contact-map'>
            <MapContainer
                center={[23.7271, 92.7197]}
                zoom={16}
                style={{ height: '400px', width: '100%' }}
            >
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; OpenStreetMap contributors'
                />
                <Marker position={[23.7271, 92.7197]}>
                    <Popup>
                        Lalhmingthanga Building, Zarkawt, Aizawl, Mizoram
                        796007, India
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

const Contact = () => {
    return (
        <div className='contact'>
            <Form />
            <div className='contact-info-container'>
                <Map />
                <Info />
            </div>
        </div>
    );
};

export default Contact;
