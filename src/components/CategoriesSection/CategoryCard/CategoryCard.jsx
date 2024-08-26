import React, { useContext } from "react";
import styles from "./CategoryCard.module.css";
import { Link } from "react-router-dom";
import { Context } from "../../../context";

export default function CategoryCard({ id, title, image }) {
  const { theme } = useContext(Context);

  return (
    <div
      className={`${styles.cardContent} ${
        theme === "light" ? styles.lightTheme : styles.darkTheme
      }`}
    >
      <div className={styles.cardImg}>
        <Link to={`/categories/${id}`}>
          <img
            className={styles.categoriesImg}
            src={`http://localhost:3333${image}`}
            alt={title}
          />
        </Link>
      </div>
      <h4 className={styles.cardTitle}>{title}</h4>
    </div>
  );
}
