import React, { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [userType, setUserType] = useState('BUYER');

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentUser = { email, password, username, phone, userType };

        client
            .post('/api/register', currentUser)
            .then(() => {
                alert('Account Created!');
                navigate('/login');
            })
            .catch((err) => console.log(err));
    };

    return (
        <Box
            width={'100%'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flex={'1 0 auto'}
        >
            <Stack
                width={'30%'}
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
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-4 justify-center items-center'
                >
                    <FormControl>
                        <FormLabel>Email:</FormLabel>
                        <Input
                            type='email'
                            name='email'
                            placeholder='email@gmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password:</FormLabel>
                        <Input
                            type='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Username:</FormLabel>
                        <Input
                            type='text'
                            name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Phone No.:</FormLabel>
                        <Input
                            type='number'
                            name='phone'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>User Type:</FormLabel>
                        <RadioGroup defaultValue={userType}>
                            <Stack direction={'row'} gap={10}>
                                <Radio
                                    value='BUYER'
                                    onChange={(e) =>
                                        setUserType(e.target.value)
                                    }
                                >
                                    BUYER
                                </Radio>
                                <Radio
                                    value='SELLER'
                                    onChange={(e) =>
                                        setUserType(e.target.value)
                                    }
                                >
                                    SELLER
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    <Button type='submit' colorScheme='blue' width={'100%'}>
                        Sign Up
                    </Button>
                    <ChakraLink as={ReactRouterLink} to={'/login'}>
                        Have an account? Log in instead!
                    </ChakraLink>
                </form>
            </Stack>
        </Box>
    );
};

export default RegisterForm;
