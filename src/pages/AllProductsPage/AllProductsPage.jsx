import React, { useContext, useEffect } from "react";
import styles from "./AllProductsPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/slices/allProductsSlice";
import ProductsCard from "../../components/ProductsCard/ProductsCard";
import { Link } from "react-router-dom";
import FilterProducts from "../../components/FilterProducts/FilterProducts";
import { Context } from "../../context";
import Skeleton from "./../../components/Skeleton/Skeleton";

export default function AllProductsPage() {
  const { theme } = useContext(Context);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.filterProductsData);
  const status = useSelector((state) => state.allProducts.status === "loading");
  
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

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
        <Link to={"/products"}>
          <button className={styles.buttonActive}>All products</button>
        </Link>
      </div>

      <h1 className={styles.titlePage}>All products</h1>
      <FilterProducts showSaleFilter={true} />
      {status ? (
        <Skeleton />
      ) : (
        <div className={styles.cardContainer}>
          {products &&
            products.map((el) => <ProductsCard key={el.id} {...el} />)}
        </div>
      )}
    </div>
  );
}
