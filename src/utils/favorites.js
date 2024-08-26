import { addCard, deleteCard } from "../store/slices/favoritesSlice";

export const addProductInFavorite = (dispatch, productId, product, isFavorite, setIsFavorite) => {
  if (isFavorite) {
    dispatch(deleteCard({ id: productId }));
  } else {
    dispatch(addCard({ id: productId, ...product }));
  }
  setIsFavorite(!isFavorite);
};
