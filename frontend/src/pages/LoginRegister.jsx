import React from 'react';

import { useGlobalContext } from '../context/GlobalContext';

import RegisterForm from '../components/RegisterForm/RegisterForm';
import LoginForm from '../components/LoginForm/LoginForm';

const LoginRegister = () => {
    const { registrationToggle } = useGlobalContext();

    const renderForm = () => {
        return registrationToggle ? <RegisterForm /> : <LoginForm />;
    };

    return <div>{renderForm()}</div>;
};

export default LoginRegister;
