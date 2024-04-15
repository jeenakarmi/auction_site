import React from 'react';
import { Select, HStack } from '@chakra-ui/react';

const ItemSelectGroup = ({ groupArr, name, handleChange }) => {
    return (
        <Select
            defaultValue={groupArr[0]}
            name={name}
            onChange={(e) => handleChange(e)}
        >
            {groupArr.map((selectOption) => {
                return (
                    <option
                        key={selectOption}
                        value={selectOption}
                        className='my-10'
                    >
                        {selectOption}
                    </option>
                );
            })}
        </Select>
    );
};

export default ItemSelectGroup;
