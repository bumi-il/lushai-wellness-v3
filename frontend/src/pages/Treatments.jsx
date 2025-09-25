import './css/Treatments.css';
import abc from '../data/treatments_list_v2.json';
import TreatmentCard from '../components/TreatmentCard';
import { useEffect, useState } from 'react';
import CardDetails from '../components/CardDetails';

const Treatments = () => {
    const [cardDetails, setCardDetails] = useState({});
    const [showCardDetails, setShowCardDetails] = useState(false);    

    useEffect(() => {
        setShowCardDetails(Object.keys(cardDetails).length > 0);
    }, [cardDetails]);

    if (showCardDetails) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    return (
        <div className='treatments'>
            {showCardDetails && <CardDetails cardDetails={cardDetails} setCardDetails={setCardDetails} />}
            {abc.map((treatments) => (
                <div
                    key={treatments.id}
                    className='treatments-category'
                >
                    <div className='treatments-category-header'>
                        <h2>{treatments.category}</h2>
                        <span></span>
                    </div>
                    <div className='treatments-category-list'>
                        {treatments.treatments.map((treatment, i) => (
                            <div
                                key={i}
                                // onClick={() => setCardDetails(treatment)}
                            >
                                <TreatmentCard
                                    treatment={treatment}
                                    category={treatments.category}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Treatments;
