import React from 'react';

import CatImageUpload from './CatImageUpload';
import CatsAdd from './CatsAdd';
import styled from 'styled-components';

const BackgroundColor = styled.div`
    background-color: ${({ theme }) => theme.beige};
    margin: 0;
    padding: 0;
    min-height: 100vh;
`;

const CatsAddContainer = () => {
    return (
        <BackgroundColor>
            <CatImageUpload />
            <CatsAdd />
        </BackgroundColor>
    );
};

export default CatsAddContainer;
