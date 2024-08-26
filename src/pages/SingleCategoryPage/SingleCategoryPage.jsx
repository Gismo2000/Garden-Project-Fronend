import React, { useContext, useEffect } from "react";
import styles from "./SingleCategoryPage.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneCategory } from "../../store/slices/oneCategorySlice";
import ProductsCard from "../../components/ProductsCard/ProductsCard";
import { Link } from "react-router-dom";
import { Context } from "../../context";
import FilterProducts from "./../../components/FilterProducts/FilterProducts";
import Skeleton from "./../../components/Skeleton/Skeleton";

export default function SingleCategoryPage() {
  const { theme } = useContext(Context);
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const oneCategoryState = useSelector((state) => state.oneCategory.filterProductsData);
  const status = useSelector((state) => state.oneCategory.status);
  const category = useSelector((state) => state.oneCategory.oneCategoriesData);


  useEffect(() => {
    if (categoryId) {
      dispatch(getOneCategory(categoryId));
    }
  }, [dispatch, categoryId]);

  if (!oneCategoryState.length) {
    return <div>No data available</div>;
  }

  return (
    <div
      className={`${styles.categories_container} ${
        theme === "light" ? styles.lightTheme : styles.darkTheme
      }`}
    >
      <div className={styles.btn_links_categoriesPage}>
        <Link to={`/`}>
          <button className={styles.btn_category_card}>MainPage</button>
        </Link>

        <div className={styles.line}></div>

        <Link to={`/categories`}>
          <button className={styles.btn_category_card}>Categories</button>
        </Link>

        <div className={styles.line}></div>

        <Link to={`/categories/${categoryId}`}>
          <button className={`${styles.btn_category_card} ${styles.active}`}>
            {category.category.title}
          </button>
        </Link>
      </div>

      <span>{category.category.title}</span>

      <FilterProducts showSaleFilter={true} oneCategoryFilter={true} />
      {status === "loading" ? (
        <Skeleton />
      ) : (
        <div className={styles.cardContainer}>
          {
            oneCategoryState.map((el) => (
              <ProductsCard key={el.id} {...el} />
            ))
          }
        </div>
      )}
    </div>
  );
}
