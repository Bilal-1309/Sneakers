import Card from "../Card";

const Home = ({
  items,
  searchValue,
  onChangeSearchInput,
  handleAddToFavorite,
  handleAddToCart,
  deleteTextInSearch,
  isLoading
}) => {

  const renderItems = () => {

    const filterItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));

    return (
      isLoading ?
       [...Array(8)] : filterItems)
      .map((item, index) => (
        <Card
          key={index}
          onPlus={(obj) => handleAddToCart(obj)}
          onFavorite={(obj) => handleAddToFavorite(obj)}
          loading={isLoading}
          {...item}
        />
      ))
  }

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={deleteTextInSearch}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск ..."
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  );
};

export default Home;
