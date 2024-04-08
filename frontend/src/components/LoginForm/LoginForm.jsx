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
        <form onSubmit={handleSubmit}>
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
                    <Stack direction={'row'}>
                        <Radio
                            value='BUYER'
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            BUYER
                        </Radio>
                        <Radio
                            value='SELLER'
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            SELLER
                        </Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>
            <Button type='submit' colorScheme='blue'>
                Login
            </Button>
            <ChakraLink as={ReactRouterLink} to={'/register'}>
                Don't have an account? Register now!
            </ChakraLink>
        </form>
    );
};

export default LoginForm;
