import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardFooter,
    Heading,
    Text,
    Stack,
    Image,
    Box,
    Divider,
    Link as ChakraLink,
} from '@chakra-ui/react';
const BidItem = ({ placedTopBid }) => {
    const {
        id,
        itemName,
        itemCategory,
        itemDescription,
        isSold,
        currentPrice,
        itemImage,
    } = placedTopBid;
    return (
        <Card maxW={'sm'} minW={'450px'}>
            <CardBody>
                <Image
                    src={`http://127.0.0.1:8000/${itemImage}`}
                    width={'100%'}
                    objectFit={'cover'}
                    alt={itemName}
                    borderRadius={'md'}
                />
                <Stack mt={5} spacing={3}>
                    <Heading size={'md'}>{itemName}</Heading>
                    <Text fontSize={'sm'}>{itemDescription}</Text>
                    <Stack
                        w={'100%'}
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Text
                            fontSize={'x-large'}
                            fontWeight={'600'}
                            color={'#6A994E'}
                        >
                            Rs.{currentPrice}
                        </Text>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Box
                                width={4}
                                height={4}
                                bgColor={isSold ? 'none' : '#6A994E'}
                                rounded={'full'}
                                border={isSold ? '2px solid #6A994E' : 'none'}
                            ></Box>
                            <Text fontWeight={600} fontSize={'sm'}>
                                {isSold ? 'Sold' : 'Ongoing'}
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
                <Divider margin={4} />
                <CardFooter padding={0}>
                    <ChakraLink
                        as={ReactRouterLink}
                        display={'inline-block'}
                        paddingY={2}
                        paddingX={3}
                        bgColor={'#A7C957'}
                        rounded={'md'}
                        color={'white'}
                        fontWeight={600}
                        width={'100%'}
                        textAlign={'center'}
                        _hover={{
                            textDecoration: 'none',
                            bgColor: '#8aa647',
                        }}
                        to={`/item/${id}`}
                    >
                        More Info
                    </ChakraLink>
                </CardFooter>
            </CardBody>
        </Card>
    );
};

export default BidItem;
