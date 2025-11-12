import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLushaiContext } from '../context/Context';

const SITE_ORIGIN = 'https://lushaiwellness.com';
const DEFAULT_OG = `${SITE_ORIGIN}/assets/og-default.jpg`;

const pages = {
    '': {
        title: 'Lushai Wellness — Holistic Spa in Calangute, Goa',
        description:
            'Holistic spa treatments in Calangute, Goa. Massage, facial & body therapies. Breathe, relax, and reconnect at Lushai Wellness.',
        og: {
            title: 'Lushai Wellness | Holistic Spa in Calangute, Goa',
            description:
                'Discover mindful massage, facials and body therapies in the hills of Goa.',
            image: `${SITE_ORIGIN}/assets/og-home.jpg`,
        },
    },
    treatments: {
        title: 'Treatments — Massage, Facial & Body Therapies | Lushai Wellness',
        description:
            'Explore Swedish & deep tissue massage, facials and body therapies in Calangute. Find durations, benefits and pricing.',
        og: {
            title: 'Our Treatments | Lushai Wellness',
            description:
                'Rejuvenate with tailored massage, facial and body therapies in Calangute.',
            image: `${SITE_ORIGIN}/assets/og-treatments.jpg`,
        },
    },
    booking: {
        title: 'Booking — Reserve Your Spa Session | Lushai Wellness',
        description:
            'Book your spa appointment online. Simple, fast and secure reservations.',
        og: {
            title: 'Book Your Experience | Lushai Wellness',
            description:
                'Reserve a massage, facial or body therapy at Lushai Wellness.',
            image: `${SITE_ORIGIN}/assets/og-booking.jpg`,
        },
        robots: 'index, follow',
    },
};

const LOCAL_BUSINESS_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Spa',
    '@id': 'https://lushaiwellness.com/#spa',
    name: 'Lushai Wellness',
    url: 'https://lushaiwellness.com/',
    image: 'https://lushaiwellness.com/assets/og-home.jpg',
    description:
        'Holistic spa treatments in Calangute, Goa: massage, facial & body therapies.',
    telephone: '+91 7038788903',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Lalhmingthanga Building, Zarkawt',
        addressLocality: 'Calangute',
        addressRegion: 'Goa',
        postalCode: '796007',
        addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 23.7271, longitude: 92.7197 },
    hasMap: 'https://maps.app.goo.gl/bc1acaVKiYJumniM6',
    sameAs: [
        'https://www.instagram.com/lushai_wellness/',
        'https://www.facebook.com/lushaiwellness/',
    ],
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ],
            opens: '10:00',
            closes: '22:00',
        },
    ],
    priceRange: '₹₹',
};

const HelmetComponent = () => {
    const { path } = useLushaiContext();
    const location = useLocation();

    const meta = pages[path] || {
        title: 'Lushai Wellness — Holistic Spa in Calangute, Goa',
        description:
            'A boutique holistic spa in Calangute offering massage, facial and body therapies.',
        og: {
            title: 'Lushai Wellness',
            description:
                'Boutique holistic spa treatments in the hills of Goa.',
            image: DEFAULT_OG,
        },
        robots: 'index, follow',
    };

    const canonicalUrl = `${SITE_ORIGIN}${location.pathname || '/'}`;

    return (
        <Helmet prioritizeSeoTags>
            <title>{meta.title}</title>
            <meta
                name='description'
                content={meta.description}
            />
            <meta
                name='robots'
                content={meta.robots || 'index, follow'}
            />
            <link
                rel='canonical'
                href={canonicalUrl}
            />
            <link
                rel='alternate'
                href={`${SITE_ORIGIN}/`}
                hrefLang='en'
            />

            {/* Open Graph */}
            <meta
                property='og:type'
                content='website'
            />
            <meta
                property='og:site_name'
                content='Lushai Wellness'
            />
            <meta
                property='og:locale'
                content='en_IN'
            />
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
                content={meta.og.image || DEFAULT_OG}
            />
            <meta
                property='og:url'
                content={canonicalUrl}
            />

            {/* Twitter */}
            <meta
                name='twitter:card'
                content='summary_large_image'
            />
            <meta
                name='twitter:title'
                content={meta.og.title}
            />
            <meta
                name='twitter:description'
                content={meta.og.description}
            />
            <meta
                name='twitter:image'
                content={meta.og.image || DEFAULT_OG}
            />

            <link
                rel='icon'
                href='/favicon.ico'
            />
            <link
                rel='apple-touch-icon'
                href='/apple-touch-icon.png'
            />

            <script type='application/ld+json'>
                {JSON.stringify(LOCAL_BUSINESS_SCHEMA)}
            </script>
        </Helmet>
    );
};

export default HelmetComponent;

// import { Helmet } from 'react-helmet-async';
// import { useLushaiContext } from '../context/Context';

// const pages = {
//     '': {
//         title: 'Lushai - Home',
//         description: 'Welcome to Lushai Wellness – Holistic Spa in India.',
//         og: {
//             title: 'Lushai Wellness | Boutique Spa in India',
//             description:
//                 'Discover holistic treatments, peaceful surroundings and authentic Indian healing.',
//             image: 'https://lushai.com/assets/og-home.jpg',
//         },
//     },
//     treatments: {
//         title: 'Lushai - Treatments',
//         description:
//             'Explore our range of massages, facials and wellness packages.',
//         og: {
//             title: 'Our Treatments | Lushai Wellness',
//             description:
//                 'Rejuvenate with traditional Indian spa treatments and personalized care.',
//             image: 'https://lushai.com/assets/og-treatments.jpg',
//         },
//     },
//     booking: {
//         title: 'Lushai - Booking',
//         description:
//             'Book your spa appointment online and secure your spot in paradise.',
//         og: {
//             title: 'Book Your Experience | Lushai Wellness',
//             description:
//                 'Simple and fast booking for spa sessions and wellness experiences.',
//             image: 'https://lushai.com/assets/og-booking.jpg',
//         },
//     },
// };

// const HelmetComponent = () => {
//     const { path } = useLushaiContext();

//     const meta = pages[path] || {
//         title: 'Lushai Wellness',
//         description: 'A boutique spa in India offering holistic treatments',
//         og: {
//             title: 'Lushai Wellness',
//             description: 'Boutique spa treatments in the heart of nature.',
//             image: 'https://lushai.com/assets/og-default.jpg',
//         },
//     };

//     return (
//         <Helmet>
//             <title>{meta.title}</title>
//             <meta
//                 name='description'
//                 content={meta.description}
//             />

//             {/* Open Graph */}
//             <meta
//                 property='og:title'
//                 content={meta.og.title}
//             />
//             <meta
//                 property='og:description'
//                 content={meta.og.description}
//             />
//             <meta
//                 property='og:image'
//                 content={meta.og.image}
//             />
//             <meta
//                 property='og:type'
//                 content='website'
//             />
//             <meta
//                 property='og:url'
//                 content={window.location.href}
//             />
//         </Helmet>
//     );
// };

// export default HelmetComponent;
