import React, { useContext } from "react";
import { useSelector } from "react-redux";
import styles from "../FavoriteItemPage/FavoriteItemPage.module.scss";
import { Link } from "react-router-dom";
import ProductsCard from "../../components/ProductsCard/ProductsCard";
import FilterProducts from "../../components/FilterProducts/FilterProducts";
import { Context } from "../../context";
import Skeleton from "./../../components/Skeleton/Skeleton";

export default function FavoriteItemPage() {
  const { theme } = useContext(Context);
  const favorites = useSelector((state) => state.favorites.filterFavoritesData);
  const status = useSelector((state) => state.allProducts.status === "loading");

  return (
    <div
      className={`${styles.favoritesContainer} ${
        theme === "light" ? styles.lightTheme : styles.darkTheme
      }`}
    >
      <div className={styles.navigationLink}>
        <Link to={"/"}>
          <button>Main page</button>
        </Link>
        <div className={styles.line}></div>
        <Link to={"/favorites"}>
          <button className={styles.buttonActive}>Liked products</button>
        </Link>
      </div>

      <h1 className={styles.titlePage}>Liked products</h1>

      <FilterProducts favoritesPage={true} />

      {/* уже есть готовый camponents для карточек на странице MainPAge,
       поэтому я могу переиспользовать его тут */}

      {status ? (
        <Skeleton />
      ) :( favorites.length > 0 ? (
        <div className={styles.cardContainer}>
          {favorites.map((el) => (
            <ProductsCard key={el.id} {...el} />
          ))}
        </div>
      ) : (
        <p className={styles.emptyFavoritesTitle}>Looks like you have no items in your favorites currently.</p>)
      )}
    </div>
  );
}
