import { useState } from 'react';
import './css/Contact.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../utils/leafletIconFix';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';

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
        fetch('https://hook.eu2.make.com/621j5jmsirf9uvp310cqqsqukmwqbn5h', {
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
            <div>
                <MapPin />
                <a
                    href='https://maps.app.goo.gl/YgpDAzrJKpD92tg6A?g_st=aw'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    SY.NA, 363/6, Porba Vaddo, inside effotel by sayaji, Prabhu
                    wada, Calangute, Goa 403516, India
                </a>
            </div>
            <div>
                <Phone />
                <a
                    href='tel:+917038788903'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    +91 7038788903
                </a>
            </div>
            <div>
                <Mail />
                <a
                    href='mailto:lushai.wellness@gmail.com'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    lushai.wellness@gmail.com
                </a>
            </div>
            <div>
                <FaWhatsapp />
                <a href="https://wa.me/917038788903">
                    +91 7038788903
                </a>
            </div>
        </div>
    );
};

const Map = () => {
    return (
        <div className='contact-map'>
            <MapContainer
                center={[15.550952, 73.766432]}
                zoom={16}
                style={{ height: '400px', width: '100%' }}
            >
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; OpenStreetMap contributors'
                />
                <Marker position={[15.550952, 73.766432]}>
                    <Popup>
                        <p>
                            SY.NA, 363/6, Porba Vaddo, inside effotel by sayaji,
                            Prabhu wada, Calangute, Goa 403516, India
                        </p>
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
