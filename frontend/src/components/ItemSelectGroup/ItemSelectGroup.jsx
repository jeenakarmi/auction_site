import React from 'react';
import { Select, HStack } from '@chakra-ui/react';

const ItemSelectGroup = ({ groupArr, name, handleChange, bidItem }) => {
    return (
        <Select
            name={name}
            value={bidItem[name]}
            onChange={(e) => handleChange(e)}
        >
            {groupArr.map((selectOption, index) => {
                return (
                    <option key={index} value={selectOption} className='my-10'>
                        {selectOption}
                    </option>
                );
            })}
        </Select>
    );
};

export default ItemSelectGroup;
