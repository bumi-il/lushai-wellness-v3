import { Helmet } from 'react-helmet-async';
import { useLushaiContext } from '../context/Context';

const pages = {
    '': {
        title: 'Lushai - Home',
        description: 'Welcome to Lushai Wellness – Holistic Spa in India.',
        og: {
            title: 'Lushai Wellness | Boutique Spa in India',
            description:
                'Discover holistic treatments, peaceful surroundings and authentic Indian healing.',
            image: 'https://lushai.com/assets/og-home.jpg',
        },
    },
    treatments: {
        title: 'Lushai - Treatments',
        description:
            'Explore our range of massages, facials and wellness packages.',
        og: {
            title: 'Our Treatments | Lushai Wellness',
            description:
                'Rejuvenate with traditional Indian spa treatments and personalized care.',
            image: 'https://lushai.com/assets/og-treatments.jpg',
        },
    },
    booking: {
        title: 'Lushai - Booking',
        description:
            'Book your spa appointment online and secure your spot in paradise.',
        og: {
            title: 'Book Your Experience | Lushai Wellness',
            description:
                'Simple and fast booking for spa sessions and wellness experiences.',
            image: 'https://lushai.com/assets/og-booking.jpg',
        },
    },
};

const HelmetComponent = () => {
    const { path } = useLushaiContext();

    const meta = pages[path] || {
        title: 'Lushai Wellness',
        description: 'A boutique spa in India offering holistic treatments',
        og: {
            title: 'Lushai Wellness',
            description: 'Boutique spa treatments in the heart of nature.',
            image: 'https://lushai.com/assets/og-default.jpg',
        },
    };    

    return (
        <Helmet>
            <title>{meta.title}</title>
            <meta
                name='description'
                content={meta.description}
            />

            {/* Open Graph */}
            <meta
                property='og:title'
                content={meta.og.title}
            />
            <meta
                property='og:description'
                content={meta.og.description}
            />
            <meta
                property='og:image'
                content={meta.og.image}
            />
            <meta
                property='og:type'
                content='website'
            />
            <meta
                property='og:url'
                content={window.location.href}
            />
        </Helmet>
    );
};

export default HelmetComponent;
