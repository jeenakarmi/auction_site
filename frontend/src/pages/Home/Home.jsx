// import React from 'react';

// import { Box, Heading } from '@chakra-ui/react';
// const Home = () => {
//     return (
//         <Box>
//             <Heading size={'xl'}>Home Page</Heading>
//         </Box>
//     );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import './Home.css';
import { car_data } from '../../data/car_data.jsx';

const Home = () => {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [bidItems, setBidItems] = useState([]);
  const [filteredBidItems, setFilteredBidItems] = useState([]);
  const [filterBy, setFilterBy] = useState('all');
  const [brandFilter, setBrandFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');

  useEffect(() => {
    // Fetch auction data from an API or your data source
    const fetchAuctions = async () => {
      const response = await fetch('/api/auctions');
      const data = await response.json();
      setAuctions(data);
      setFilteredAuctions(data);

      // Fetch bid items from the database
      const bidItemsResponse = await fetch('/api/bid-items');
      const bidItemsData = await bidItemsResponse.json();
      setBidItems(bidItemsData);
      setFilteredBidItems(bidItemsData);
    };
    fetchAuctions();
  }, []);

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
    filterAuctions();
    filterBidItems();
  };

  const filterAuctions = () => {
    let filtered = auctions;
    if (filterBy === 'brand') {
      filtered = filtered.filter((auction) => auction.brand.includes(brandFilter));
    } else if (filterBy === 'price') {
      const [min, max] = priceFilter.split('-');
      filtered = filtered.filter((auction) => auction.price >= parseFloat(min) && auction.price <= parseFloat(max));
    } else if (filterBy === 'model') {
      filtered = filtered.filter((auction) => auction.model.includes(modelFilter));
    }
    setFilteredAuctions(filtered);
  };

  const filterBidItems = () => {
    let filtered = bidItems;
    if (brandFilter) {
      filtered = filtered.filter((item) => item.itemBrand.includes(brandFilter));
    }
    if (priceFilter) {
      const [min, max] = priceFilter.split('-');
      filtered = filtered.filter((item) => item.currentPrice >= parseFloat(min) && item.currentPrice <= parseFloat(max));
    }
    if (modelFilter) {
      filtered = filtered.filter((item) => item.itemModel.includes(modelFilter));
    }
    setFilteredBidItems(filtered);
  };

  const getBrands = () => {
    return ['All', ...new Set(car_data.flatMap((brand) => brand.brandName))];
  };

  const getModels = () => {
    if (brandFilter === 'All' || !brandFilter) {
      return ['All', ...car_data.flatMap((brand) => brand.models.flatMap((model) => model.modelType))];
    }
    const brand = car_data.find((b) => b.brandName === brandFilter);
    return ['All', ...brand.models.flatMap((model) => model.modelType)];
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

  return (
    <div className="home-container">
      <div className="filters">
        <div className="filter-item">
          <label htmlFor="filterBy">Filter By:</label>
          <select id="filterBy" name="filterBy" value={filterBy} onChange={handleFilterChange}>
            <option value="all">All</option>
            {/* <option value="brand">Brand</option>
            <option value="price">Price</option>
            <option value="model">Model</option> */}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="brand">Brand:</label>
          <select id="brand" name="brand" value={brandFilter} onChange={handleFilterChange}>
            {getBrands().map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="price">Price:</label>
          <select id="price" name="price" value={priceFilter} onChange={handleFilterChange}>
            {getPriceOptions().map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
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
      <div className="auctions-grid">
        {filteredAuctions.map((auction) => (
          <div key={auction.id} className="auction-card">
            {/* Display auction details here */}
            <h3>{auction.title}</h3>
            <p>{auction.brand}</p>
            <p>Price: ${auction.price}</p>
            <p>Model: {auction.model}</p>
            {/* Add more auction details as needed */}
          </div>
        ))}
      </div>
      <div className="bid-items-grid">
        {filteredBidItems.map((item, index) => (
          <div key={index} className="bid-item-card">
            <img src={item.itemImage} alt={item.itemName} />
            <h3>{item.itemName}</h3>
            <p>Current Price: ${item.currentPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;