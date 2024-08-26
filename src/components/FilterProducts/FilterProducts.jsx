import React, { useContext } from "react";
import styles from "./FilterProducts.module.scss";
import arrowDown from "../../media/icons/arrowDown.svg";
import { useDispatch } from "react-redux";
import { Context } from "../../context";
import { filterOneCategoryPriceAction, sortOneCategoryAction, filterOneCategorySaleAction} from "../../store/slices/oneCategorySlice";
import {filterPriceAction, filterSaleProductsAction, sortProductsAction} from "../../store/slices/allProductsSlice";
import {filterFavoritesPriceAction, sortFavoritesAction} from "../../store/slices/favoritesSlice";

function FilterProducts({ showSaleFilter, oneCategoryFilter, favoritesPage }) {
  const dispatch = useDispatch();
  const { theme } = useContext(Context);

  const filter = (e) => {
    e.preventDefault();

    const { priceFrom, priceTo } = e.target.elements;

    const priceFilter = {
      min_price: priceFrom.value ? Math.max(0, parseFloat(priceFrom.value)) : 0,
      max_price: priceTo.value ? Math.max(0, parseFloat(priceTo.value)) : Infinity,
    };

    if (oneCategoryFilter) {
      dispatch(filterOneCategoryPriceAction(priceFilter));
    } else if (favoritesPage) {
      dispatch(filterFavoritesPriceAction(priceFilter));
    } else {
      dispatch(filterPriceAction(priceFilter));
    }

    e.target.reset();
  };

  return (
    <div
      className={`${styles.filterContainer} ${
        theme === "light" ? styles.lightTheme : styles.darkTheme
      }`}
    >
      <form className={styles.priceInputs} onSubmit={filter}>
        <label htmlFor="priceFrom">Price</label>
        <input type="number" name="priceFrom" placeholder="from" min={0} />
        <input type="number" name="priceTo" placeholder="to" min={0} />
        <button className={styles.filterButton} type="submit">Filter</button>
      </form>


      {showSaleFilter && (
        <div className={styles.salesProducts}>
          <label>
            Discounted items
            <input
              type="checkbox"
              onChange={(e) =>
                oneCategoryFilter
                  ? dispatch(filterOneCategorySaleAction(e.target.checked))
                  : dispatch(filterSaleProductsAction(e.target.checked))
              }
            />
          </label>
        </div>
      )}
      

      <div className={styles.sortContainer}>
        <label htmlFor="sortSelect">Sort</label>
        <select
          name="sortSelect"
          className={styles.select}
          style={{ backgroundImage: `url(${arrowDown})` }}
          onChange={(e) =>
            oneCategoryFilter
              ? dispatch(sortOneCategoryAction(e.target.value))
              : favoritesPage
              ? dispatch(sortFavoritesAction(e.target.value))
              : dispatch(sortProductsAction(e.target.value))
          }
        >
          <option value="default">by default</option>
          <option value="newest">Newest</option>
          <option value="price-high-low">Price: High-Low</option>
          <option value="price-low-high">Price: Low-High</option>
        </select>
      </div>
    </div>
  );
}

export default FilterProducts;