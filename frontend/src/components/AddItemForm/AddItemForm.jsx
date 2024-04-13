import React from 'react';

import { FormControl, Input, FormLabel, Button } from '@chakra-ui/react';

const AddItemForm = () => {
    return (
        <form>
            <FormControl>
                <FormLabel>Name:</FormLabel>
                <Input type='text' name='itemName' />
            </FormControl>
            <FormControl>
                <FormLabel>Price:</FormLabel>
                <Input type='number' name='itemPrice' />
            </FormControl>
            <FormControl>
                <FormLabel>Image:</FormLabel>
                <Input
                    type='file'
                    name='itemImage'
                    accept='image/{jpg,png,jpeg}'
                />
            </FormControl>
            <Button>Submit</Button>
        </form>
    );
};

export default AddItemForm;
