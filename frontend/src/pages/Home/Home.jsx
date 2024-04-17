import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import { car_data } from '../../data/car_data.jsx';
import './Home.css';


const Home = () => {
  const { client } = useGlobalContext();
  const [bidItems, setBidItems] = useState([]);
  const [filteredBidItems, setFilteredBidItems] = useState([]);
  const [filterBy, setFilterBy] = useState('all');
  const [brandFilter, setBrandFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchBidItems();
  }, [filterBy, brandFilter, priceFilter, modelFilter]);

  const fetchBidItems = async () => {
    try {
      const response = await client.get('/api/items/');
      let filtered = response.data.bidLots;

      if (filterBy === 'brand') {
        filtered = filtered.filter((item) => item.itemBrand.includes(brandFilter));
      } else if (filterBy === 'price') {
        const [min, max] = priceFilter.split('-');
        filtered = filtered.filter((item) => item.currentPrice >= parseFloat(min) && item.currentPrice <= parseFloat(max));
      } else if (filterBy === 'model') {
        filtered = filtered.filter((item) => item.itemModel.includes(modelFilter));
      }

      setBidItems(response.data.bidLots);
      setFilteredBidItems(filtered);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bid items:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'filterBy':
        setFilterBy(value);
        break;
      case 'brand':
        setBrandFilter(value);
        break;
      case 'price':
        setPriceFilter(value);
        break;
      case 'model':
        setModelFilter(value);
        break;
      default:
        break;
    }
  };

  const getBrands = () => {
    return ['All', ...new Set(car_data.map((brand) => brand.brandName))];
  };

  const getModels = () => {
    if (brandFilter === 'All' || !brandFilter) {
      return ['All', ...car_data.flatMap((brand) => brand.models.map((model) => model.modelType))];
    }
    const brand = car_data.find((b) => b.brandName === brandFilter);
    return ['All', ...brand.models.map((model) => model.modelType)];
  };

  const getPriceOptions = () => {
    return [
      'All',
      '0-20,00,000',
      '20,00,001-60,00,000',
      '60,00,001-1,00,00,000',
      '1,00,00,001-1,40,00,000',
    ];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="filters">
        <div>
          <label htmlFor="filterBy">Filter By:</label>
          <select id="filterBy" name="filterBy" value={filterBy} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="brand">Brand</option>
            <option value="price">Price</option>
            <option value="model">Model</option>
          </select>
        </div>
        <div>
          <label htmlFor="brand">Brand:</label>
          <select id="brand" name="brand" value={brandFilter} onChange={handleFilterChange}>
            {getBrands().map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <select id="price" name="price" value={priceFilter} onChange={handleFilterChange}>
            {getPriceOptions().map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="model">Model:</label>
          <select id="model" name="model" value={modelFilter} onChange={handleFilterChange}>
            {getModels().map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredBidItems.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={`http://127.0.0.1:8000${item.itemImage}`}
              alt={item.itemName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{item.itemName}</h2>
              <p className="text-gray-500">
                {item.isSold ? 'Sold' : 'Available'}
              </p>
              <p className="text-gray-500">
                Current Price: {item.currentPrice}
              </p>
              <Link
                to={`/item/${item.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                View Item
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;