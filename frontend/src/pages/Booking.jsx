import { useState } from 'react';
import './css/Booking.css';
import { NavLink } from 'react-router-dom';

const disclaimers = [
    'Bookings are for general wellness and are not a replacement for medical care.',
    'Inappropriate behavior will result in session cancellation and a ₹3000 penalty.',
    'Therapists may refuse service for health-related reasons.',
    'We are not responsible for personal belongings.',
    'By continuing, you waive any claims against Lushai Wellness or its staff.',
];

const Booking = () => {
    const [agreed, setAgreed] = useState(false);

    return (
        <div className='booking'>
            <div className='booking-container'>
                <h2>Before You Continue</h2>
                <div className='booking-treatments-link'>
                    <h4>
                        You're about to leave our site and enter the Lushai
                        Wellness booking platform.
                    </h4>
                    <div>
                        <span>⭐</span>
                        <p>
                            Not sure which treatment to choose? <br />
                            Take a look at our{' '}
                            <NavLink to='/treatments'>
                                Treatments page
                            </NavLink>{' '}
                            for all the details.
                        </p>
                    </div>
                </div>
                <div className='booking-disclaimer'>
                    <h2>Booking Disclaimer</h2>
                    <h4>Please read and agree before continuing:</h4>
                    <div className='booking-disclaimer-list'>
                        {disclaimers.map((disclaimer, index) => (
                            <p key={index}>{disclaimer}</p>
                        ))}
                    </div>
                    <div
                        className='booking-disclaimer-agree'
                        onClick={() => setAgreed(!agreed)}
                    >
                        <input
                            type='checkbox'
                            checked={agreed}
                            onChange={() => setAgreed(!agreed)}
                        ></input>
                        <p>I have read and agree</p>
                    </div>
                </div>
                <div className='booking-continue'>
                    <a
                        href='https://www.welns.io/product/booking/WFRCHN469741/Lushaiwellness339361/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className={agreed ? '' : 'disabled'}
                    >
                        Continue to booking
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Booking;
