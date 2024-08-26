import React, { useContext, useEffect } from "react";
import styles from "./AllSalesPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/slices/allProductsSlice";
import filterSaleProducts from "../../utils/filterSaleProducts";
import { Link } from "react-router-dom";

import ProductsCard from "../../components/ProductsCard/ProductsCard";
import FilterProducts from "../../components/FilterProducts/FilterProducts";
import { Context } from "../../context";
import Skeleton from "./../../components/Skeleton/Skeleton";

export default function AllSalesPage() {
  const { theme } = useContext(Context);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.filterProductsData);
  const status = useSelector((state) => state.allProducts.status === 'loading');

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const saleProducts = filterSaleProducts(products);

  return (
    <div
      className={`${styles.saleProductsContainer} ${
        theme === "light" ? styles.lightTheme : styles.darkTheme
      }`}
    >
      <div className={styles.navigationLink}>
        <Link to={"/"}>
          <button>Main page</button>
        </Link>
        <div className={styles.line}></div>
        <Link to={"/sales"}>
          <button className={styles.buttonActive}>All sales</button>
        </Link>
      </div>

      <h1 className={styles.titlePage}>Discounted items</h1>
      <FilterProducts />

      {/* уже есть готовый camponents для карточек на странице MainPAge,
       поэтому я могу переиспользовать его тут */}
       
      <div>
        {status ? (
          <Skeleton />
        ) : <div className={styles.cardContainer}> 
          {saleProducts &&
          saleProducts.map((el) => <ProductsCard key={el.id} {...el} />)}
        </div>}
      </div>
      
    </div>
  );
}
