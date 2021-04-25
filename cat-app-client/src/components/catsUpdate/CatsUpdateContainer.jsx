import React from 'react';

import {useSelector} from 'react-redux';

import styled from 'styled-components';
import palette from '../../styles/palette';

import CatImageUpdate from './CatImageUpdate';
import CatsUpdate from './CatsUpdate';
import CatsDelete from './CatsDelete';

const Global = styled.div`
    background-color:${palette.beige};
    max-width: 1200px;
    width: 100vw;
    min-height: 100vh;
    margin: 0 auto;
    h2 {
        font-size: 1.5rem;
        text-align: center;
    }
    label {
        font-weight: bold;
    }
    @media screen and (max-width: 768px) {
        width: 100vw;
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
                <CatsDelete currentIndex={currentIndex}/>
        </Global>
        </>
    )
};

export default CatsUpdateContainer;