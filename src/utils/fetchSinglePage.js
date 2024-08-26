import { getOneCategory } from "../store/slices/oneCategorySlice";
import { getSingleProduct } from "../store/slices/singleProductsSlice";


export const fetchProductData = (dispatch, productId, categoryId) => {
  dispatch(getSingleProduct(productId));
  if (categoryId) {
    dispatch(getOneCategory(categoryId));
  }
};
