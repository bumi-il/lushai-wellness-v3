import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const LushaiContext = createContext();

export const useLushaiContext = () => useContext(LushaiContext);

const screenSizes = {
    maxMobile: 768,
    maxTablet: 1024,
};

const Context = ({ children }) => {
    const [path, setPath] = useState();
    const [screenType, setScreenType] = useState();
    const [scrollPosition, setScrollPosition] = useState();

    const location = useLocation();
    useEffect(() => {
        setPath(location.pathname.split('/')[1]);
    }, [location]);    

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= screenSizes.maxMobile) {
                setScreenType('mobile');
            } else if (width <= screenSizes.maxTablet) {
                setScreenType('tablet');
            } else {
                setScreenType('desktop');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const value = {
        path,
        screenType,
        scrollPosition,
    };

    return (
        <LushaiContext.Provider value={value}>
            {children}
        </LushaiContext.Provider>
    );
};

export default Context;
