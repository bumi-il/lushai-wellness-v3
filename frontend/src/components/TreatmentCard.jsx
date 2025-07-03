import './css/TreatmentCard.css';
import {
    Clock,
    IndianRupee,
    Search,
    Filter,
    X,
    Eye,
    Sparkles,
    Heart,
    Star,
    Gift,
    Users,
    MapPin,
    Zap,
    Flower,
    CopyPlus,
} from 'lucide-react';

const typesIcons = {
    base: (
        <Flower
            size={20}
            color='goldenrod'
            strokeWidth={2.5}
        />
    ),
    'add-on': (
        <CopyPlus
            size={20}
            color='goldenrod'
            strokeWidth={2.5}
        />
    ),
    package: (
        <Gift
            size={20}
            color='goldenrod'
            strokeWidth={2.5}
        />
    ),
};

const TreatmentCard = ({ treatment, category }) => {
    return (
        <div className='treatment-card'>
            <div className='treatment-card-section-1'>
                <h2>{treatment.name}</h2>
                {typesIcons[treatment.type] || <Star size={15} />}
            </div>
            <div className='treatment-card-section-2'>
                <div className={'treatment-card-type-tag ' + treatment.type}>
                    <p>{treatment.type}</p>
                </div>
                <div className='treatment-card-category-tag'>
                    <p>{category}</p>
                </div>
                {treatment.isPopular && (
                    <div className='treatment-card-popular-tag'>
                        <Sparkles size={15} />
                        <span>Popular</span>
                    </div>
                )}
            </div>
            <div className='treatment-card-section-3'>
                <p>
                    {treatment.description || (
                        <>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Nostrum nobis quidem laboriosam commodi
                            perspiciatis vitae saepe velit, unde maxime
                            inventore sunt minus soluta ab sequi, eaque magni
                            asperiores provident earum pariatur. Hic, officia?
                            Doloremque consequuntur aspernatur obcaecati labore,
                            consequatur enim quos ratione, a vero facilis
                            molestias assumenda velit quae sit!
                        </>
                    )}
                </p>
            </div>
            <div className='treatment-card-section-4'>
                <div className='treatment-card-duration'>
                    <Clock size={15} />
                    <span>{treatment.duration}</span>
                </div>
                <div className='treatment-card-price'>
                    <IndianRupee size={15} />
                    <span>{treatment.price}</span>
                </div>
            </div>
        </div>
    );
};

export default TreatmentCard;
