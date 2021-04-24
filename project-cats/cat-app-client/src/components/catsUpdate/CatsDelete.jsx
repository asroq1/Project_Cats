import React, { useCallback } from 'react';
import { useDispatch} from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { DELETE_CAT_REQUEST } from '../../reducers/cat';

import palette from '../../styles/palette';

// 스타일링된 input block
const InnerGlobal = styled.div`
    width: 80%;
    margin: 1rem auto;
`;

const ButtonWrapper = styled.button`
    width: 100%;

    
    padding-top: 1rem;
    padding-bottom: 1rem;
    border: none;
    border-radius:10px;
    font-size: 1rem;
    font-weight: bold;
    background-color: ${palette.orange};
    cursor: pointer;

    color: white;
    margin-top: 0.5rem;
    & + & {
        margin-left: 0.5rem;
    }
    &:hover {
        background: darkred;
    }
`;


const CatsDelete = ({currentIndex}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // 버튼 누르면 정보 전달
    const onClick = useCallback(
        (e) => {
            e.preventDefault();

            dispatch({
                type: DELETE_CAT_REQUEST,
                data: currentIndex,
            });
            history.push('/user/main');
        },
        []
    );

    const goBack = useCallback(() => {
        history.goBack();
    });

    return (
        <>
        <InnerGlobal>
        <ButtonWrapper onClick={onClick}> 고양이 정보 삭제</ButtonWrapper>
        </InnerGlobal>
        </>
    );
};

export default CatsDelete;