import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: JSON.parse(localStorage.getItem("favoritesCards")) || [],
  filterFavoritesData: JSON.parse(localStorage.getItem("favoritesCards")) || [],
  status:'',
};

export const favoritesCardSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addCard: (state, action) => {
      const card = state.cards.find((el) => el.id === action.payload.id);
      if (!card) {
        state.cards.push(action.payload);
        state.filterFavoritesData.push(action.payload);
        localStorage.setItem("favoritesCards", JSON.stringify(state.cards));
      }
    },
    deleteCard: (state, action) => {
      state.cards = state.cards.filter((el) => el.id !== action.payload.id);
      state.filterFavoritesData = state.cards;
      localStorage.setItem("favoritesCards", JSON.stringify(state.cards));
    },
    sortFavoritesAction: (state, action) => {
      const select = action.payload;
      if (select === "default") {
        state.filterFavoritesData = [...state.cards];
      } else {
        const sortCards = [...state.filterFavoritesData];
        if (select === "price-high-low") {
          sortCards.sort((a, b) => b.price - a.price);
        } else if (select === "price-low-high") {
          sortCards.sort((a, b) => a.price - b.price);
        } else if (select === "newest") {
          sortCards.sort((a, b) => a.title.localeCompare(b.title));
        }
        state.filterFavoritesData = sortCards;
      }
    },
    filterFavoritesPriceAction: (state, action) => {
      const { min_price, max_price } = action.payload;
      state.filterFavoritesData = state.cards.filter(
        (el) =>
          (min_price === 0 || el.price >= min_price) &&
          (max_price === Infinity || el.price <= max_price)
      );
    },
  },
});

export const {
  addCard,
  deleteCard,
  sortFavoritesAction,
  filterFavoritesPriceAction,
  filterFavoritesSaleAction,
} = favoritesCardSlice.actions;

export default favoritesCardSlice.reducer;
