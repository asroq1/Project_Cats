import React from 'react';
import { useSelector } from 'react-redux';

import CatsAdd from '../components/catsAdd/CatsAdd';

const CatAdd = () => {
    const { cat } = useSelector((state) => state.cat);
    const hasCat = cat.length > 0 ? true : false;

    return (
        <>
            <CatsAdd hasCat={hasCat} />
        </>
    );
};

export default CatAdd;
