import React from "react";
import styles from "./ProductsContainer.module.scss";
import SaleProductsCard from "../ProductsCard/ProductsCard"

function ProductsContainer({ saleProducts }) {
  return (
    <div>
      <div className={styles.cardSale}>
        {saleProducts.map((el) => (
          <SaleProductsCard key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
}

export default ProductsContainer;
