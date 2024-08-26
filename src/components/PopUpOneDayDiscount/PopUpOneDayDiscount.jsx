import React, { useContext, useEffect, useState } from "react";
import styles from "./PopUpOneDayDiscount.module.css";
import ModalWindow from "../ModalWindow/ModalWindow";
import ProductsCard from "../ProductsCard/ProductsCard";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../../context";
import { addInCart, deleteOutCart } from "../../store/slices/cartProductsSlice";

export default function PopUpOneDayDiscount({
  oneDayDiscountIsOpen,
  setOneDayDiscountIsOpen,
  productId,
}) {
  const { theme } = useContext(Context);

  const products = useSelector((state) => state.allProducts.allProductsData);
  const [product, setProduct] = useState(null);

  // состояние, которое используется для изменения текста в кнопке, используя setTimeout.
  const [popupButtonText, setPopupButtonText] = useState("Add to cart");

  const productInCart = useSelector((state) =>
    state.cart.products.find((el) => el.id === productId)
  );

  useEffect(() => {
    if (products.length > 0) {
      const day = new Date().getDate();
      const productIndex = day % products.length;
      const selectedProduct = products[productIndex];
      setProduct({
        ...selectedProduct,
        discont_price: (selectedProduct.price / 2).toFixed(2),
      });
    }
  }, [products]);

  const dispatch = useDispatch();
  

  const addProductInCart = (event) => {
    event.stopPropagation();
    if (productInCart) {
      dispatch(deleteOutCart({ id: productId }));
      setPopupButtonText("Add to cart");
    } else {
      dispatch(addInCart({ id: productId, ...product, amount: 1 }));
      setPopupButtonText("Added");
      setTimeout(() => {
        setPopupButtonText("Add to cart");
      }, 1000);
    }
  };

  return (
    <div
      className={`${styles.popUpContainer} ${
        theme === "light" ? styles.lightTheme : styles.darkTheme
      }`}
    >
      <ModalWindow
        cardContentStyles={styles.cardContentStyles}
        isOpen={oneDayDiscountIsOpen}
        isClosed={() => setOneDayDiscountIsOpen(false)}
      >
        <div className={styles.modalWindowContent}>
          <h3>50% discount on product of the day!</h3>
          {product && (
            <ProductsCard
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              discont_price={product.discont_price}
              hideCartIcon={true}
            />
          )}
          <button className={styles.addToCartButton} onClick={addProductInCart}>
            {popupButtonText}
          </button>
        </div>
      </ModalWindow>
    </div>
  );
}
