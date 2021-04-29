import React from 'react';

import {useSelector} from 'react-redux';


import CatImageUpdate from './CatImageUpdate';
import CatsUpdate from './CatsUpdate';
import CatsDelete from './CatsDelete';

const CatsUpdateContainer = ({}) => {
    const {cat, currentIndex} = useSelector((state) => state.cat);

    return (
        <>

                <CatImageUpdate cat={cat} currentIndex={currentIndex}/>
                <CatsUpdate cat = {cat} currentIndex = {currentIndex}/>
                <CatsDelete currentIndex={currentIndex}/>
        </>
    )
};

export default CatsUpdateContainer;