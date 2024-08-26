import React, { useContext } from "react";
import styles from "./ThemeToggle.module.css";
import lightThemeIcon from "../../media/icons/lightThemeIcon.svg";
import darkThemeIcon from "../../media/icons/darkThemeIcon.svg";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../store/slices/themeSlice";
import { Context } from "../../context";

export default function ThemeToggle({ className }) {
  const { theme } = useContext(Context);

  const dispatch = useDispatch();

  return (
    <div className={className}>
      {theme === "dark" ? (
        <img
          className={styles.themeIcon}
          src={lightThemeIcon}
          alt="theme-icon"
          onClick={() => dispatch(toggleTheme(true))}
        />
      ) : (
        <img
          className={styles.themeIcon}
          src={darkThemeIcon}
          alt="theme-icon"
          onClick={() => dispatch(toggleTheme(false))}
        />
      )}
    </div>
  );
}
