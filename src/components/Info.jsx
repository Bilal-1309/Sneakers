import React, { useContext } from "react";
import ThemeContext from "../context";

const Info = ({ title, image, description }) => {
  const { handleToggleCart } = useContext(ThemeContext);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img
        className="mb-20"
        width="120px"
        height="120px"
        src={image}
        alt="Box"
      />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={handleToggleCart} className="greenButton">
        <img src="/img/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
