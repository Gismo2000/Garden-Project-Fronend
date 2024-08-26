import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser } from "../../../store/slices/newuserSlice";
import styles from "./NewUserForm.module.css";
import { useForm } from "react-hook-form";
import ModalWindow from "../../ModalWindow/ModalWindow";
import octagonIcon from "../../../media/icons/octagonIcon.svg";

export default function NewUserForm({
  orderStyles,
  inputStyles,
  order_msgStyles,
  buttonStyles,
  order_msg_errorStyles,
  icon_containerStyles,
  iconStyles,
  conf_msgStyles,
  buttonText = "Get a discount",
  successText = "Request Submitted",
  requestType = "discount",
  
}) {
  const dispatch = useDispatch();

  const [modalActive, setModalActive] = useState(false);

  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const nameRegister = register("name", {
    required: "*Name field is required",
    pattern: {
      value: /^[A-Za-z]+(?:['-][A-Za-z]+)?(?: [A-Za-z]+(?:['-][A-Za-z]+)?)?$/,
      message: "*Please enter a valid name",
    },
  });

  const numberRegister = register("number", {
    required: "*Phone number field is required",
    pattern: {
      value: /^[0-9]+$/,
      message: "*Please enter a valid phone number",
    },
  });

  const emailRegister = register("email", {
    required: "*Email field is required",
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "*Please enter  valid email address",
    },
  });

  const getData = (newUser) => {
    console.log(newUser);

    dispatch(addNewUser(newUser));
    reset();

    if (requestType === "discount") {
      setConfirmationMessage(
        "The discount has been successfully sent by email."
      );
    } else if (requestType === "order") {
      setConfirmationMessage("The order has been successfully submitted.");
      setModalActive(true);
      
    }
    setIsSubmitted(true);
    


    setTimeout(() => {
      setConfirmationMessage("");
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <form
      className={`${styles.newUser} ${orderStyles}`}
      onSubmit={handleSubmit(getData)}
    >
      <div className={`${styles.error_imput} ${order_msg_errorStyles}`}>
        {errors.name && (
          <p className={`${styles.error_msg} ${order_msgStyles}`}>
            {errors.name.message}
          </p>
        )}
      </div>

      <input
        className={`${styles.inputForm} ${inputStyles}`}
        type="text"
        placeholder="Name"
        name="name"
        {...nameRegister}
      />

      <div className={`${styles.error_imput} ${order_msg_errorStyles}`}>
        {errors.number && (
          <p className={`${styles.error_msg} ${order_msgStyles}`}>
            {errors.number.message}
          </p>
        )}
      </div>

      <input
        className={`${styles.inputForm} ${inputStyles}`}
        type="text"
        placeholder="Phone number"
        name="number"
        {...numberRegister}
      />

      <div className={`${styles.error_imput} ${order_msg_errorStyles}`}>
        {errors.email && (
          <p className={`${styles.error_msg} ${order_msgStyles}`}>
            {errors.email.message}
          </p>
        )}
      </div>

      <input
        className={`${styles.inputForm} ${inputStyles}`}
        type="text"
        placeholder="Email"
        name="email"
        {...emailRegister}
      />

      {errors.name && (
        <div
          className={`${styles.error_icon_container} ${icon_containerStyles}`}
        >
          <img
            src={octagonIcon}
            className={`${styles.error_icon} ${iconStyles}`}
            alt="error-icon"
          />
          <p className={`${styles.conf_msg} ${conf_msgStyles}`}>
            Wrong input. Try again
          </p>
        </div>
      )}

      {confirmationMessage && (
        <div className={`${styles.conf_msg_container} ${icon_containerStyles}`}>
          <p className={`${styles.conf_msg} ${conf_msgStyles}`}>
            {confirmationMessage}
          </p>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button
          className={`${styles.submitButton} ${buttonStyles} ${
            isSubmitted ? styles.submittedButton : ""
          }`}
          type="submit"
        >
          {isSubmitted && requestType === "order"
            ? "Submit Order"
            : isSubmitted
            ? successText
            : buttonText}
        </button>
      </div>
      <ModalWindow
        orderWindowStyles={styles.orderContentStyles}
        isOpen={modalActive}
        isClosed={() => setModalActive(false)}
      >
        <h3>Congratulations!</h3>
        <p>
          Your order has been successfully placed on the website.
          <br />
          <br />
          A manager will contact you shortly to confirm your order.
        </p>
      </ModalWindow>
    </form>
  );
}
