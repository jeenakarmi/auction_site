import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    styles: {
        global: {
            '*': {
                boxSizing: 'border-box',
            },
        },
    },
    fonts: {
        heading: `"Montserrat", sans-serif`,
        body: `"Montserrat", sans-serif`,
    },
});
