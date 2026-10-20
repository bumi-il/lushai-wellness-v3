import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../utils/leafletIconFix';
import { sendContactMessage } from '../utils/contactSubmission';
import './css/Contact.css';

const ADDRESS = 'SY.NA, 363/6, Porba Vaddo, inside effotel by sayaji, Prabhu wada, Calangute, Goa 403516, India';
const DIRECTIONS = 'https://maps.app.goo.gl/bc1acaVKiYJumniM6';
const POSITION = [15.550952, 73.766432];
const EMPTY_FORM = { firstName: '', lastName: '', email: '', subject: '', message: '' };

const contactOptions = [
    { Icon: Phone, label: 'Call us', detail: '+91 7038788903', href: 'tel:+917038788903' },
    { Icon: FaWhatsapp, label: 'Chat on WhatsApp', detail: '+91 7038788903', href: 'https://wa.me/917038788903' },
    { Icon: Mail, label: 'Email us', detail: 'lushai.wellness@gmail.com', href: 'mailto:lushai.wellness@gmail.com' },
];

const Form = () => {
    const [form, setForm] = useState(EMPTY_FORM);
    const [status, setStatus] = useState('idle');
    const sending = useRef(false);
    const isSending = status === 'sending';

    const handleChange = (event) => {
        const { name, value } = event.target;
        event.target.setCustomValidity('');
        setForm((previous) => ({ ...previous, [name]: value }));
        if (status !== 'idle') setStatus('idle');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (sending.current) return;
        const values = Object.fromEntries(
            Object.entries(form).map(([name, value]) => [name, value.trim()])
        );
        for (const name of ['firstName', 'lastName', 'email', 'message']) {
            if (!values[name]) {
                const field = event.currentTarget.elements.namedItem(name);
                field.setCustomValidity('Please complete this field.');
                field.reportValidity();
                return;
            }
        }
        sending.current = true;
        setStatus('sending');
        try {
            await sendContactMessage(values);
            setForm(EMPTY_FORM);
            setStatus('success');
        } catch {
            setStatus('error');
        } finally {
            sending.current = false;
        }
    };

    return (
        <section className='contact-form-card' aria-labelledby='contact-form-heading'>
            <p className='contact-eyebrow'>A little conversation, a little clarity</p>
            <h2 id='contact-form-heading'>Send us a message</h2>
            <p className='contact-form-intro'>Ask about a treatment, plan your visit, or simply say hello.</p>
            <form className='contact-form' onSubmit={handleSubmit} aria-busy={isSending}>
                <p className='contact-required-note'>Fields marked with * are required.</p>
                <fieldset disabled={isSending}>
                    <legend className='contact-sr-only'>Your contact details and message</legend>
                    <div className='contact-form-row'>
                        <div className='contact-field'>
                            <label htmlFor='contact-first-name'>First name <span aria-hidden='true'>*</span></label>
                            <input id='contact-first-name' name='firstName' autoComplete='given-name' required value={form.firstName} onChange={handleChange} />
                        </div>
                        <div className='contact-field'>
                            <label htmlFor='contact-last-name'>Last name <span aria-hidden='true'>*</span></label>
                            <input id='contact-last-name' name='lastName' autoComplete='family-name' required value={form.lastName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='contact-field'>
                        <label htmlFor='contact-email'>Email address <span aria-hidden='true'>*</span></label>
                        <input id='contact-email' name='email' type='email' autoComplete='email' required value={form.email} onChange={handleChange} />
                    </div>
                    <div className='contact-field'>
                        <label htmlFor='contact-subject'>Subject <span className='contact-optional'>(optional)</span></label>
                        <input id='contact-subject' name='subject' value={form.subject} onChange={handleChange} placeholder='How can we help?' />
                    </div>
                    <div className='contact-field'>
                        <label htmlFor='contact-message'>Your message <span aria-hidden='true'>*</span></label>
                        <textarea id='contact-message' name='message' rows={5} required value={form.message} onChange={handleChange} placeholder='Tell us a little about what you have in mind…' />
                    </div>
                </fieldset>
                <div className='contact-form-bottom'>
                    <p>For appointments, please use our <NavLink to='/booking'>booking page</NavLink>.</p>
                    <button className='contact-button contact-submit' type='submit' disabled={isSending}>
                        {isSending ? 'Sending…' : 'Send message'}
                        {isSending ? <Loader2 className='contact-spinner' size={18} aria-hidden='true' /> : <ArrowRight size={18} aria-hidden='true' />}
                    </button>
                </div>
                <div className='contact-form-status' role='status' aria-live='polite' aria-atomic='true'>
                    {status === 'success' && (
                        <p className='contact-success'><CheckCircle2 size={20} aria-hidden='true' />Thank you. Your message has been sent. We’ll be in touch.</p>
                    )}
                </div>
                {status === 'error' && (
                    <p className='contact-error' role='alert'>
                        We couldn’t send your message. Your details are still here. Please try again, or <a href='tel:+917038788903'>call us</a> or <a href='https://wa.me/917038788903'>chat on WhatsApp</a>.
                    </p>
                )}
            </form>
        </section>
    );
};

const Info = () => (
    <aside className='contact-details' aria-labelledby='contact-details-heading'>
        <div className='contact-details-main'>
            <p className='contact-eyebrow'>Always a warm welcome</p>
            <h2 id='contact-details-heading'>Let’s talk wellness.</h2>
            <p className='contact-details-intro'>A question about your visit? We’re here to help you find your moment of calm.</p>
            <ul className='contact-channels'>
                {contactOptions.map(({ Icon, label, detail, href }) => (
                    <li key={label}>
                        <a href={href}>
                            <span className='contact-channel-icon'><Icon size={21} aria-hidden='true' /></span>
                            <span className='contact-channel-copy'><strong>{label}</strong><span>{detail}</span></span>
                            <ArrowUpRight size={18} aria-hidden='true' />
                        </a>
                    </li>
                ))}
            </ul>
            <div className='contact-hours'>
                <Clock size={20} aria-hidden='true' />
                <div><h3>A little time for yourself</h3><p>Open every day · 10:00 AM – 10:00 PM</p></div>
            </div>
        </div>
        <div className='contact-booking-note'>
            <p>Ready for your next pause?</p>
            <NavLink to='/booking'>Book your spa experience <ArrowUpRight size={18} aria-hidden='true' /></NavLink>
        </div>
    </aside>
);

const Map = () => (
    <section className='contact-visit' aria-labelledby='contact-visit-heading'>
        <div className='contact-visit-copy'>
            <p className='contact-eyebrow'>Find your stillness</p>
            <h2 id='contact-visit-heading'>Visit us in Calangute.</h2>
            <p className='contact-visit-intro'>Your time to unwind is closer than you think.</p>
            <div className='contact-address'>
                <MapPin size={22} aria-hidden='true' />
                <address><a href={DIRECTIONS} target='_blank' rel='noopener noreferrer'>{ADDRESS}</a></address>
            </div>
            <a className='contact-button contact-directions' href={DIRECTIONS} target='_blank' rel='noopener noreferrer'>
                Get directions <ArrowUpRight size={18} aria-hidden='true' /><span className='contact-sr-only'> (opens in a new tab)</span>
            </a>
        </div>
        <div className='contact-map' role='region' aria-label='Map showing Lushai Wellness in Calangute, Goa'>
            <MapContainer center={POSITION} zoom={16} scrollWheelZoom={false}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; OpenStreetMap contributors' />
                <Marker position={POSITION} alt='Lushai Wellness location'>
                    <Popup maxWidth={240}><strong>Lushai Wellness</strong><p>{ADDRESS}</p><a href={DIRECTIONS} target='_blank' rel='noopener noreferrer'>Get directions</a></Popup>
                </Marker>
            </MapContainer>
        </div>
    </section>
);

const Contact = () => (
    <div className='contact'>
        <div className='contact-container'>
            <header className='contact-intro'>
                <nav className='contact-breadcrumb' aria-label='Breadcrumb'><NavLink to='/'>Home</NavLink><span aria-hidden='true'>/</span><span aria-current='page'>Contact</span></nav>
                <p className='contact-eyebrow'>Lushai Wellness · Calangute, Goa</p>
                <h1>A moment to connect.</h1>
                <p>Every wellness journey begins with a conversation.<br className='contact-desktop-break' /> We’d love to hear from you.</p>
            </header>
            <div className='contact-main'><Info /><Form /></div>
            <Map />
        </div>
    </div>
);

export default Contact;

