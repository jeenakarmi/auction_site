import React, { useState, useEffect } from 'react';

import {
    Box,
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

// car data
import { car_data } from '../../data/car_data';

const AddItemForm = () => {
    const { postNewItem } = useGlobalContext();

    const [brands, setBrands] = useState([]);
    const [carModels, setCarModels] = useState([]);
    const [type, setType] = useState([]);

    useEffect(() => {
        let newBrands = [];
        let newCarModels = [];
        let newVariants = [];
        car_data.map((car) => {
            newBrands.push(car.brandName);
        });
        car_data[0].models.map((model) => {
            newCarModels.push(model.modelType);
        });
        car_data[0].models[0].vehicles.map((vehicle) => {
            newVariants.push(vehicle.vehicleName);
        });
        setBrands(newBrands);
        setCarModels(newCarModels);
        setType(newVariants);
    }, []);

    // category (bike or cars)
    const category = ['2 wheeler', '4 wheeler'];
    // used or not
    const itemState = ['Brand New', 'Used'];
    const [bidItem, setBitItem] = useState({
        itemName: '',
        itemBrand: car_data[0].brandName,
        itemModel: car_data[0].models[0].modelType,
        itemCategory: category[0],
        itemType: car_data[0].models[0].vehicles[0].vehicleName,
        isBrandNew: true,
        usedPeriod: 0,
        itemDescription: '',
        itemImage: null,
        startingPrice: 0.0,
    });

    const handleBrandChange = (e) => {
        setBitItem({
            ...bidItem,
            itemBrand: e.target.value,
        });
        const newModels = [];
        const newTypes = [];
        const newCar = car_data.find((car) => car.brandName === e.target.value);
        newCar.models.map((model) => {
            newModels.push(model.modelType);
        });
        newCar.models[0].vehicles.map((vehicle) => {
            newTypes.push(vehicle.vehicleName);
        });
        setType(newTypes);
        setCarModels(newModels);
    };

    const handleModelChange = (e) => {
        setBitItem({
            ...bidItem,
            itemModel: e.target.value,
        });
        const newTypes = [];
        car_data
            .find((car) => car.brandName === bidItem.itemBrand)
            .models.find((model) => model.modelType === e.target.value)
            .vehicles.map((vehichle) => newTypes.push(vehichle.vehicleName));
        setType(newTypes);
    };

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
                handleBrandChange(e);
                break;
            case 'itemModel':
                handleModelChange(e);
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
        <Box
            width={'40%'}
            minW={'480px'}
            maxW={'640px'}
            marginY={10}
            rounded={10}
            padding={10}
            boxShadow={'0 0 30px 0 #38664150'}
        >
            <form
                onSubmit={(e) => handleSubmit(e)}
                className='w-full h-full flex flex-col gap-5'
            >
                <FormControl>
                    <FormLabel fontWeight={600}>Name:</FormLabel>
                    <Input
                        type='text'
                        name='itemName'
                        value={bidItem.itemName}
                        onChange={(e) => handleChange(e)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={600}>Category:</FormLabel>
                    <ItemRadioGroup
                        groupArr={category}
                        handleChange={handleChange}
                        name={'category'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={600}>Brand:</FormLabel>
                    <ItemSelectGroup
                        groupArr={brands}
                        handleChange={handleChange}
                        name={'brand'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={600}>Model:</FormLabel>
                    <ItemSelectGroup
                        groupArr={carModels}
                        handleChange={handleChange}
                        name={'itemModel'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={600}>Type:</FormLabel>
                    <ItemSelectGroup
                        name='itemType'
                        groupArr={type}
                        handleChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={600}>Brand New:</FormLabel>
                    <ItemRadioGroup
                        groupArr={itemState}
                        name={'isBrandNew'}
                        handleChange={handleChange}
                    />
                </FormControl>
                {!bidItem.isBrandNew && (
                    <FormControl>
                        <FormLabel fontWeight={600}>Used Years:</FormLabel>
                        <Input
                            type='number'
                            name='usedPeriod'
                            value={bidItem.usedPeriod}
                            onChange={(e) => handleChange(e)}
                        />
                    </FormControl>
                )}
                <FormControl>
                    <FormLabel fontWeight={600}>Description:</FormLabel>
                    <Textarea
                        placeholder='Write a short description about the item...'
                        name='description'
                        value={bidItem.itemDescription}
                        onChange={(e) => handleChange(e)}
                        maxLength={1000}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={600}>Starting Price:</FormLabel>
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
                    <FormLabel fontWeight={600}>Image:</FormLabel>
                    <Input
                        type='file'
                        name='itemImage'
                        accept='image/{jpg,png,jpeg}'
                        onChange={(e) => handleChange(e)}
                    />
                </FormControl>
                <Button type='submit' colorScheme='blue'>
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default AddItemForm;
