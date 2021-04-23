import React from 'react';

import {useSelector} from 'react-redux';


import styled from 'styled-components';
import CatImageUpdate from './CatImageUpdate';

import CatsUpdate from './CatsUpdate';

const Global = styled.div`
    background-color: white;
    max-width: 1200px;
    width: 100vw;

    height: 100%;
    margin: 0 auto;
    h2 {
        font-size: 1.5rem;
        text-align: center;
    }
    label {
        font-weight: bold;
    }
    @media screen and (max-width: 768px) {
        width: 75vw;
    }
`;


const CatsUpdateContainer = ({}) => {

    const {cat, currentIndex} = useSelector((state) => state.cat);
    const currentCat =cat[currentIndex - 1];

    return (
        <>
        <Global>
                <CatImageUpdate currentCat={currentCat}/>
                <CatsUpdate currentCat={currentCat}/>
        </Global>
        </>
    )
};
export default CatsUpdateContainer;
