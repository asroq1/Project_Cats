import React, { useEffect } from 'react';
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
    max-width: 1200px;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.navy};
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
        color: ${({ theme }) => theme.palette.white};
    }

    p:nth-child(2) {
        font-size: 2rem;
        font-weight: bold;
        color: ${({ theme }) => theme.palette.white};
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
const data = [
    {
        name: '01-20',
        wgt: 29.2,
    },
    {
        name: '02-20',
        wgt: 29.2,
    },
    {
        name: '03-20',
        wgt: 29.2,
    },
    {
        name: '04-20',
        wgt: 29.2,
    },
    {
        name: '05-20',
        wgt: 29.2,
    },
    {
        name: '06-20',
        wgt: 29.2,
    },
    {
        name: '07-20',
        wgt: 29.2,
    },
    {
        name: '08-20',
        wgt: 29.2,
    },
    {
        name: '09-20',
        wgt: 29.2,
    },
    {
        name: '10-20',
        wgt: 29.2,
    },
    {
        name: '11-12',
        wgt: 29.2,
    },
];

const WeightResultTable = () => {
    const dispatch = useDispatch();
    const { cat, currentIndex } = useSelector((state) => state.cat);
    const onDelete = (id) => {
        dispatch(deleteWeightRequestAction(id));
    };
    useEffect(() => {
        dispatch(getWeightRequest());
    }, []);

    const date = new Date().toLocaleDateString();
    // const test = data.map((date) => console.log(date.name));
    // 연동하면 여기에서 바로 조회하면 끝
    // const test = axios.get('</백엔드 주소>');

    return (
        <ListContainer>
            {/* {test} */}
            {data.map((data) => {
                return (
                    <DataContainer>
                        <DataList key={date}>
                            <p>{data.name}</p>
                            <p>{data.wgt}kg</p>
                            <p>{cat.record}</p>
                            <DeleteButton>
                                <FontAwesomeIcon
                                    onClick={onDelete}
                                    icon={faTrashAlt}
                                />
                            </DeleteButton>
                        </DataList>
                    </DataContainer>
                );
            })}
        </ListContainer>
    );
};

export default WeightResultTable;
