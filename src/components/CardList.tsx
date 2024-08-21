import React, { useEffect } from 'react';
import { useGetDogsQuery } from '../services/api';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCards } from '../store/cardsSlice';
import Card from './Card';

const CardList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: dogs, error, isLoading } = useGetDogsQuery(12);
  const filteredCards = useAppSelector(state => state.cards.filteredItems);
  const showLikedOnly = useAppSelector(state => state.cards.showLikedOnly);

  useEffect(() => {
    if (dogs) {
      dispatch(setCards(dogs.map(dog => ({
        id: dog.id,
        imageUrl: dog.url,
        title: dog.breeds[0]?.name || 'Unknown Breed',
        description: dog.breeds[0]?.temperament || 'No description available',
        isLiked: false,
      }))));
    }
  }, [dogs, dispatch,]);


  if (isLoading) return <div className='loading'>Loading...</div>;
  if (error) return <div>Error occurred while fetching data</div>;


  return (
    <div className="card-list">
      {showLikedOnly && filteredCards.length === 0 ? (
        <h3 className='no-liked-cards'>Ты не лайкнул ни одну собачку 😞</h3>
      ) : filteredCards.length === 0 ? (
        <div className='no-liked-wrap'>
        <h3 className='no-liked-cards'>Молодец, ты удалил всех пёселей 😞</h3>
        <button onClick={()=>window.location.reload()} className='filter-button'>Показать еще</button>
        </div >
      ) : filteredCards.map(card => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default CardList;