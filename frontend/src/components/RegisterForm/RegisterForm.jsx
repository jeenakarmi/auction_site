import React, { useState } from 'react';
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
} from '@chakra-ui/react';

import { useGlobalContext } from '../../context/GlobalContext';

const RegisterForm = () => {
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
            .then(setRegistrationToggle(false))
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
                Register
            </Button>
            <Text onClick={() => setRegistrationToggle(false)}>
                Have an account? Log in instead!
            </Text>
        </form>
    );
};

export default RegisterForm;
