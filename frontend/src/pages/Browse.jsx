import React from 'react';
import { Heading, Button } from '@chakra-ui/react';
import { useGlobalContext } from '../context/GlobalContext';

const Browse = () => {
    const { client, currentUser, setCurrentUser, setRegistrationToggle } =
        useGlobalContext();

    const handleLogout = (e) => {
        e.preventDefault();
        client
            .post('/api/logout', { withCredentials: true })
            .then((res) => {
                setCurrentUser(null);
                setRegistrationToggle(false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <Heading size={'2xl'} textAlign={'center'}>
            This is browse page of {currentUser.email}!
            <form onSubmit={handleLogout}>
                <Button type='submit'>Log out</Button>
            </form>
        </Heading>
    );
};

export default Browse;
