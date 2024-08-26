import React, { useContext } from "react";
import styles from "../Skeleton/Skeleton.module.css";
import { useSelector } from "react-redux";
import renderSkeletonSquares from "./../../utils/renderSkeletonSquares";
import { Context } from "../../context";

const Skeleton = () => {
  const { theme } = useContext(Context);

  const loading = useSelector((state) => state.allProducts.status) === "loading";

  if (loading) {
    return (
      <div
        className={`${styles["skeleton-container"]} ${
          theme === "light" ? styles.lightTheme : styles.darkTheme
        }`}
      >
        <div className={styles["skeleton-grid"]}>
          {renderSkeletonSquares(11, styles["skeleton-square"])}
        </div>
      </div>
    );
  }
  return null;
};

export default Skeleton;
