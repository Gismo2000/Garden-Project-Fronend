import React, { useContext, useEffect } from "react";
import CategoryCard from "../../CategoriesSection/CategoryCard/CategoryCard";
import styles from "./CategoriesContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../store/slices/categoriesSlice";
import { Link } from "react-router-dom";
import { Context } from "../../../context";

export default function CategoriesContainer() {

  const { theme } = useContext(Context);

  const categoriesState = useSelector(
    (state) => state.categories.categoriesData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div
      className={`${styles.categories_container} ${
        theme === "light" ? styles.lightTheme : styles.darkTheme
      }`}
    >
      <div className={styles.categoriesTitle}>
        <span>Categories</span>
        <div className={styles.line}></div>
        <Link to={`/categories`}>
          <button className={styles.btn_category_card}>All categories</button>
        </Link>
      </div>

      <div className={styles.containerImg}>
        {categoriesState.slice(0, 4).map((el) => (
          <CategoryCard key={el.id} {...el} />
        ))}
      </div>
      <Link to={`/categories`}>
        <button className={styles.btn2_category_card}>All categories</button>
      </Link>
    </div>
  );
}
