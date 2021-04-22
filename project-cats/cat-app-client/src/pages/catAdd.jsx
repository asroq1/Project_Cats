import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import CatsAdd from '../components/catsAdd/CatsAdd';
import CatImageUpload from '../components/catsAdd/CatImageUpload';

import palette from '../styles/palette';

const CatAdd = () => {
    const { cat } = useSelector((state) => state.cat);
    //const hasCat = cat.length > 0 ? true : false;
    const bgColor = useMemo(() => ({ backgroundColor: palette.beige }), []);
    
    return (
        <>
            <div style={bgColor}>
                <CatImageUpload/>
                {/* <CatsAdd /> */}
            </div>
        </>
    );
};

export default CatAdd;
