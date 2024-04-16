import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { FaRegCircleUser } from 'react-icons/fa6';
import { BiLogOut } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiAuctionLine } from 'react-icons/ri';
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
    const { client, setCurrentUser, setRegistrationToggle } =
        useGlobalContext();

    const handleLogout = () => {
        client
            .post('/api/logout', { withCredentials: true })
            .then((res) => {
                setCurrentUser(null);
                setRegistrationToggle(false);
            })
            .catch((err) => console.log(err));
    };

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
                    <MenuItem
                        icon={<RiAuctionLine className='text-2xl' />}
                        marginY={2}
                    >
                        Bids
                    </MenuItem>
                    <MenuItem
                        icon={<IoSettingsOutline className='text-2xl' />}
                        marginY={2}
                    >
                        Settings
                    </MenuItem>
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
