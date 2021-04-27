import React from 'react';

import {useSelector} from 'react-redux';


import CatImageUpdate from './CatImageUpdate';
import CatsUpdate from './CatsUpdate';
import CatsDelete from './CatsDelete';

const CatsUpdateContainer = ({}) => {
    const {cat, currentIndex} = useSelector((state) => state.cat);
    const currentCat =cat[currentIndex - 1];

    return (
        <>

                <CatImageUpdate currentCat={currentCat}/>
                <CatsUpdate currentCat={currentCat}/>
                <CatsDelete currentIndex={currentIndex}/>
        </>
    )
};

export default CatsUpdateContainer;