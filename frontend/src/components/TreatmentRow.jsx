import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPairingLabel, getTreatmentOptions } from '../utils/treatmentOptions';

const TreatmentRow = ({ treatment }) => {
    const options = getTreatmentOptions(treatment);
    const isAddOn = treatment.type === 'add-on';

    return (
        <article className='treatment-row' data-treatment-type={treatment.type}>
            <div className='treatment-row-copy'>
                <div className='treatment-row-title'>
                    <h3>{treatment.name}</h3>
                    {treatment.isPopular && <span className='treatment-label'>Popular</span>}
                    {treatment.type === 'package' && <span className='treatment-label'>Package</span>}
                    {isAddOn && <span className='treatment-label'>Add-on</span>}
                </div>
                {treatment.description && <p className='treatment-description'>{treatment.description}</p>}
                {treatment.note && (
                    <p className='treatment-note'><span>{treatment.type === 'package' ? 'Includes' : 'Options'}:</span> {treatment.note}</p>
                )}
                {treatment['pair with'] && (
                    <p className='treatment-note'><span>Pairs with:</span> {getPairingLabel(treatment['pair with'])}</p>
                )}
            </div>
            <div className='treatment-row-details'>
                <dl className='treatment-options' aria-label='Duration and price options'>
                    {options ? options.map((option) => (
                        <div className='treatment-option' key={option.duration}>
                            <dt>{option.duration}</dt><dd>{option.price}</dd>
                        </div>
                    )) : (
                        <>
                            <div className='treatment-option'><dt>Duration</dt><dd>{treatment.duration}</dd></div>
                            <div className='treatment-option'><dt>Price (INR)</dt><dd>{treatment.price}</dd></div>
                        </>
                    )}
                </dl>
                {isAddOn ? (
                    <p className='treatment-addon-note'>With a main treatment</p>
                ) : (
                    <Link className='treatment-book-link' to='/booking' aria-label={'Book ' + treatment.name}>
                        Book this treatment <ArrowUpRight size={15} aria-hidden='true' />
                    </Link>
                )}
            </div>
        </article>
    );
};

export default TreatmentRow;
