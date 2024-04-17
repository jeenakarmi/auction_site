import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { FaRegCircleUser } from 'react-icons/fa6';
import { BiLogOut } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiAuctionLine } from 'react-icons/ri';
import { GiReceiveMoney } from 'react-icons/gi';
import { MdPublic, MdOutlinePending } from 'react-icons/md';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    IconButton,
    Link as ChakraLink,
} from '@chakra-ui/react';

import { useGlobalContext } from '../../context/GlobalContext';

const LoggedInUserNavMenu = () => {
    const { client, setCurrentUser, setRegistrationToggle, currentUser } =
        useGlobalContext();

    const handleLogout = () => {
        client
            .post('/api/logout/', { withCredentials: true })
            .then((res) => {
                setCurrentUser(null);
                setRegistrationToggle(false);
            })
            .catch((err) => console.log(err));
    };

    const sellerPages = [
        {
            name: 'Active Lots',
            link: '/my-active-lots',
            icon: <MdPublic className='text-2xl' />,
        },
        {
            name: 'Pending Lots',
            link: '/pending-receive-payment-bids',
            icon: <GiReceiveMoney className='text-2xl' />,
        },
        {
            name: 'Sold Lots',
            link: '/sold-lots',
            icon: <RiAuctionLine className='text-2xl' />,
        },
    ];
    const buyerPages = [
        {
            name: 'Placed Top Bids',
            link: '/placed-top-bids',
            icon: <MdPublic className='text-2xl' />,
        },
        {
            name: 'Pending Payments',
            link: '/pending-make-payment-bids',
            icon: <GiReceiveMoney className='text-2xl' />,
        },
        {
            name: 'Purchased Lots',
            link: '/purchased-bids',
            icon: <RiAuctionLine className='text-2xl' />,
        },
    ];

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<FaRegCircleUser />}
                variant={'outline'}
                fontSize={'1.5rem'}
                width={50}
                height={50}
            />
            <MenuList>
                <MenuGroup>
                    <ChakraLink
                        as={ReactRouterLink}
                        to={'/user'}
                        _hover={{
                            textDecoration: 'none',
                        }}
                    >
                        <MenuItem
                            icon={<FaRegCircleUser className='text-2xl' />}
                            marginY={2}
                        >
                            Profile
                        </MenuItem>
                    </ChakraLink>
                    {(currentUser.userType === 'SELLER'
                        ? sellerPages
                        : buyerPages
                    ).map((page, index) => {
                        return (
                            <ChakraLink
                                key={index}
                                as={ReactRouterLink}
                                to={page.link}
                                _hover={{
                                    textDecoration: 'none',
                                }}
                            >
                                <MenuItem icon={page.icon} marginY={2}>
                                    {page.name}
                                </MenuItem>
                            </ChakraLink>
                        );
                    })}
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                    <MenuItem
                        icon={<BiLogOut className='text-2xl' />}
                        marginY={2}
                        onClick={handleLogout}
                    >
                        Log Out
                    </MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    );
};

export default LoggedInUserNavMenu;
