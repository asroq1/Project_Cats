import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const ListContainer = styled.div`
    display: grid;
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    height: 100%;
    background-color: ${palette.navy};
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
    justify-content: space-around;
    font-size: 1.5rem;
    padding: 1.2rem;
    border-top: 1px solid ${palette.borderColor};

    p:nth-child(1) {
        display: grid;
        align-items: center;
        font-size: 1rem;
        color: ${palette.white};
    }

    p:nth-child(2) {
        font-size: 2rem;
        font-weight: bold;
        color: ${palette.white};
    }
`;
const data = [
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
    // 연동하면 여기에서 바로 조회하면 끝
    // const test = axios.get('</백엔드 주소>');
    return (
        <ListContainer>
            {data.map((data) => {
                return (
                    <DataContainer>
                        <DataList key={data.name}>
                            <p>{data.name}</p>
                            <p>{data.wgt}kg</p>
                        </DataList>
                    </DataContainer>
                );
            })}
        </ListContainer>
    );
};

export default WeightResultTable;
