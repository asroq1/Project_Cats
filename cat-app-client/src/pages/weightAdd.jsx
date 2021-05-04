import React from 'react';

import AddWeight from '../components/weightAdd/AddWeight';
import AddWeightHeader from '../components/weightAdd/AddWeightHeader';

import styled from 'styled-components';

const BackgroundColor = styled.div`
    background-color:${({theme})=>theme.beige};
`;

const WeightAdd = () => {
    return (
        
        <BackgroundColor>
            <AddWeightHeader />
            <AddWeight />
        </BackgroundColor>
    );
};

export default WeightAdd;
