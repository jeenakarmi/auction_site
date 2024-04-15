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

const Home = () => {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
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
  };

  const filterAuctions = () => {
    let filtered = auctions;
    if (filterBy === 'brand') {
      filtered = filtered.filter((auction) => auction.brand.includes(brandFilter));
    } else if (filterBy === 'price') {
      filtered = filtered.filter((auction) => auction.price <= parseFloat(priceFilter));
    } else if (filterBy === 'model') {
      filtered = filtered.filter((auction) => auction.model.includes(modelFilter));
    }
    setFilteredAuctions(filtered);
  };

  return (
    <div className="home-container">
      <div className="filters">
        <select name="filterBy" value={filterBy} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="brand">Brand</option>
          <option value="price">Price</option>
          <option value="model">Model</option>
        </select>
        {filterBy === 'brand' && (
          <input type="text" name="brand" value={brandFilter} onChange={handleFilterChange} placeholder="Filter by brand" />
        )}
        {filterBy === 'price' && (
          <input type="text" name="price" value={priceFilter} onChange={handleFilterChange} placeholder="Filter by price" />
        )}
        {filterBy === 'model' && (
          <input type="text" name="model" value={modelFilter} onChange={handleFilterChange} placeholder="Filter by model" />
        )}
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
    </div>
  );
};

export default Home;