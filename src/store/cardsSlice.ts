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
}

const initialState: CardsState = {
    items: [],
    filteredItems: [],
    showLikedOnly: false,
};

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setCards: (state, action: PayloadAction<Card[]>) => {
            state.items = action.payload;
            state.filteredItems = action.payload;
        },
        toggleLike: (state, action: PayloadAction<string>) => {
            const card = state.items.find(card => card.id === action.payload);
            if (card) {
                card.isLiked = !card.isLiked;
            }
            state.filteredItems = state.showLikedOnly
                ? state.items.filter(card => card.isLiked)
                : state.items;
        },
        deleteCard: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(card => card.id !== action.payload);
            state.filteredItems = state.showLikedOnly
                ? state.items.filter(card => card.isLiked)
                : state.items;
        },
        toggleLikedFilter: (state) => {
            state.showLikedOnly = !state.showLikedOnly;
            state.filteredItems = state.showLikedOnly
                ? state.items.filter(card => card.isLiked)
                : state.items;
        },
    },
});

export const { setCards, toggleLike, deleteCard, toggleLikedFilter } = cardsSlice.actions;
export default cardsSlice.reducer;
