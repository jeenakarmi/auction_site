import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

// default axios variables like ensuring the csrftoken get sent with the request we make to django
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

const GlobalContext = createContext();

// global state provider
const GlobalProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [registrationToggle, setRegistrationToggle] = useState(false);

    useEffect(() => {
        client
            .get('/api/user')
            .then((res) => {
                setCurrentUser(res.data.user);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                setCurrentUser(false);
            });
    }, []);

    // function for posting new created bid item
    const postNewItem = (data) => {
        const xsrfCookies = document.cookie
            .split(';')
            .map((c) => c.trim())
            .filter((c) => c.startsWith('csrftoken='))[0]
            .split('=')[1];
        console.log(xsrfCookies);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': xsrfCookies,
            },
        };
        let formData = new FormData();
        formData.append('itemName', data.itemName);
        formData.append('itemBrand', data.itemBrand);
        formData.append('itemModel', data.itemModel);
        formData.append('itemCategory', data.itemCategory);
        formData.append('itemType', data.itemType);
        formData.append('isBrandNew', data.isBrandNew);
        if (!data.isBrandNew) {
            formData.append('usedPeriod', data.usedPeriod);
        }
        formData.append('itemDescription', data.itemDescription);
        formData.append('itemImage', data.itemImage[0]);
        formData.append('startingPrice', data.startingPrice);
        formData.append('seller', currentUser.id);

        client
            .post('http://127.0.0.1:8000/api/item/create/', formData, config)
            .then((res) => console.log(res))
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <GlobalContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                registrationToggle,
                setRegistrationToggle,
                client,
                postNewItem,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalProvider;
