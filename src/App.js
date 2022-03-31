import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import ThemeContext from "./context";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cartResp = await axios.get("/cart");
      const favoritesResp = await axios.get("/favorites");
      const itemsResp = await axios.get("/items");

      setIsLoading(false);

      setCartItems(cartResp.data);
      setFavorites(favoritesResp.data);
      setItems(itemsResp.data);
    }
    fetchData();
  }, []);

  const handleToggleCart = () => {
    setCartOpened(!cartOpened);
  };

  const handleAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        await axios.delete(`/cart/${obj.id}`);
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post("/cart", obj);
        setCartItems((prev) => [...prev, data]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToFavorite = async (obj) => {
    try {
      if (favorites.find((item) => item.id === obj.id)) {
        await axios.delete(`/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
      } else {
        const { data } = await axios.post("/favorites", obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveInCart = async (id) => {
    try {
      await axios.delete(`/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTextInSearch = () => {
    setSearchValue("");
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  };

  return (
    <ThemeContext.Provider value={{ items, cartItems, favorites, handleAddToFavorite, isItemAdded, handleToggleCart, setCartItems }}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            handleToggleCart={handleToggleCart}
            onRemove={handleRemoveInCart}
          />
        )}
        <Header handleToggleCart={handleToggleCart} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                handleAddToFavorite={handleAddToFavorite}
                handleAddToCart={handleAddToCart}
                deleteTextInSearch={deleteTextInSearch}
                isLoading={isLoading}
              />
            }
          ></Route>
          <Route
            path="/favorites"
            element={
              <Favorites/>
            }
          ></Route>
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
