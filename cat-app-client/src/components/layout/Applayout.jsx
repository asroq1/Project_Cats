import React from 'react';

import styled from 'styled-components';

const BodyWrapper = styled.div`
    background-color: ${({theme}) => theme.palette.orange};
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
`;

const Global = styled.div`
    background-color: ${({theme}) => theme.palette.beige};
    max-width: ${({theme}) => theme.width.mobile};
    width: 100vw;
    height: 100vh;
    margin: 0 auto;

    h2 {
        font-size: 1.5rem;
        text-align: center;
    }
    label {
        font-weight: bold;
    }
    // @media screen and (max-width: 768px) {
    //     width: 100vw;
    // }
`;

const Applayout = ({children}) => {
    return (
        <>
        <BodyWrapper>
            <Global>
                {children}
            </Global>
        </BodyWrapper>
        </>

    )
}

export default Applayout;