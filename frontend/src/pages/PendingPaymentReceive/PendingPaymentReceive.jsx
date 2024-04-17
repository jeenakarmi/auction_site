import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
    Stack,
    VStack,
    Heading,
    Text,
    Link as ChakraLink,
} from '@chakra-ui/react';
import BidItem from '../../components/BidItem/BidItem';

import { useGlobalContext } from '../../context/GlobalContext';

const PendingPaymentReceive = () => {
    const { client } = useGlobalContext();

    const [placedTopBids, setPlacedTopBids] = useState([]);

    const getPlacedTopBids = () => {
        client
            .get('/api/items/seller-active-lots')
            .then((res) => {
                setPlacedTopBids(
                    res.data.bidLots.filter(
                        (bidlot) => bidlot.isSold && bidlot.isPendingPayment
                    )
                );
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getPlacedTopBids();
    }, []);

    return (
        <Stack
            direction={'column'}
            maxW={'1280px'}
            w={'80%'}
            alignItems={'center'}
            gap={10}
            marginY={10}
        >
            <Heading size={'lg'}>Payments to Receive</Heading>
            <Stack
                w={'100%'}
                direction={'row'}
                gap={5}
                justifyContent={'center'}
                flexWrap={'wrap'}
            >
                {placedTopBids.map((placedTopBid) => {
                    return (
                        <BidItem
                            key={placedTopBid.id}
                            placedTopBid={placedTopBid}
                        />
                    );
                })}
            </Stack>
        </Stack>
    );
};

export default PendingPaymentReceive;
