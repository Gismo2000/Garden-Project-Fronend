import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import styles from "./SingleProductPage.module.css";
import { serverUrl } from "../../utils/config.js";
import Counter from "../../components/Counter/Counter";
import heartIcon from "../../media/icons/heartIcon.svg";
import favoritesHeart from "../../media/icons/favoritesHeart.svg";
import hoverHeart from "../../media/icons/hoverHeart.svg";
import darkHeartIcon from "../../media/icons/darkHeartIcon.svg";
import { useDispatch, useSelector } from "react-redux";

import { Context } from "../../context";
import ModalWindow from "./../../components/ModalWindow/ModalWindow";
import { fetchProductData } from "../../utils/fetchSinglePage.js";
import { addProductInFavorite } from "../../utils/favorites.js";
import { addProductInCart } from "../../utils/cart.js";
import { displayedFullDescription, showDescription } from "../../utils/descriptionButton.js";

const SingleProductPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const { theme } = useContext(Context);
  const dispatch = useDispatch();

  const product = useSelector((state) => state.singleProduct.product);
  const cardFavorites = useSelector((state) =>
    state.favorites.cards.find((el) => el.id === productId)
  );
  const productInCart = useSelector((state) =>
    state.cart.products.find((el) => el.id === productId)
  );

  const categoryId = product ? product.categoryId : null;
  const category = useSelector((state) => state.oneCategory.oneCategoriesData);
  
  const [isFavorite, setIsFavorite] = useState(!!cardFavorites);
  const [modalActive, setModalActive] = useState(false);
  // состояние, которое используется для изменения текста в кнопке, используя setTimeout.
  const [buttonText, setButtonText] = useState("Add to cart");
  const [showFullDescription, setShowFullDescription] = useState(false);

useEffect(()=> {
  fetchProductData(dispatch, productId, categoryId);
}, [dispatch, productId, categoryId])

 // Добавление товара в изброное 
 const addFavoritesCard = (event) => {
  event.stopPropagation();
  addProductInFavorite(dispatch, productId, product, isFavorite, setIsFavorite);
};

  // Добавление товара в корзину 
  const addProductsInCart = (e) => {
    e.stopPropagation();
    addProductInCart(dispatch, productId, product, productInCart, setButtonText);
  };

  const displayedDescription = displayedFullDescription(product, showFullDescription);


  if (!product) {
    return <p>Loading...</p>;
  }

  const previousPage = location.state?.from || "/";
  const previousPageName = location.state?.pageName || "Previous Page";

  return (
    <div
      className={`${styles.singleProductPage} ${
        theme === "light" ? styles.lightTheme : styles.darkTheme
 }`}
    >
      <div className={styles.navigationLink}>
        <Link to="/">
          <button>Main Page</button>
        </Link>
        <div className={styles.line}></div>
        <Link to={previousPage}>
          <button>{previousPageName}</button>
        </Link>
        <div className={styles.line}></div>
        <Link to={`/categories/${categoryId}`}>
          <button className={styles.buttonCategory}>
            {category?.category?.title || "Loading..."}
          </button>
        </Link>

        <div className={styles.line}></div>

        <button className={styles.buttonActive}>{product.title}</button>
      </div>
      <div className={styles.productWrapper}>
        <img
          className={styles.productImage}
          src={`${serverUrl}${product.image}`}
          alt={product.title}
          onClick={()=> setModalActive(true)}
        />
        <div className={styles.productInfo}>
          <img
            src={
              isFavorite
                ? favoritesHeart
                : theme === "dark"
                ? darkHeartIcon
                : heartIcon
            }
            alt="heart"
            className={`${styles.heart} ${isFavorite ? styles.favorite : ""}`}
            onClick={addFavoritesCard}
            onMouseOver={(e) => (e.currentTarget.src = theme === "dark" ? favoritesHeart : hoverHeart)}
            onMouseOut={(e) =>
              (e.currentTarget.src = isFavorite
                ? favoritesHeart
                : theme === "dark"
                ? darkHeartIcon
                : heartIcon)
            }
          />

          <h1 className={styles.productTitle}>{product.title}</h1>

          <div className={styles.priceSection}>
            {product.discont_price && product.discont_price < product.price ? (
              <>
                <span className={styles.currentPrice}>
                  ${Math.round(product.discont_price)}
                </span>
                <span className={styles.oldPrice}>
                  ${Math.round(product.price)}
                </span>
                <div className={styles.discontPrice}>

                <span className={styles.discount}>

                  -{Math.round(100 - (product.discont_price / product.price) * 100)}%

                </span>
                </div>
              </>
            ) : (
              <span className={styles.currentPrice}>${product.price}</span>
            )}
          </div>

          <div className={styles.addToCartContainer}>
            <Counter productId={productId} isSingleProduct={true} />
            <div className={styles.containertButtonCart}>
              <button
                className={`${styles.addToCartButton} ${buttonText === "Added" ? styles.addedButton : ""}`}
                onClick={addProductsInCart}
              >
                {buttonText}
              </button>
            </div>
          </div>

          <div className={styles.productDescription}>
            <h2>Description</h2>
            <p
              className={`${styles.descriptionText} ${
                showFullDescription ? styles.expanded : styles.collapsed
              }`}
            >
              {displayedDescription}
            </p>
            <button
              className={styles.readMoreButton}
              onClick={(e) => {
                e.preventDefault();
                showDescription(showFullDescription, setShowFullDescription);
              }}
            >
            </button>
          </div>
        </div>
      </div>
      
      <ModalWindow
        isOpen={modalActive}
        isClosed={()=> setModalActive(false)}
        imageModalContent={styles.imageModalContent}
      >
        <div>
          {
            <img
              src={`${serverUrl}${product.image}`}
              alt={`${product.title}`}
              className={styles.modalImage}
            />
          }
        </div>
      </ModalWindow>
    </div>
  );
};

export default SingleProductPage;
