import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { Link as ReactRouterLink } from 'react-router-dom';
import { car_data } from '../../data/car_data.jsx';
import './Home.css';
import { Box, Flex, Select, Heading, Text, Image, Stack, Divider, Link as ChakraLink, SimpleGrid, GridItem, Card, CardBody, CardFooter } from '@chakra-ui/react';

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
        if (brandFilter !== 'All') {
          filtered = filtered.filter((item) => item.itemBrand.includes(brandFilter));
        }
      } else if (filterBy === 'price') {
        if (priceFilter !== 'All') {
          const [min, max] = priceFilter.split('-');
          filtered = filtered.filter((item) => item.currentPrice >= parseFloat(min) && item.currentPrice <= parseFloat(max));
        }
      } else if (filterBy === 'model') {
        if (modelFilter !== 'All') {
          filtered = filtered.filter((item) => item.itemModel.includes(modelFilter));
        }
      } else if (filterBy === 'all') {
        filtered = response.data.bidLots;
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
    const allModels = ['All'];

    if (brandFilter === 'All' || !brandFilter) {
      car_data.forEach((brand) => {
        brand.models.forEach((model) => {
          if (!allModels.includes(model.modelType)) {
            allModels.push(model.modelType);
          }
        });
      });
    } else {
      const brand = car_data.find((b) => b.brandName === brandFilter);
      brand.models.forEach((model) => {
        if (!allModels.includes(model.modelType)) {
          allModels.push(model.modelType);
        }
      });
    }

    return allModels;
  };

  const getPriceOptions = () => {
    return [
      'All',
      '0-2000000',
      '2000001-6000000',
      '6000001-10000000',
      '10000001-14000000',
    ];
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
      <Text fontSize="2xl" fontWeight="bold">Loading...</Text>
    </Box>;
  }
return (
  <Box className="homepage-container">
    <Flex className="filters" gap={4} mb={6}>
      <Box>
      <div>
        <Text fontWeight="medium" mb={2} className="filter-label">Filter By: </Text>
      </div>
        <Select id="filterBy" name="filterBy" value={filterBy} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="brand">Brand</option>
          <option value="price">Price</option>
          <option value="model">Model</option>
        </Select>
      </Box>
      <Box>
        <Text fontWeight="medium" mb={2}>Brand: </Text>
        <Select id="brand" name="brand" value={brandFilter} onChange={handleFilterChange}>
          {getBrands().map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <Text fontWeight="medium" mb={2}>Price: </Text>
        <Select id="price" name="price" value={priceFilter} onChange={handleFilterChange}>
          {getPriceOptions().map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <Text fontWeight="medium" mb={2}>Model: </Text>
        <Select id="model" name="model" value={modelFilter} onChange={handleFilterChange}>
          {getModels().map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </Select>
      </Box>
    </Flex>

    {filteredBidItems.length === 0 ? (
      <Box display="flex" justifyContent="center" alignItems="center" h="300px">
        <Text fontSize="xl" fontWeight="bold">No items found!</Text>
      </Box>
    ) : (
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={6}>
        {filteredBidItems.map((item, index) => (
          <GridItem key={index}>
            <Card maxW="sm" minW="250px">
              <CardBody>
                <Image
                  src={`http://127.0.0.1:8000${item.itemImage}`}
                  width="100%"
                  height="150px"
                  objectFit="cover"
                  alt={item.itemName}
                  borderRadius="md"
                />
                <Stack mt={3} spacing={2}>
                  <Heading size="sm">{item.itemBrand} {item.itemType}</Heading>
                  <Text fontSize="xs">{item.itemName}</Text>
                  <Stack w="100%" direction="row" justifyContent="space-between" alignItems="center">
                    <Text fontSize="medium" fontWeight="600" color="#6A994E">
                      Rs.{item.currentPrice}
                    </Text>
                    <Stack direction="row" alignItems="center">
                      <Box
                        width={3}
                        height={3}
                        bgColor={item.isSold ? 'none' : '#6A994E'}
                        rounded="full"
                        border={item.isSold ? '2px solid #6A994E' : 'none'}
                      ></Box>
                      <Text fontWeight={600} fontSize="xs">
                        {item.isSold ? 'Sold' : 'Ongoing'}
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </CardBody>
              <CardFooter padding={0}>
                <ChakraLink
                  as={ReactRouterLink}
                  display="inline-block"
                  paddingY={1}
                  paddingX={2}
                  bgColor="#2563eb"
                  rounded="md"
                  color="white"
                  fontWeight={600}
                  width="100%"
                  textAlign="center"
                  _hover={{ textDecoration: 'none', bgColor: '#8aa647' }}
                  to={`/item/${item.id}`}
                >
                  View Item
                </ChakraLink>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </SimpleGrid>
    )}
  </Box>
);
};

export default Home;