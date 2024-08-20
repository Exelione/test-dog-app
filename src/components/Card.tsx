import { useNavigate } from 'react-router-dom';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import { useState } from 'react';

interface CardProps {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  isLiked: boolean;
}

const Card: React.FC<CardProps> = ({ id, imageUrl, title, description, isLiked }) => {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as HTMLElement).closest('.card-actions')) {
      navigate(`/card/${id}`);
    }
  };
  const handleDelete = () => {
    setIsDeleted(true);
  };
  const handleReturnHome = () => {
    navigate('/');
  };
  if (isDeleted) {
    return (
      <div className="deleted-card">
        <p>Card deleted</p>
        <button onClick={handleReturnHome}>Return Home</button>
      </div>
    );
  }

  return (
    <div className="card" onClick={handleCardClick}>
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{cutText(description, 100)}</p>
      </div>
      <div className="card-actions">
        <LikeButton id={id} isLiked={isLiked} />
        <DeleteButton id={id} onDelete={handleDelete} />
      </div>
    </div>
  );
};

const cutText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export default Card;
