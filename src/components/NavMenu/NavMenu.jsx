import React, { useContext, useEffect, useState } from "react";
import plantLogo from "../../media/logos/plantLogo.svg";
import styles from "./NavMenu.module.css";
import heartIcon from "../../media/icons/heartIcon.svg";
import darkHeartIcon from "../../media/icons/darkHeartIcon.svg";
import cartIcon from "../../media/icons/cartIcon.svg";
import darkCartIcon from "../../media/icons/darkCartIcon.svg";
import burgerMenuIcon from "../../media/icons/burgerMenuIcon.svg";
import darkBurgerIcon from "../../media/icons/darkBurgerIcon.svg";
import crossIcon from "../../media/icons/crossIcon.svg";
import darkCrossIcon from "../../media/icons/darkCrossIcon.svg";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { Context } from "../../context";
import { getAllProducts } from "../../store/slices/allProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import PopUpOneDayDiscount from "../PopUpOneDayDiscount/PopUpOneDayDiscount";

export default function NavMenu() {

  // состояние, чтобы продемонстрировать количество продуктов в Favorite Page и Cart Page
  const cartState = useSelector((state) => state.cart.products);
  const favoriteState = useSelector((state) => state.favorites.cards);

  const cartCount = cartState.reduce((acc, el) => acc + el.amount, 0);
  const favoriteCount = favoriteState.length;

  const { theme } = useContext(Context);

  const [isOpen, setIsOpen] = useState(false);

  const [oneDayDiscountIsOpen, setOneDayDiscountIsOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div
      className={`${styles.navMenu} ${
        theme === "light" ? styles.lightTheme : styles.darkTheme
      }`}
    >
      <div className={styles.iconsLeft}>
        <Link to={"/"}>
          <img className={styles.plantLogo} src={plantLogo} alt="plant-logo" />
        </Link>
        <ThemeToggle className={styles.themeToggle} />
      </div>
      <div
        className={
          isOpen
            ? [styles.modalNavMenu, styles.active].join(" ")
            : [styles.modalNavMenu]
        }
        onClick={() => setIsOpen(false)}
        // при клике вне выпадающего меню, закрывается бургер-меню
      >
        <div
          className={
            isOpen
              ? [styles.navBarCenter, styles.active].join(" ")
              : [styles.navBarCenter]
          }
        >
          <div className={styles.navMenuLinks}>
            <Link to={"/"} onClick={() => setIsOpen(false)}>
              Main Page
            </Link>
            <Link to={"/categories"} onClick={() => setIsOpen(false)}>
              Categories
            </Link>
            <Link to={"/products"} onClick={() => setIsOpen(false)}>
              All products
            </Link>
            <Link to={"/sales"} onClick={() => setIsOpen(false)}>
              All sales
            </Link>
          </div>
          <div className={styles.buttonNavMenu}>
            <button onClick={() => setOneDayDiscountIsOpen(true)}>
              1 day discount!
            </button>
            <PopUpOneDayDiscount
              oneDayDiscountIsOpen={oneDayDiscountIsOpen}
              setOneDayDiscountIsOpen={setOneDayDiscountIsOpen}
            />
          </div>
        </div>
      </div>
      <div className={styles.iconsRight}>
        <Link to={"/favorites"}>
          <img
            className={styles.heartIcon}
            src={theme === "light" ? heartIcon : darkHeartIcon}
            alt="heart-icon"
          />
          {favoriteState.length === 0 ? (
            ""
          ) : (
            <span className={styles.favoriteCount}>{favoriteCount}</span>
          )}
        </Link>
        <Link to={"/cart"}>
          <img
            className={styles.cartIcon}
            src={theme === "light" ? cartIcon : darkCartIcon}
            alt="cart-icon"
          />
          {cartState.length === 0 ? (
            ""
          ) : (
            <span className={styles.cartCount}>{cartCount}</span>
          )}
        </Link>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={styles.burgerMenuIcon}
        >
          {isOpen ? (
            <img
              className={styles.crossIcon}
              src={theme === "light" ? crossIcon : darkCrossIcon}
              alt="cross-icon"
            />
          ) : (
            <img
              className={styles.burgerMenuIcon}
              src={theme === "light" ? burgerMenuIcon : darkBurgerIcon}
              alt="burger-icon"
            />
          )}
        </div>
      </div>
    </div>
  );
}
