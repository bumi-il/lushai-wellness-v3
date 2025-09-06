import { useState } from 'react';
import './css/Booking.css';
import { NavLink } from 'react-router-dom';

const Booking = () => {
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
                <h2>Before You Arrive</h2>
                <div className='before-arrive'>
                    <p>
                        In a world that moves fast, you’ve chosen to slow down —
                        and that’s a powerful act of self-care. Your session is
                        more than just a treatment. It’s a chance to breathe
                        deeply, to feel, to reconnect — with your body, your
                        mind, and your stillness.
                    </p>
                    <h4>To prepare</h4>
                    <ul>
                        <li>
                            Arrive 10 minutes early to let the outside world
                            fade
                        </li>
                        <li>
                            Eat light, and drink water — your body will thank
                            you
                        </li>
                        <li>
                            Let your therapist know what you need, or what to
                            avoid
                        </li>
                        <li>
                            Most importantly: allow yourself to be fully present
                        </li>
                        <li>
                            Let this be your reset. We’ll take care of
                            everything else.
                        </li>
                    </ul>
                    <a
                        href='https://www.welns.io/product/booking/WFRCHN469741/Lushaiwellness339361'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='continue-booking'
                    >
                        Continue to Booking
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Booking;
