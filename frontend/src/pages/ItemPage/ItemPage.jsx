import React, { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { FaDollarSign, FaGavel } from 'react-icons/fa6';
import { IoCaretBackSharp } from 'react-icons/io5';

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

const imageBaseUrl = `../../../..`;

const ItemPage = () => {
    const formik = useFormik({
        initialValues: {
            bidAmount: '',
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });
    const tempItem = {
        id: 1,
        itemName: 'Highlander',
        itemBrand: 'Toyota',
        itemModel: 'SUV',
        itemCategory: 'Car',
        itemType: 'L series',
        isBrandNew: true,
        usedPeriod: null,
        itemDescription:
            'Make the most out of a day with your crew in the stylish Highlander.',
        itemImage: '/media/items/elevate.png',
        startingPrice: '39270.00',
        currentPrice: '39270.00',
        isSold: false,
        creationDate: '2024-04-13T08:59:09.280677Z',
        lastUpdateDate: '2024-04-13T08:59:09.280677Z',
        seller: 4,
        bidder: null,
    };
    const tempBidder = {
        username: 'jonathan',
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
                src={`http://127.0.0.1:8000/${tempItem.itemImage}`}
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
                                        {tempItem.itemName}
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
                                        {tempItem.itemBrand}
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
                                        {tempItem.itemModel}
                                    </Td>
                                </Tr>
                                <Tr
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                >
                                    <Td fontWeight={600} letterSpacing={1}>
                                        Starting Price:
                                    </Td>
                                    <Td letterSpacing={1}>
                                        Rs.{tempItem.startingPrice}
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
                                        {tempItem.creationDate.slice(0, 10)}
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Text letterSpacing={1}>{tempItem.itemDescription}</Text>
                </Stack>
                <Stack direction={'column'} width={'50%'}>
                    <HStack width={'100%'} justifyContent={'space-between'}>
                        <Heading size={'md'}>Latest Bid</Heading>
                        <HStack alignItems={'center'}>
                            <Box
                                width={4}
                                height={4}
                                bgColor={tempItem.isSold ? 'none' : 'green'}
                                rounded={'full'}
                                border={
                                    tempItem.isSold ? '2px solid green' : 'none'
                                }
                            ></Box>
                            <Text fontWeight={600} fontSize={'sm'}>
                                {tempItem.isSold ? 'Sold' : 'Ongoing'}
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
                                        Username:
                                    </Td>
                                    <Td letterSpacing={1}>
                                        {tempBidder.username}
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
                                        Rs.{tempItem.currentPrice}
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
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
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ItemPage;
