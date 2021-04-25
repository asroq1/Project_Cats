import React, { useEffect, useCallback, useMemo } from 'react';

import styled from 'styled-components';
import palette from '../../styles/palette';
import 'font-awesome/css/font-awesome.min.css'

const Global = styled.div`
    background-color: ${palette.beige};
    max-width: 1200px;
    width: 100vw;
    height: calc(100vh - 32px);
    margin: 0 auto; 
    display: flex;
    text-align:center;
    div {
        margin:auto;

        line-height: 2;
        font-size: 1.5rem;
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
            
           <h1><i className="fa fa-heart"></i> 귀여운 고양이를 <br/>
           추가해 주세용! <i className="fa fa-heart"></i></h1>
        </div>
        </Global>
        </>
    );
};

export default MainEmpty;