import React, { useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import palette from '../../styles/palette';
import 'font-awesome/css/font-awesome.min.css'



const Global = styled.div`
    background-color: ${palette.beige};
    max-width: 1200px;
    width: 100vw;
    height: calc(100vh - 32px);
    display: flex;
    text-align:center;

    div {
        margin:auto;
    }



    @media screen and (max-width: 768px) {
        width: 100vw;
    }
`;

const MainEmpty = () => {
    return (
        <>
        <Global>
            <div>
            <i className="fa fa-heart"></i>
           <h1>귀여운 고양이를 추가해 주세용!</h1>

        </div>
        </Global>
        </>
    );
};

export default MainEmpty;