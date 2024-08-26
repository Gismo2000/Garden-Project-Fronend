import React, { useContext } from "react";
import { useSelector } from "react-redux";
import styles from "./OrderForm.module.css";
import NewUserForm from "../DiscountForm/NewUserForm/NewUserForm";
import { Context } from "../../context";

export default function OrderForm() {
  const { theme } = useContext(Context);

  const cartProducts = useSelector((state) => state.cart.products);

  // Рассчитать общее количество товаров и общую стоимость
  const totalItems = cartProducts.reduce(
    (acc, product) => acc + product.amount,
    0
  );
  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + product.amount * product.price,
    0
  );

  return (
    <div
      className={`${styles.orderContainer} ${
        theme === "light" ? styles.lightTheme : styles.darkTheme
      }`}
    >
      <div className={styles.orderText}>
        <h2>Order details</h2>
        <p className={styles.items}>{totalItems} items</p>
        <div className={styles.total}>
          <p>Total</p>
          <p className={styles.price}>${totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <NewUserForm
        orderStyles={styles.order_form}
        inputStyles={styles.order_input}
        order_msg_errorStyles={styles.order_msg_errorContainer}
        order_msgStyles={styles.order_msg}
        buttonStyles={styles.order_button}
        icon_containerStyles={styles.order_iconContainer}
        iconStyles={styles.order_icon}
        conf_msgStyles={styles.order_conf_msg}
        buttonText="Order"
        successText="Submitted Order"
        requestType="order"
      />
    </div>
  );
}
