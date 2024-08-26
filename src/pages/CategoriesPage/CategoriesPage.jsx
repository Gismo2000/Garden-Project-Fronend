import React from "react";
import styles from "./CategoriesPage.module.css";
import AllCategories from "../../components/AllCategories/AllCategories";

export default function CategoriesPage() {
  return (
    <div className={styles}>
      <AllCategories />
    </div>
  );
}
