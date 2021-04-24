import React, { useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import palette from '../../styles/palette';
import 'font-awesome/css/font-awesome.min.css'



const Global = styled.div`
    display: flex;
    background-color: ${palette.beige};
    max-width: 1200px;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;

    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
        width: 100vw;
    }
`;

const MainEmpty = () => {
    return (
        <Global>
            <i className="fa fa-heart"></i>
           귀여운 고양이를 추가해 주세용!
        </Global>
    );
};

export default MainEmpty;