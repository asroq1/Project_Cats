import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import { DELETE_CAT_REQUEST } from '../../reducers/cat';

import styled from 'styled-components';
import PropTypes from 'prop-types';

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
    background-color: ${({theme}) => theme.orange};
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


            
            if (window.confirm("정말로 고양이정보를 지우시겠습니까??")){
                dispatch({
                    type: DELETE_CAT_REQUEST,
                    data: currentIndex,
                });
            }
            
            
        }, [currentIndex]);
        


    useEffect(() => {
        if(deleteCatDone){
            history.push('/user/main');
        }
    }, [deleteCatDone , history]);

    return (
        <>
        <InnerGlobal>
        <ButtonWrapper onClick={onClick}> 고양이 정보 삭제</ButtonWrapper>
        </InnerGlobal>
        </>
    );
};

CatsDelete.propTypes = {
    currentIndex: PropTypes.number.isRequired
}

export default CatsDelete;