import { addInCart, deleteOutCart } from "../store/slices/cartProductsSlice";
import { resetCounter } from "../store/slices/singleProductsSlice";

export const addProductInCart = (dispatch, productId, product, productInCart, setButtonText) => {
  if (productInCart) {
    dispatch(deleteOutCart({ id: productId }));
    setButtonText("Add to cart");
  } else {
    dispatch(addInCart({ id: productId, ...product, amount: product.amount }));
    setButtonText("Added");
    setTimeout(() => {
      setButtonText("Add to cart");
    }, 1000);
    dispatch(resetCounter());
  }
};
