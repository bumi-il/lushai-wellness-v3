import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Booking from '../pages/Booking';
import Treatments from '../pages/Treatments';
import Contact from '../pages/Contact';
import Layout from '../layout/Layout';
import NotFound from '../pages/NotFound';
import PrivacyPolicyAndTerms from '../pages/PrivacyPolicyAndTerms';

const Router = () => {

    return (
        <Routes>
            <Route
                path='/'
                element={<Home />}
            />
            <Route element={<Layout />}>
                <Route
                    path='about'
                    element={<About />}
                />
                <Route
                    path='booking'
                    element={<Booking />}
                />
                <Route
                    path='treatments'
                    element={<Treatments />}
                />
                <Route
                    path='contact'
                    element={<Contact />}
                />
                <Route
                    path='privacy-policy'
                    element={<PrivacyPolicyAndTerms />}
                />
                <Route
                    path='*'
                    element={<NotFound />}
                />
            </Route>
        </Routes>
    );
};

export default Router;
