import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import AllProductsPage from "./pages/AllProductsPage/AllProductsPage";
import AllSalesPage from "./pages/AllSalesPage/AllSalesPage";
import CartPage from "./pages/CartPage/CartPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import FavoriteItemPage from "./pages/FavoriteItemPage/FavoriteItemPage";
import SingleCategoryPage from "./pages/SingleCategoryPage/SingleCategoryPage";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import NavMenu from "./components/NavMenu/NavMenu";
import Footer from "./components/Footer/Footer";
import { useSelector } from "react-redux";
import { Context } from "./context";

function App() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <Context.Provider value={{ theme }}>
      <div
        className={["app", theme === "light" ? "lightTheme" : "darkTheme"].join(
          " "
        )}
      >
        <NavMenu />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/sales" element={<AllSalesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/favorites" element={<FavoriteItemPage />} />
          <Route
            path="/categories/:categoryId"
            element={<SingleCategoryPage />}
          />
          <Route path="/product/:productId" element={<SingleProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </Context.Provider>
  );
}

export default App;
