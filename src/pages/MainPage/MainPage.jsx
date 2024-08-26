import React from "react";
import styles from "./MainPage.module.css";
import Header from "../../components/Header/Header";
import SectionSale from "../../components/SectionSale/SectionSale";
import CategoriesContainer from "../../components/CategoriesSection/CategoriesContainer/CategoriesContainer";
import FormDiscount from "../../components/DiscountForm/FormDiscount/FormDiscount";

export default function MainPage() {
  return (
    <div className={styles}>
      <Header />
      <CategoriesContainer />
      <FormDiscount />
      <SectionSale />
    </div>
  );
}
