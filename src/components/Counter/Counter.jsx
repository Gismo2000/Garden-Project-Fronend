import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../store/slices/cartProductsSlice";
import { incrementSingleProducts, decrementSingleProducts } from "../../store/slices/singleProductsSlice";
import styles from './Counter.module.css';
import { Context } from '../../context';

const Counter = ({ productId, isSingleProduct }) => {
  const { theme } = useContext(Context);
  const dispatch = useDispatch();
  
  const productAmount = useSelector((state) => {
    if (isSingleProduct) {
      return state.singleProduct.product.amount || 1;
    } else {
      const product = state.cart.products.find(el => el.id === productId);
      return product ? product.amount : 1;
    }
  });


  const incrementAmount = () => {
    if (isSingleProduct) {
      dispatch(incrementSingleProducts());
    } else {
      dispatch(increment({ id: productId }));
    }
  };

  const decrementAmount = () => {
    if (isSingleProduct) {
      dispatch(decrementSingleProducts());
    } else {
      dispatch(decrement({ id: productId }));
    }
  };

  return (
    <div
      className={`${styles.productCounterContainer} ${
        theme === "light" ? styles.lightTheme : styles.darkTheme
      }`}
    >
      <button className={styles.quantityButton} onClick={decrementAmount}>-</button>
      <div className={styles.quantity}>{productAmount}</div>
      <button className={styles.quantityButton} onClick={incrementAmount}>+</button>
    </div>
  );
};

export default Counter;
