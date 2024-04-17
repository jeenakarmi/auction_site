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

const LoginForm = () => {
    const navigate = useNavigate();
    const { GetCurrentUser, client, setRegistrationToggle, setCurrentUser } =
        useGlobalContext();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            userType: 'BUYER',
        },
        onSubmit: (values) => {
            console.log(values);
            client
                .post('/api/login/', values)
                .then((res) => {
                    GetCurrentUser();
                    navigate('/'); // go to home after login
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
                    Login
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
                        Login
                    </Button>
                    <ChakraLink
                        as={ReactRouterLink}
                        to={'/register'}
                        fontWeight={600}
                    >
                        Don't have an account? Register now!
                    </ChakraLink>
                </form>
            </Stack>
        </Box>
    );
};

export default LoginForm;
