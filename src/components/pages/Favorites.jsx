import React, {useContext} from 'react';
import Card from "../Card";
import ThemeContext from "../../context";

const Favorites = () => {

  const { favorites, handleAddToFavorite, handleAddToCart } = useContext(ThemeContext)

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1 className='mb-20'>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
          {favorites
            .map((item) => (
              <Card
                key={`${item.name} + ${item.price}`}
                favorited={true}
                onFavorite={handleAddToFavorite}
                onPlus={handleAddToCart}
                {...item}
              />
            ))}
      </div>
    </div>
  );
};

export default Favorites;