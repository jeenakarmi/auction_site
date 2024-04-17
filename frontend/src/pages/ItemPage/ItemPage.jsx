import React, { useState, useEffect } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { FaGavel, FaTrashCan, FaRegMoneyBill1 } from 'react-icons/fa6';
import { GiReceiveMoney } from 'react-icons/gi';
import { IoCaretBackSharp } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import { useFormik, Field, Formik } from 'formik';

import {
    Box,
    Stack,
    HStack,
    VStack,
    Image,
    Text,
    Heading,
    Link as ChakraLink,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Table,
    TableContainer,
    Tbody,
    Tr,
    Td,
} from '@chakra-ui/react';

import { useGlobalContext } from '../../context/GlobalContext';

import axios from 'axios';

const ItemPage = () => {
    const navigate = useNavigate();
    const { client, currentUser } = useGlobalContext();
    const { id } = useParams();
    const [itemData, setItemData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const [bidder, setBidder] = useState('');
    const [seller, setSeller] = useState('');

    const formik = useFormik({
        initialValues: {
            bidAmount: '',
        },
        onSubmit: (values) => {
            placeBid(values);
        },
    });

    const placeBid = (values) => {
        const postData = {
            ...values,
            bidItemId: id,
        };
        const xsrfCookies = document.cookie
            .split(';')
            .map((c) => c.trim())
            .filter((c) => c.startsWith('csrftoken='))[0]
            .split('=')[1];
        const config = {
            headers: {
                'X-CSRFToken': xsrfCookies,
            },
        };
        client
            .post(`/api/item/placebid/`, postData, config)
            .then((res) => {
                alert(`Bid placed of about Rs.${values.bidAmount}`);
                formik.setValues({
                    bidAmount: '',
                });
            })
            .catch((err) => {
                navigate(`/item/${values.bidItemId}`);
                alert(`Something went wrong! Bid not placed!`);
            });
    };

    const getBidder = (bidderId) => {
        client.get(`/api/getuser/${bidderId}`).then((res) => {
            setBidder(res.data.seller.username);
        });
    };

    const getSeller = (sellerId) => {
        client.get(`/api/getuser/${sellerId}`).then((res) => {
            setSeller(res.data.seller.username);
        });
    };

    useEffect(() => {
        setLoading(true);
        // Fetch item data based on itemId
        client
            .get(`/api/items/${id}`)
            .then((response) => {
                setItemData(response.data);
                // if there is a bidder
                if (response.data.bidder) {
                    getBidder(response.data.bidder);
                }
                getSeller(response.data.seller);
                setLoading(false);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setNotFound(true);
                }
                setLoading(false);
            });
    }, []); // Re-fetch data when itemId changes

    if (loading) {
        return <div>Loading...</div>;
    } else if (notFound) {
        return <div>Not found...</div>;
    }

    const handleCloseAuction = () => {
        const xsrfCookies = document.cookie
            .split(';')
            .map((c) => c.trim())
            .filter((c) => c.startsWith('csrftoken='))[0]
            .split('=')[1];
        const config = {
            headers: {
                'X-CSRFToken': xsrfCookies,
            },
        };
        if (confirm(`Sell this lot to ${bidder}?`)) {
            client
                .post('/api/item/close-auction', { bidItemId: id }, config)
                .then((res) => {
                    navigate('/my-active-lots');
                    alert('Auction for this lot closed!');
                })
                .catch((err) => {
                    alert('Something went wrong! Try again later!');
                });
        }
    };

    const handleDeleteAuction = () => {
        const xsrfCookies = document.cookie
            .split(';')
            .map((c) => c.trim())
            .filter((c) => c.startsWith('csrftoken='))[0]
            .split('=')[1];
        const config = {
            headers: {
                'X-CSRFToken': xsrfCookies,
            },
        };
        if (confirm(`Delete this lot from auction?`)) {
            client
                .delete(`/api/item/delete/${id}/`, config)
                .then((res) => {
                    navigate('/my-active-lots');
                    alert('Auction for this lot deleted!');
                })
                .catch((err) => {
                    alert('Something went wrong! Try again later!');
                });
        }
    };
    const handleDeleteItem = () => {
        const xsrfCookies = document.cookie
            .split(';')
            .map((c) => c.trim())
            .filter((c) => c.startsWith('csrftoken='))[0]
            .split('=')[1];
        const config = {
            headers: {
                'X-CSRFToken': xsrfCookies,
            },
        };
        if (confirm(`Delete this item?`)) {
            client
                .delete(`/api/item/delete/${id}/`, config)
                .then((res) => {
                    navigate('/sold-lots');
                    alert('Item deleted!');
                })
                .catch((err) => {
                    alert('Something went wrong! Try again later!');
                });
        }
    };

    const handlePaymentReceived = () => {
        const xsrfCookies = document.cookie
            .split(';')
            .map((c) => c.trim())
            .filter((c) => c.startsWith('csrftoken='))[0]
            .split('=')[1];
        const config = {
            headers: {
                'X-CSRFToken': xsrfCookies,
            },
        };
        if (confirm(`Received payment from ${bidder}?`)) {
            client
                .post('/api/item/payment-received', { bidItemId: id }, config)
                .then((res) => {
                    navigate('/pending-receive-payment-bids');
                    alert('Success!');
                })
                .catch((err) => {
                    alert('Something went wrong! Try again later!');
                });
        }
    };

    const RenderBidButton = () => {
        if (currentUser.userType === 'BUYER') {
            return (
                !itemData.isSold && (
                    <VStack alignItems={'flex-start'} mt={5} width={'100%'}>
                        <Heading size={'md'}>Place a bid</Heading>
                        <form className='w-full' onSubmit={formik.handleSubmit}>
                            <FormControl isRequired>
                                <InputGroup>
                                    <InputLeftElement>
                                        <Text fontWeight={700}>Rs.</Text>
                                    </InputLeftElement>
                                    <Input
                                        type='number'
                                        name='bidAmount'
                                        placeholder='Enter amount'
                                        value={formik.values.bidAmount}
                                        onChange={formik.handleChange}
                                    />
                                </InputGroup>
                            </FormControl>
                            <Button width={'100%'} mt={2} type='submit'>
                                <FaGavel className='mr-2' /> Bid
                            </Button>
                        </form>
                    </VStack>
                )
            );
        } else {
            if (!itemData.isSold && itemData.seller == currentUser.id) {
                return (
                    <VStack alignItems={'flex-start'} mt={5} width={'100%'}>
                        <Button width={'100%'} onClick={handleCloseAuction}>
                            <FaGavel className='mr-2' /> Close Auction
                        </Button>
                        <Button
                            width={'100%'}
                            colorScheme={'red'}
                            onClick={handleDeleteAuction}
                        >
                            <FaTrashCan className='mr-2' /> Delete Auction
                        </Button>
                    </VStack>
                );
            } else if (itemData.isSold && itemData.isPendingPayment) {
                return (
                    <Button
                        width={'100%'}
                        mt={5}
                        onClick={handlePaymentReceived}
                    >
                        <GiReceiveMoney className='mr-2' fontSize={'1.5rem'} />{' '}
                        Payment Received
                    </Button>
                );
            }
        }
    };

    return (
        <Stack
            direction={'column'}
            w={'100%'}
            maxW={'1024px'}
            paddingX={5}
            gap={10}
            marginY={10}
        >
            <ChakraLink
                as={ReactRouterLink}
                display={'inline-flex'}
                alignItems={'center'}
                _hover={{
                    textDecoration: 'none',
                }}
                to={'/'}
            >
                <IoCaretBackSharp className='text-xl mr-1' />
                Go Back
            </ChakraLink>
            <Image
                src={
                    itemData
                        ? `http://127.0.0.1:8000/${itemData.itemImage}`
                        : ''
                }
                maxW={'50%'}
                margin={'0 auto'}
            />
            <Stack
                direction={'row'}
                w={'100%'}
                justifyContent={'space-between'}
                alignItems={'flex-start'}
                gap={5}
            >
                <Stack direction={'column'} width={'50%'}>
                    <Heading size={'md'}>Information</Heading>
                    <TableContainer>
                        <Table variant={'simple'} size={'sm'}>
                            <Tbody>
                                <Tr
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                >
                                    <Td fontWeight={600} letterSpacing={1}>
                                        Name:
                                    </Td>
                                    <Td letterSpacing={1}>
                                        {itemData.itemName}
                                    </Td>
                                </Tr>
                                <Tr
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                >
                                    <Td fontWeight={600} letterSpacing={1}>
                                        Brand:
                                    </Td>
                                    <Td letterSpacing={1}>
                                        {itemData.itemBrand}
                                    </Td>
                                </Tr>
                                <Tr
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                >
                                    <Td fontWeight={600} letterSpacing={1}>
                                        Model:
                                    </Td>
                                    <Td letterSpacing={1}>
                                        {itemData.itemModel}
                                    </Td>
                                </Tr>
                                <Tr
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                >
                                    <Td fontWeight={600} letterSpacing={1}>
                                        Type:
                                    </Td>
                                    <Td letterSpacing={1}>
                                        {itemData.itemType}
                                    </Td>
                                </Tr>
                                {itemData.itemVariant && (
                                    <Tr
                                        justifyContent={'space-between'}
                                        width={'100%'}
                                    >
                                        <Td fontWeight={600} letterSpacing={1}>
                                            Variant:
                                        </Td>
                                        <Td letterSpacing={1}>
                                            {itemData.itemVariant}
                                        </Td>
                                    </Tr>
                                )}
                                <Tr
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                >
                                    <Td fontWeight={600} letterSpacing={1}>
                                        Starting Price:
                                    </Td>
                                    <Td letterSpacing={1}>
                                        Rs.{itemData.startingPrice}
                                    </Td>
                                </Tr>
                                <Tr
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                >
                                    <Td fontWeight={600} letterSpacing={1}>
                                        Upload Date:
                                    </Td>
                                    <Td letterSpacing={1}>
                                        {itemData.creationDate.slice(0, 10)}
                                    </Td>
                                </Tr>
                                <Tr
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                >
                                    <Td fontWeight={600} letterSpacing={1}>
                                        Seller:
                                    </Td>
                                    <Td letterSpacing={1}>{seller}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Text letterSpacing={1}>{itemData.itemDescription}</Text>
                </Stack>
                <Stack direction={'column'} width={'50%'}>
                    <HStack width={'100%'} justifyContent={'space-between'}>
                        <Heading size={'md'}>Latest Bid</Heading>
                        <HStack alignItems={'center'}>
                            <Box
                                width={4}
                                height={4}
                                bgColor={itemData.isSold ? 'none' : 'green'}
                                rounded={'full'}
                                border={
                                    itemData.isSold ? '2px solid green' : 'none'
                                }
                            ></Box>
                            <Text fontWeight={600} fontSize={'sm'}>
                                {itemData.isSold ? 'Sold' : 'Ongoing'}
                            </Text>
                        </HStack>
                    </HStack>
                    <TableContainer>
                        <Table variant={'simple'} size={'sm'}>
                            <Tbody>
                                <Tr
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                >
                                    <Td fontWeight={600} letterSpacing={1}>
                                        Bidder:
                                    </Td>
                                    <Td letterSpacing={1}>
                                        {bidder ? bidder : '-'}
                                    </Td>
                                </Tr>
                                <Tr
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                >
                                    <Td fontWeight={600} letterSpacing={1}>
                                        Latest Price:
                                    </Td>
                                    <Td letterSpacing={1}>
                                        Rs.{itemData.currentPrice}
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                    {currentUser && RenderBidButton()}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ItemPage;
