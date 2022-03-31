import React, {useContext, useState} from "react";
import styles from './Drawer.module.scss'
import Info from "../Info";
import ThemeContext from "../../context";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Drawer = ({ onRemove, handleToggleCart, items = [] }) => {

  const { cartItems, setCartItems } = useContext(ThemeContext);

  const [orderComplete, setOrderComplete ] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post('/orders',{items: cartItems});
      setOrderId(data.id)
      setOrderComplete(true);
      setCartItems([])
        for( let i = 0; i < cartItems.length; i++) {
          const item = cartItems[i];
          await axios.delete(`/cart/${item.id}`);
          await delay(1000)
        }

    }catch (e) {
      console.log(e)
    }
    setIsLoading(false);
  }

  return (
    <div  className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30 ">
          Корзина
          <img
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
            onClick={handleToggleCart}
          />
        </h2>

        {
          items.length > 0 ?
            <>
            <div className={styles.items}>
              {items.map((obj, index) => (
                <div key={obj.price +  index} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.image})`}}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img className="removeBtn" onClick={() => onRemove(obj.id)} src="/img/btn-remove.svg" alt="Remove" />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={handleOrder} className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
            </>
            : (
              <Info
                title={orderComplete ? "Заказ оформлен" : "Корзина пустая"}
                description={orderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"}
                image={orderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
              />
            )
        }
      </div>
    </div>
  );
};

export default Drawer;
