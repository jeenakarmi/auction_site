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
import { useNavigate } from 'react-router-dom';

import ItemRadioGroup from '../ItemRadioGroup/ItemRadioGroup';
import ItemSelectGroup from '../ItemSelectGroup/ItemSelectGroup';
import { useGlobalContext } from '../../context/GlobalContext';

// car data
import { car_data } from '../../data/car_data';

const AddItemForm = () => {
    const { postNewItem } = useGlobalContext();
    const navigate = useNavigate();

    const [brands, setBrands] = useState([]);
    const [carModels, setCarModels] = useState([]);
    const [type, setType] = useState([]);
    const [variants, setVariants] = useState([]);

    useEffect(() => {
        let newBrands = [];
        let newCarModels = [];
        let newTypes = [];
        let newVariants = [];
        car_data.map((car) => {
            newBrands.push(car.brandName);
        });
        car_data[0].models.map((model) => {
            newCarModels.push(model.modelType);
        });
        car_data[0].models[0].vehicles.map((vehicle) => {
            newTypes.push(vehicle.vehicleName);
        });
        const tempVariantArr = car_data[0].models[0].vehicles[0].variant;
        if (tempVariantArr && tempVariantArr.length > 0) {
            newVariants = tempVariantArr;
        }

        setBrands(newBrands);
        setCarModels(newCarModels);
        setType(newTypes);
        setVariants(newVariants);
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
        itemVariant: '',
        isBrandNew: true,
        usedPeriod: 0,
        itemDescription: '',
        itemImage: null,
        startingPrice: 0.0,
    });

    const handleBrandChange = (e) => {
        const newModels = [];
        const newTypes = [];
        let newVariants = [];
        const newCar = car_data.find((car) => car.brandName === e.target.value);
        newCar.models.map((model) => {
            newModels.push(model.modelType);
        });
        newCar.models[0].vehicles.map((vehicle) => {
            newTypes.push(vehicle.vehicleName);
        });
        const tempVariantArr = newCar.models[0].vehicles[0].variant;
        if (tempVariantArr && tempVariantArr.length > 0) {
            newVariants = tempVariantArr;
        }
        setType(newTypes);
        setCarModels(newModels);
        setVariants(newVariants);
        setBitItem({
            ...bidItem,
            itemBrand: e.target.value,
            itemModel: newModels[0],
            itemType: newTypes[0],
            itemVariant: newVariants.length > 0 ? newVariants[0] : '',
        });
        console.log(bidItem);
    };

    const handleModelChange = (e) => {
        setBitItem({
            ...bidItem,
            itemModel: e.target.value,
        });
        const newTypes = [];
        let newVariants = [];
        const currentVehicleArr = car_data
            .find((car) => car.brandName === bidItem.itemBrand)
            .models.find(
                (model) => model.modelType === e.target.value
            ).vehicles;

        currentVehicleArr.map((vehichle) =>
            newTypes.push(vehichle.vehicleName)
        );

        const tempVariantArr = currentVehicleArr[0].variant;
        if (tempVariantArr && tempVariantArr.length > 0) {
            newVariants = tempVariantArr;
        }

        setType(newTypes);
        setVariants(newVariants);
    };

    const handleTypeChange = (e) => {
        const currentType = car_data
            .find((car) => car.brandName === bidItem.itemBrand)
            .models.find((model) => model.modelType === bidItem.itemModel)
            .vehicles.find(
                (vehichle) => vehichle.vehicleName === e.target.value
            );
        let newVariant = [];
        if (currentType.variant) {
            newVariant = currentType.variant;
        }

        setBitItem({
            ...bidItem,
            itemType: e.target.value,
            itemVariant: newVariant.length > 0 ? newVariant[0] : '',
        });
        setVariants(newVariant);
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
            case 'category':
                setBitItem({
                    ...bidItem,
                    itemCategory: e.target.value,
                });
                break;
            case 'brand':
                handleBrandChange(e);
                break;
            case 'itemModel':
                handleModelChange(e);
                break;
            case 'itemType':
                handleTypeChange(e);
                break;
            case 'itemVariant':
                setBitItem({
                    ...bidItem,
                    itemVariant: e.target.value,
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
        navigate('/');
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
                        bidItem={bidItem}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={600}>Model:</FormLabel>
                    <ItemSelectGroup
                        groupArr={carModels}
                        handleChange={handleChange}
                        name={'itemModel'}
                        bidItem={bidItem}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={600}>Type:</FormLabel>
                    <ItemSelectGroup
                        name='itemType'
                        groupArr={type}
                        handleChange={handleChange}
                        bidItem={bidItem}
                    />
                </FormControl>
                {variants.length > 0 && (
                    <FormControl>
                        <FormLabel fontWeight={600}>Variant:</FormLabel>
                        <ItemSelectGroup
                            name='itemVariant'
                            groupArr={variants}
                            handleChange={handleChange}
                            bidItem={bidItem}
                        />
                    </FormControl>
                )}
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
