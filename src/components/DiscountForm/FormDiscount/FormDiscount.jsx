import React from "react";
import styles from "./FormDiscount.module.css";
import NewUserForm from "../NewUserForm/NewUserForm";

export default function FormDiscount() {
  return (
    <div className={styles.form}>
      <h2>5% off on the first order</h2>
      <div className={styles.form_content}>
        <div className={styles.form_image}></div>
        <NewUserForm />
      </div>
    </div>
  );
}