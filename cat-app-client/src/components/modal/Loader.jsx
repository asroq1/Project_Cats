import React from 'react';
import styled,  { keyframes } from 'styled-components';

const spins = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const LoaderComponent = styled.div`
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;

    width: 120px;
    height: 120px;
    animation: ${spins} 2s linear infinite;
`;

const Loader = () => {
    return (
        <LoaderComponent/>
    );
};

export default Loader;
