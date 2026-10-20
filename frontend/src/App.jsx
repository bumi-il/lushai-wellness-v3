import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import Context from './context/Context';
import HelmetComponent from './web/HelmetComponent';

const App = () => {
    return (
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <Context>
                    <HelmetComponent />
                    <div className='App'>
                        <Router />
                    </div>
                </Context>
            </BrowserRouter>
    );
};

export default App;
