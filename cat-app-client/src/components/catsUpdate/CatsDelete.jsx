import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import { DELETE_CAT_REQUEST } from '../../reducers/cat';

import styled from 'styled-components';

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
    background-color: ${({theme}) => theme.palette.orange};
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

    const { deleteCatDone } = useSelector((state) => state.cat);

    // 버튼 누르면 정보 전달
    const onClick = useCallback(
        (e) => {
            e.preventDefault();
            dispatch({
                type: DELETE_CAT_REQUEST,
                data: currentIndex,
            });
            
            
        }, []);
        

    const goBack = useCallback(() => {
        history.goBack();
    });


    useEffect(() => {
        if(deleteCatDone){
            history.push('/user/main');
        }
    }, [deleteCatDone]);

    return (
        <>
        <InnerGlobal>
        <ButtonWrapper onClick={onClick}> 고양이 정보 삭제</ButtonWrapper>
        </InnerGlobal>
        </>
    );
};

export default CatsDelete;