import React, { useContext, useEffect, useState } from "react";
import Card from "../Card";
import axios from "axios";
import ThemeContext from "../../context";

const Orders = () => {
  const { handleAddToCart, handleAddToFavorite } = useContext(ThemeContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const reqOrders = await axios.get("/orders");
        setOrders(
          reqOrders.data.reduce((prev, obj) => [...prev, ...obj.items], [])
        );
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-center mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(
          isLoading ?
            [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            loading={isLoading}
            {...item}
          />
          ))}
      </div>
    </div>
  );
};

export default Orders;
