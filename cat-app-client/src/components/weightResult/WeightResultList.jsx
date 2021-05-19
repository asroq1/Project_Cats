import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_WEIGHT_REQUEST, GET_CAT_REQUEST } from '../../reducers/cat';
import { useHistory } from 'react-router';
import { GET_USER_REQUEST } from '../../reducers/user';

const ListContainer = styled.div`
    display: grid;
    margin: 0 auto;
    max-height: 100vh;
    overflow-y: auto;
    width: 100%;
    height: 94vh;
    background-color: ${({ theme }) => theme.resultBackground};
`;

const DataContainer = styled.div`
    margin: 0 auto;
    width: 85%;
    height: 100%;
`;
const DataList = styled.div`
    margin: 0 auto;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    padding: 1.2rem;
    border-top: 1px solid ${({ theme }) => theme.palette.borderColor};

    p:nth-child(1) {
        display: grid;
        align-items: center;
        font-size: 1rem;
        color: ${({ theme }) => theme.resultText};
    }

    p:nth-child(2) {
        font-size: 2rem;
        font-weight: bold;
        color: ${({ theme }) => theme.resultText};
    }
`;
const DeleteButton = styled.button`
    display: grid;
    align-items: center;
    background: none;
    border: none;
    font-size: 1.6rem;
    color: ${palette.borderColor};

    &:hover, &:focus {
        color: #ff6666;
    }

    &:active {
        transform: scale(0.95);
    }
`;
const ErrorMessage = styled.h2`
    display: grid;
    align-items: center;
    width: 100%;
    height: 100%;
}
`;
const WeightResultList = ({ currentCatWeights }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.token) {
            alert('로그인 먼저 해주세요');
            history.push('/');
        }
        dispatch({
            type: GET_CAT_REQUEST,
        });
        dispatch({
            type: GET_USER_REQUEST,
        });
    }, []);

    const onRemove = useCallback((data) => {
        if (window.confirm('정말로 삭제하시겠어요?')) {
            dispatch({
                type: DELETE_WEIGHT_REQUEST,
                data,
            });
        }
    }, []);
    return (
        <ListContainer>
            {currentCatWeights.length === 0 && (
                <ErrorMessage>등록된 기록이 없습니다.</ErrorMessage>
            )}
            {currentCatWeights && (
                <DataContainer>
                    {currentCatWeights.map((data) => {
                        return (
                            <DataList key={data.id}>
                                <p>{data.createdDate.substr(0, 10)}</p>
                                <p>{data.weight}kg</p>
                                <DeleteButton onClick={() => onRemove(data.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </DeleteButton>
                            </DataList>
                        );
                    })}
                </DataContainer>
            )}
        </ListContainer>
    );
};

export default WeightResultList;
