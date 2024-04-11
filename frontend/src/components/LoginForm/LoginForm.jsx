import React, { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
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
    const { client, setRegistrationToggle, setCurrentUser } =
        useGlobalContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('BUYER');

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentUser = { email, password, userType };

        client
            .post('/api/login', currentUser)
            .then((res) => {
                setCurrentUser(res.data);
                console.log(res.data);
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
                    Login
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
                        Login
                    </Button>
                    <ChakraLink as={ReactRouterLink} to={'/register'}>
                        Don't have an account? Register now!
                    </ChakraLink>
                </form>
            </Stack>
        </Box>
    );
};

export default LoginForm;
