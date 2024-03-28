import React from 'react';

import { useGlobalContext } from './context/GlobalContext';

import LoginRegister from './pages/LoginRegister';
import Browse from './pages/Browse';

const App = () => {
    const { currentUser } = useGlobalContext();

    if (!currentUser) {
        return <LoginRegister />;
    }

    return (
        <div>
            <Browse />
        </div>
    );
};

export default App;
