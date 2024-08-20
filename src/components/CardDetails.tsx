import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

const CardDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const card = useAppSelector(state => 
    state.cards.items.find(card => card.id === id)
  );

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <div className="card-details">
      <button className='back-button' onClick={() => navigate('/')}>Back to List</button>
      <img src={card.imageUrl} alt={card.title} className="card-details-image" />
      <h2>{card.title}</h2>
      <p>{card.description}</p>
      <div className="card-actions">
        <LikeButton id={card.id} isLiked={card.isLiked} />
        <DeleteButton id={card.id} onDelete={() => navigate('/')} />
      </div>
    </div>
  );
};

export default CardDetails;