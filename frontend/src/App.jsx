import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './context/GlobalContext';

import NavBar from './components/NavBar/NavBar';

import LoginRegister from './pages/LoginRegister';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Browse from './pages/Browse';
import AboutUsPage from './pages/About/AboutUs';

import Home from './pages/Home/Home';

const App = () => {
    const { currentUser } = useGlobalContext();

    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path="/about" element={<AboutUsPage />} />
            </Routes>
        </>
    );
};

export default App;
