import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { toggleLikedFilter } from '../store/cardsSlice';

const FilterButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const showLikedOnly = useAppSelector(state => state.cards.showLikedOnly);
  const location = useLocation();

  const handleFilterToggle = () => {
    dispatch(toggleLikedFilter());
  };
  if (location.pathname !== '/') {
    return null;
  }
  return (
    <button className="filter-button" onClick={handleFilterToggle}>
      {showLikedOnly ? 'Show All' : 'Show Liked Only'}
    </button>
  );
};

export default FilterButton;
