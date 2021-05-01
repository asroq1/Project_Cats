import React from 'react';

import styled from 'styled-components';


const BodyWrapper = styled.div`
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 100% 100%;
    //background-color: ${({theme}) => theme.palette.orange};
	//animation: gradient 30s ease infinite;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    // @keyframes gradient {
    //     0% {
    //         background-position: 0% 50%;
    //     }
    //     50% {
    //         background-position: 100% 50%;
    //     }
    //     100% {
    //         background-position: 0% 50%;
    //     }
    // }
`;

const Global = styled.div`
    background-color: ${({theme}) => theme.palette.beige};
    max-width: ${({theme}) => theme.width.mobile};
    width: 100vw;
    min-height: 100vh;
    margin: 0 auto;
    position: relative;

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