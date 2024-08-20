import React, { useEffect } from 'react';
import { useGetDogsQuery } from '../services/api';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCards } from '../store/cardsSlice';
import Card from './Card';
const CardList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: dogs, error, isLoading } = useGetDogsQuery(10);
  const filteredCards = useAppSelector(state => state.cards.filteredItems);

  useEffect(() => {
    if (dogs) {
      const cards = dogs.map(dog => ({
        id: dog.id,
        imageUrl: dog.url,
        title: dog.breeds[0]?.name || 'Unknown Breed',
        description: dog.breeds[0]?.temperament || 'No description available',
        isLiked: false,
      }));
      dispatch(setCards(cards));
    }
  }, [dogs, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching data</div>;

  return (
    <div className="card-list">
      {filteredCards.map(card => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default CardList;