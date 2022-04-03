import { useContext } from "react";
import ThemeContext from "../context";

export const useCart = () => {
  const { cartItems, setCartItems } = useContext(ThemeContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return { cartItems, setCartItems, totalPrice };
};
