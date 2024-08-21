import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    isLiked: boolean;
}

interface CardsState {
    items: Card[];
    filteredItems: Card[];
    showLikedOnly: boolean;
    likedCards: { [key: string]: boolean }
}

const initialState: CardsState = {
    items: [],
    filteredItems: [],
    showLikedOnly: false,
    likedCards: {},
};


const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setCards: (state, action: PayloadAction<Card[]>) => {
            const newItems = action.payload;
            const likedCards = state.likedCards;
          
            state.items = newItems.map((item) => {
              if (likedCards[item.id] !== undefined) {
                return { ...item, isLiked: likedCards[item.id] };
              }
              return item;
            });
          
            state.filteredItems = state.showLikedOnly
              ? state.items.filter((card) => card.isLiked)
              : state.items;
          },
        toggleLike: (state, action: PayloadAction<string>) => {
            state.likedCards[action.payload] = !state.likedCards[action.payload];
            state.items = state.items.map(card => {
                if (card.id === action.payload) {
                    return {
                        ...card,
                        isLiked: state.likedCards[action.payload],
                    };
                }
                return card;
            });
            state.filteredItems = state.showLikedOnly
                ? state.items.filter(card => card.isLiked)
                : state.items;
            if (state.items.length === 0) {
                state.showLikedOnly = false;
            }
        },
        deleteCard: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(card => card.id !== action.payload);
            state.filteredItems = state.showLikedOnly
                ? state.items.filter(card => card.isLiked)
                : state.items;

            if (state.items.length === 0) {
                state.showLikedOnly = false;
            }
        },
        toggleLikedFilter: (state) => {
            state.showLikedOnly = !state.showLikedOnly;
            state.filteredItems = state.showLikedOnly
                ? state.items.filter(card => card.isLiked)
                : [...state.items];
        }
    },
});

export const { setCards, toggleLike, deleteCard, toggleLikedFilter } = cardsSlice.actions;
export default cardsSlice.reducer;
