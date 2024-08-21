import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import LikeButton from './LikeButton';


const CardDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cards = useAppSelector(state => state.cards.items);
  const card = cards.find(c => c.id === id);
  if (!card) {
    
    return <div>Card not found</div>;
  }
  const handleBackToList = () => {
    navigate('/', { replace: true });
  };
  const handleNextDog = () => {
    const currentIndex = cards.findIndex(c => c.id === id);
    const nextIndex = (currentIndex + 1) % cards.length;
    navigate(`/card/${cards[nextIndex].id}`);
  };


  return (
    <div className="card-details">
      <div className='card-details-header'>
        <button className='back-button' onClick={handleBackToList}>Back to list</button>
        <button className='next-dog-button' onClick={handleNextDog}>Next dog</button>
      </div>
      <img src={card.imageUrl} alt={card.title} className="card-details-image" />
      <h2>{card.title}</h2>
      <p>{card.description}</p>
      <LikeButton id={card.id} isLiked={card.isLiked} />
    </div>
  );
};

export default CardDetails;
