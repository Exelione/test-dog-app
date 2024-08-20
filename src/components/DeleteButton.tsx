import { useAppDispatch } from "../hooks";
import { deleteCard } from "../store/cardsSlice";

interface DeleteButtonProps {
  id: string;
  onDelete: () => void;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDelete }) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteCard(id));
    onDelete();
    
  };
  return (
    <button onClick={handleDelete} className="delete-button">
      🗑️
    </button>
  );
};

export default DeleteButton;