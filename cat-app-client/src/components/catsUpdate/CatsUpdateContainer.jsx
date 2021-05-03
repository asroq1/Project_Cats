import React from 'react';

import { useSelector } from 'react-redux';

import styled from 'styled-components';
import CatImageUpdate from './CatImageUpdate';
import CatsUpdate from './CatsUpdate';
import CatsDelete from './CatsDelete';

const BackgroundColor = styled.div`
    background-color: ${({ theme }) => theme.beige};
    margin: 0;
    padding: 0;
`;

const CatsUpdateContainer = ({}) => {
    const { cat, currentIndex } = useSelector((state) => state.cat);

    return (
        <BackgroundColor>
            <CatImageUpdate cat={cat} currentIndex={currentIndex} />
            <CatsUpdate cat={cat} currentIndex={currentIndex} />
            <CatsDelete currentIndex={currentIndex} />
        </BackgroundColor>
    );
};

export default CatsUpdateContainer;
