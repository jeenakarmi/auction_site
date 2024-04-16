import React, { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    RadioGroup,
    Radio,
    Stack,
    Button,
    Text,
    Box,
    Heading,
    Link as ChakraLink,
} from '@chakra-ui/react';

import { useGlobalContext } from '../../context/GlobalContext';

const RegisterForm = () => {
    const navigate = useNavigate();
    const { client, setRegistrationToggle } = useGlobalContext();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            username: '',
            phone: '',
            userType: 'BUYER',
        },
        onSubmit: (values) => {
            client
                .post('/api/register', values)
                .then(() => {
                    navigate('/login');
                    alert('Account Created!');
                })
                .catch((err) => alert("Something's wrong! Try again later."));
        },
    });

    return (
        <Box
            width={'100%'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flex={'1 0 auto'}
            marginY={10}
        >
            <Stack
                width={'30%'}
                minW={'360px'}
                maxW={'640px'}
                rounded={10}
                padding={10}
                direction={'column'}
                gap={4}
                boxShadow={'0 0 30px 0 #38664150'}
            >
                <Heading marginBottom={10} color={'#1f1f1f'}>
                    Sign Up
                </Heading>
                <form
                    onSubmit={formik.handleSubmit}
                    className='flex flex-col gap-4 justify-center items-center'
                >
                    <FormControl isRequired>
                        <FormLabel fontWeight={600}>Email:</FormLabel>
                        <Input
                            type='email'
                            name='email'
                            placeholder='email@gmail.com'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel fontWeight={600}>Password:</FormLabel>
                        <Input
                            type='password'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel fontWeight={600} l>
                            Username:
                        </FormLabel>
                        <Input
                            type='text'
                            name='username'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel fontWeight={600}>Phone No.:</FormLabel>
                        <Input
                            type='number'
                            name='phone'
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel fontWeight={600}>User Type:</FormLabel>
                        <RadioGroup defaultValue={formik.values.userType}>
                            <Stack direction={'row'} gap={10}>
                                <Radio
                                    value='BUYER'
                                    name='userType'
                                    onChange={formik.handleChange}
                                >
                                    BUYER
                                </Radio>
                                <Radio
                                    value='SELLER'
                                    name='userType'
                                    onChange={formik.handleChange}
                                >
                                    SELLER
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    <Button type='submit' colorScheme='blue' width={'100%'}>
                        Sign Up
                    </Button>
                    <ChakraLink
                        as={ReactRouterLink}
                        to={'/login'}
                        fontWeight={600}
                    >
                        Have an account? Log in instead!
                    </ChakraLink>
                </form>
            </Stack>
        </Box>
    );
};

export default RegisterForm;
