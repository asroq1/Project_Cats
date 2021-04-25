import React from 'react';

import styled from 'styled-components';
import palette from '../../styles/palette';

import CatImageUpload from './CatImageUpload';
import CatsAdd from './CatsAdd';

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