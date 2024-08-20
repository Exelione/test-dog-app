import { useAppDispatch } from "../hooks";
import { toggleLike } from "../store/cardsSlice";

interface LikeButtonProps {
  id: string;
  isLiked: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ id, isLiked }) => {
  const dispatch = useAppDispatch();
  const handleLike = () => {
    dispatch(toggleLike(id));
  };
  return (
    <button onClick={handleLike} className={`like-button ${isLiked ? 'liked' : 'like-button'}`}>
      {isLiked ? '❤️' : '🤍' }
    </button>
  );
};
export default LikeButton;