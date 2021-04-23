import React from 'react';


import styled from 'styled-components';
import CatImageUpload from './CatImageUpload';

import CatsAdd from './CatsAdd';

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


const CatsAddContainer = ({}) => {

    return (
        <>
        <Global>
                <CatImageUpload/>
                <CatsAdd/>
        </Global>
        </>
    )
};
export default CatsAddContainer;
