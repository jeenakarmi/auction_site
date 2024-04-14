import React, { useState } from 'react';

import {
    FormControl,
    Input,
    FormLabel,
    Button,
    RadioGroup,
    Radio,
    Stack,
    HStack,
    Textarea,
} from '@chakra-ui/react';
import ItemRadioGroup from '../ItemRadioGroup/ItemRadioGroup';
import ItemSelectGroup from '../ItemSelectGroup/ItemSelectGroup';
import { useGlobalContext } from '../../context/GlobalContext';

const AddItemForm = () => {
    const { postNewItem } = useGlobalContext();
    // car model list
    const carModels = [
        'SUV',
        'Sedan',
        'Convertible',
        'Coupe',
        'Electric',
        'Hatchback',
        'Crossover',
        'Hybrid',
        'Luxury',
    ];
    // car brands list
    const brands = [
        'Honda',
        'Toyota',
        'BMW',
        'Suzuki',
        'Tesla',
        'Ford',
        'Ferrari',
        'Subaru',
        'Audi',
    ];
    // type of the car
    const type = ['TypeA', 'TypeB', 'TypeC', 'TypeD'];
    // category (bike or cars)
    const category = ['2 wheeler', '4 wheeler'];
    // used or not
    const itemState = ['Brand New', 'Used'];
    const [bidItem, setBitItem] = useState({
        itemName: '',
        itemBrand: brands[0],
        itemModel: carModels[0],
        itemCategory: category[0],
        itemType: '',
        isBrandNew: true,
        usedPeriod: 0,
        itemDescription: '',
        itemImage: null,
        startingPrice: 0.0,
    });

    const handleChange = (e) => {
        const targetName = e.target.name;
        switch (targetName) {
            case 'itemName':
                setBitItem({
                    ...bidItem,
                    itemName: e.target.value,
                });
                break;
            case 'brand':
                setBitItem({
                    ...bidItem,
                    itemBrand: e.target.value,
                });
                console.log(bidItem);
                break;
            case 'itemModel':
                setBitItem({
                    ...bidItem,
                    itemModel: e.target.value,
                });
                break;
            case 'category':
                setBitItem({
                    ...bidItem,
                    itemCategory: e.target.value,
                });
                break;
            case 'itemType':
                setBitItem({
                    ...bidItem,
                    itemType: e.target.value,
                });
                break;
            case 'isBrandNew':
                setBitItem({
                    ...bidItem,
                    isBrandNew: e.target.value === 'Brand New',
                });
                break;
            case 'usedPeriod':
                setBitItem({
                    ...bidItem,
                    usedPeriod: e.target.value,
                });
                break;
            case 'description':
                setBitItem({
                    ...bidItem,
                    itemDescription: e.target.value,
                });
                break;
            case 'startingPrice':
                setBitItem({
                    ...bidItem,
                    startingPrice: e.target.value,
                });
                break;
            case 'itemImage':
                setBitItem({
                    ...bidItem,
                    itemImage: e.target.files,
                });
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(bidItem);
        postNewItem(bidItem);
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <FormControl>
                <FormLabel>Name:</FormLabel>
                <Input
                    type='text'
                    name='itemName'
                    value={bidItem.itemName}
                    onChange={(e) => handleChange(e)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Brand:</FormLabel>
                <ItemSelectGroup
                    groupArr={brands}
                    handleChange={handleChange}
                    name={'brand'}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Category:</FormLabel>
                <ItemRadioGroup
                    groupArr={category}
                    handleChange={handleChange}
                    name={'category'}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Model:</FormLabel>
                <ItemSelectGroup
                    groupArr={carModels}
                    handleChange={handleChange}
                    name={'itemModel'}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Type:</FormLabel>
                <ItemSelectGroup
                    name='itemType'
                    groupArr={type}
                    handleChange={handleChange}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Brand New:</FormLabel>
                <ItemRadioGroup
                    groupArr={itemState}
                    name={'isBrandNew'}
                    handleChange={handleChange}
                />
            </FormControl>
            {!bidItem.isBrandNew && (
                <FormControl>
                    <FormLabel>Used Years:</FormLabel>
                    <Input
                        type='number'
                        name='usedPeriod'
                        value={bidItem.usedPeriod}
                        onChange={(e) => handleChange(e)}
                    />
                </FormControl>
            )}
            <FormControl>
                <FormLabel>Description:</FormLabel>
                <Textarea
                    placeholder='Write a short description about the item...'
                    name='description'
                    value={bidItem.itemDescription}
                    onChange={(e) => handleChange(e)}
                    maxLength={1000}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Starting Price:</FormLabel>
                <Input
                    type='number'
                    value={bidItem.startingPrice}
                    onChange={(e) => handleChange(e)}
                    step={'0.01'}
                    pattern='\d{0,8}(\.\d{0,2})?'
                    name='startingPrice'
                />
            </FormControl>
            <FormControl>
                <FormLabel>Image:</FormLabel>
                <Input
                    type='file'
                    name='itemImage'
                    accept='image/{jpg,png,jpeg}'
                    onChange={(e) => handleChange(e)}
                />
            </FormControl>
            <Button type='submit'>Submit</Button>
        </form>
    );
};

export default AddItemForm;
