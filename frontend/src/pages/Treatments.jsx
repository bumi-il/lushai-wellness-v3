import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import categories from '../data/treatments_list_v2.json';
import TreatmentRow from '../components/TreatmentRow';
import './css/Treatments.css';

const Treatments = () => {
    const { hash } = useLocation();
    const [activeCategory, setActiveCategory] = useState(categories[0].id);
    const navigationRef = useRef(null);
    const firstVisit = useRef(true);
    const treatmentCount = categories.reduce((count, category) => count + category.treatments.length, 0);

    useEffect(() => {
        const target = categories.find((category) => '#' + category.id === hash);
        const initialVisit = firstVisit.current;
        firstVisit.current = false;
        const frame = window.requestAnimationFrame(() => {
            if (target) {
                document.getElementById(target.id)?.scrollIntoView({
                    behavior: initialVisit || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                    block: 'start',
                });
            } else if (!hash) {
                window.scrollTo(0, 0);
            }
        });
        return () => window.cancelAnimationFrame(frame);
    }, [hash]);

    useEffect(() => {
        let frame = 0;
        const updateActiveCategory = () => {
            frame = 0;
            const headerHeight = Number.parseFloat(
                window.getComputedStyle(document.documentElement).getPropertyValue('--header-height')
            ) || 80;
            const offset = headerHeight + (navigationRef.current?.offsetHeight || 64) + 28;
            let current = categories[0].id;
            for (const category of categories) {
                if ((document.getElementById(category.id)?.getBoundingClientRect().top ?? Infinity) <= offset) {
                    current = category.id;
                }
            }
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
                current = categories[categories.length - 1].id;
            }
            setActiveCategory(current);
        };
        const handleScroll = () => {
            if (!frame) frame = window.requestAnimationFrame(updateActiveCategory);
        };
        updateActiveCategory();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    useEffect(() => {
        const track = navigationRef.current?.querySelector('.treatments-category-links');
        const link = track?.querySelector('[data-category="' + activeCategory + '"]');
        if (track && link) {
            track.scrollTo({ left: link.offsetLeft - (track.clientWidth - link.offsetWidth) / 2, behavior: 'auto' });
        }
    }, [activeCategory]);

    return (
        <div className='treatments-page'>
            <header className='treatments-intro treatments-container'>
                <nav className='treatments-breadcrumb' aria-label='Breadcrumb'>
                    <Link to='/'>Home</Link><span aria-hidden='true'>/</span><span aria-current='page'>Treatments</span>
                </nav>
                <p className='treatments-eyebrow'>The Lushai treatment menu</p>
                <h1>Our <em>treatments.</em></h1>
                <p className='treatments-intro-copy'>A little time, entirely yours. Explore our massages, skin rituals<br className='treatments-desktop-break' /> and shared experiences, and find your own way to unwind.</p>
                <p className='treatments-menu-count'>{categories.length} collections <span aria-hidden='true'>·</span> {treatmentCount} ways to unwind</p>
            </header>

            <nav className='treatments-category-nav' aria-label='Treatment categories' ref={navigationRef}>
                <div className='treatments-category-links treatments-container'>
                    {categories.map((category) => (
                        <Link
                            to={'#' + category.id}
                            key={category.id}
                            data-category={category.id}
                            aria-current={activeCategory === category.id ? 'location' : undefined}
                        >
                            {category.category}
                        </Link>
                    ))}
                </div>
            </nav>

            <div className='treatments-collections treatments-container'>
                {categories.map((category, index) => (
                    <section className='treatments-collection' id={category.id} key={category.id} aria-labelledby={category.id + '-heading'}>
                        <header className='treatments-collection-intro'>
                            <p className='treatments-eyebrow'><span aria-hidden='true'>{String(index + 1).padStart(2, '0')} / </span>The collection</p>
                            <h2 id={category.id + '-heading'}>{category.category}</h2>
                            <p>{category.description}</p>
                            <span className='treatments-collection-rule' aria-hidden='true' />
                        </header>
                        <div className='treatments-menu-list'>
                            {category.treatments.map((treatment) => <TreatmentRow key={treatment.name} treatment={treatment} />)}
                        </div>
                    </section>
                ))}
            </div>

            <section className='treatments-booking treatments-container' aria-labelledby='treatments-booking-heading'>
                <div>
                    <p className='treatments-eyebrow'>Make a little space for yourself</p>
                    <h2 id='treatments-booking-heading'>Your next moment of calm.</h2>
                    <p>Found your ritual? Continue to our booking page to plan your visit.</p>
                </div>
                <div className='treatments-booking-actions'>
                    <Link className='treatments-primary-link' to='/booking'>Book your experience <ArrowRight size={18} aria-hidden='true' /></Link>
                    <Link className='treatments-help-link' to='/contact'>Need a little guidance? Talk to us <ArrowUpRight size={15} aria-hidden='true' /></Link>
                </div>
            </section>
            <p className='treatments-currency-note treatments-container'>All prices are in Indian rupees (INR).</p>
        </div>
    );
};

export default Treatments;
