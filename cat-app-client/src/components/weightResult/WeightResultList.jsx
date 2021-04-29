import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { deleteWeightRequestAction } from '../../reducers/cat';
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
        id: 1,
        name: '2020-08-02',
        wgt: 22.2,
    },
    {
        name: '2020-08-02',
        wgt: 22.2,
    },

    {
        name: '2020-08-02',
        wgt: 22.2,
    },
    {
        name: '2020-08-02',
        wgt: 22.2,
    },
    {
        name: '2020-08-02',
        wgt: 22.2,
    },
    {
        name: '2020-08-02',
        wgt: 22.2,
    },
    {
        name: '2020-08-02',
        wgt: 22.2,
    },
    {
        name: '2020-08-03',
        wgt: 22.4,
    },
    {
        name: '2020-09-12',
        wgt: 25.2,
    },
    {
        name: '2020-09-22',
        wgt: 25.0,
    },
    {
        name: '2020-10-22',
        wgt: 28.2,
    },
    {
        name: '2020-12-22',
        wgt: 30.2,
    },
    {
        name: '2020-12-30',
        wgt: 22.2,
    },
    {
        name: '2020-01-30',
        wgt: 25.2,
    },
    {
        name: '2020-03-30',
        wgt: 29.2,
    },
    {
        name: '2020-04-20',
        wgt: 29.2,
    },
    {
        name: '2020-05-12',
        wgt: 29.2,
    },
];
const WeightResultTable = () => {
    const dispatch = useDispatch();
    const onDelete = (id) => {
        dispatch(deleteWeightRequestAction(id));
    };
    const date = new Date().toLocaleDateString();
    // 연동하면 여기에서 바로 조회하면 끝
    // const test = axios.get('</백엔드 주소>');
    return (
        <ListContainer>
            {data.map((data) => {
                return (
                    <DataContainer>
                        <DataList key={date}>
                            <p>{data.name}</p>
                            <p>{data.wgt}kg</p>
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
