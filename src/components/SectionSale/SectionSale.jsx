import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./SectionSale.module.scss";
import { getAllProducts } from "../../store/slices/allProductsSlice";
import ProductsContainer from "../ProductsContainer/ProductsContainer";
import { Link } from "react-router-dom";
import filterSaleProducts from "../../utils/filterSaleProducts";
import { Context } from "../../context";

function SectionSale() {

  const { theme } = useContext(Context);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.allProductsData);

  // хук useState мне понадобится для получения 4 рандомных продуктов,
  // что бы не трогать глобальное состояние в нашем store
  const [randomSaleProducts, setRandomSaleProducts] = useState([]);

  const productsAllSale = filterSaleProducts(products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const randomProducts = productsAllSale.sort(() => 0.5 - Math.random());
      setRandomSaleProducts(randomProducts.slice(0, 4));
    }
  }, [products]);

  return (
    <div
      className={`${styles.container} ${
        theme === "light" ? styles.lightTheme : styles.darkTheme
      }`}
    >
      <div className={styles.title}>
        <span>Sale</span>

        <div className={styles.line}></div>

        <Link to={"/sales"}>
          <button>All sales</button>
        </Link>
      </div>

      <ProductsContainer
        saleProducts={randomSaleProducts}
        className={styles.productsContainer}
      />

      <div className={styles.contanerButtonNone}>
        <Link to={"/sales"}>
          <button className={styles.buttonForIphone}>All sales</button>
        </Link>
      </div>
    </div>
  );
}

export default SectionSale;
