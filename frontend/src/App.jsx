import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';
import { Stack } from '@chakra-ui/react';
import { useGlobalContext } from './context/GlobalContext';

import NavBar from './components/NavBar/NavBar';

import LoginRegister from './pages/LoginRegister';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Browse from './pages/Browse';
import AboutUsPage from './pages/About/AboutUs';
import ContactUsPage from './pages/Contactus/ContactUsPage';
import AddItemForm from './components/AddItemForm/AddItemForm';

import UserProfile from './pages/User/userprofile';

import ItemPage from './pages/ItemPage/ItemPage';


import Home from './pages/Home/Home';

const App = () => {
    const { currentUser } = useGlobalContext();

    return (
        <Stack
            width={'100%'}
            minH={'100vh'}
            direction={'column'}
            align={'center'}
            justify={'flex-start'}
        >
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<AboutUsPage />} />
                <Route path='/contact' element={<ContactUsPage />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='/add-item' element={<AddItemForm />} />
                <Route path='/user' element={< UserProfile />} />
                <Route path='/item/:id' element={<ItemPage />} />
            </Routes>
        </Stack>
    );
};

export default App;
