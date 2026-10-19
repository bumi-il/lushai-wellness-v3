import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import { Outlet, useLocation } from 'react-router';
import './Layout.css';
import { useLushaiContext } from '../context/Context';
import HeaderMobile from '../components/HeaderMobile';
import FooterMobile from '../components/FooterMobile';

const Layout = () => {
    const { screenType } = useLushaiContext();
    const { pathname } = useLocation();
    const isContactPage = pathname.split('/')[1] === 'contact';

    return (
        <div className='layout'>
            {screenType === 'mobile' ? <HeaderMobile /> : <Header />}
            <main>
                {!isContactPage && <Hero />}
                <Outlet />
            </main>
            {screenType === 'mobile' ? <FooterMobile /> : <Footer />}
        </div>
    );
};

export default Layout;

