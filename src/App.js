import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import ThemeContext from "./context";
import Orders from "./components/pages/Orders";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResp, favoritesResp, itemsResp] = await Promise.all([
          axios.get("https://623cb7017efb5abea6861ddd.mockapi.io/cart"),
          axios.get("https://623cb7017efb5abea6861ddd.mockapi.io/favorites"),
          axios.get("https://623cb7017efb5abea6861ddd.mockapi.io/items"),
        ]);

        setIsLoading(false);

        setCartItems(cartResp.data);
        setFavorites(favoritesResp.data);
        setItems(itemsResp.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const handleToggleCart = () => {
    setCartOpened(!cartOpened);
  };

  const handleAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(`https://623cb7017efb5abea6861ddd.mockapi.io/cart/${findItem.id}`);
      } else {
        const { data } = await axios.post("https://623cb7017efb5abea6861ddd.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, data]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToFavorite = async (obj) => {
    try {
      if (favorites.find((item) => item.id === obj.id)) {
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
        await axios.delete(`https://623cb7017efb5abea6861ddd.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post("https://623cb7017efb5abea6861ddd.mockapi.io/favorites", obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveInCart = async (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      await axios.delete(`https://623cb7017efb5abea6861ddd.mockapi.io/cart/${id}`);
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
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <ThemeContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        setCartItems,
        handleAddToFavorite,
        handleAddToCart,
        isItemAdded,
        handleToggleCart,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          handleToggleCart={handleToggleCart}
          onRemove={handleRemoveInCart}
          opened={cartOpened}
        />
        <Header handleToggleCart={handleToggleCart} />
        <Routes>
          <Route
            path=""
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
          <Route path="favorites" element={<Favorites />}></Route>
          <Route path="orders" element={<Orders />}></Route>
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
