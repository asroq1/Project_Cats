import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteWeightRequestAction,
    getWeightRequest,
} from '../../reducers/cat';
const ListContainer = styled.div`
    display: grid;
    margin: 0 auto;
    max-height: 100vh;
    overflow-y: auto;
    width: 100%;
    height: 100%;
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

    &:hover {
        color: #ff6666;
    }

    &:active {
        transform: scale(0.95);
    }
`;

const WeightResultList = ({}) => {
    const dispatch = useDispatch();
    const { currentIndex, currentCatWeights } = useSelector(
        (state) => state.cat
    );
    // const onDelete = (id) => {
    //     console.log('아이디', id);
    //     dispatch(deleteWeightRequestAction(id));
    // };
    useEffect(() => {
        console.log(currentCatWeights);
    }, []);

    const onRemove = useCallback((e) => {
        e.preventDefault();

        dispatch(deleteWeightRequestAction(currentCatWeights[0].id));

        console.log(`확인 : ${currentCatWeights[0].id}`);
        console.log(`값 확인 : ${currentCatWeights[0]}`);
    }, []);
    return (
        <ListContainer>
            {/* {test} */}
            {currentCatWeights.map((data) => {
                return (
                    <DataContainer>
                        <DataList key={data.id}>
                            <p>{data.createdDate.substr(0, 10)}</p>
                            <p>{data.weight}kg</p>
                            <p>{data.id}</p>
                            <DeleteButton onClick={onRemove}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </DeleteButton>
                        </DataList>
                    </DataContainer>
                );
            })}
        </ListContainer>
    );
};

export default WeightResultList;
