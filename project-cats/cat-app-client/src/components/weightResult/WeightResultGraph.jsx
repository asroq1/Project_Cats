import React from 'react';

import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LabelList,
    Area,
    ResponsiveContainer,
} from 'recharts';
import { useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const GraphContainer = styled.div`
    display: grid;
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    height: 94vh;
    background-color: ${palette.navy};
    align-items: center;
`;

const SelectorContainer = styled.div`
    display: flex;
    justify-content: space-evenly;

    button {
        width: 40%;
        padding: 0.8rem;
        border: none;
        border-radius: 8px;
    }
`;

const DateSelector = styled.button`
    color: ${palette.white};
    font-size: 1rem;
    background-color: ${(props) => (props.primary ? '#E07A5F' : '#d5d3d3')};
    border: none;
`;

// const MonthSelector = styled.button`
//     color: ${palette.white};
//     font-size: 1rem;
//     background-color: ${palette.borderColor};
//     border: none;
// `;
const DataContainer = styled.div`
    width: 90%;
    margin: 0 auto;
`;

const WeightWrapper = styled.div`
    margin: 1rem 0 1rem 0;
    border-top: 1px solid ${palette.borderColor};
    padding: 1rem;

    h2{
        color: ${palette.borderColor}
    }
    ul {
        display: flex;
        justify-content: space-around;
    }

    li{ 
        color: ${palette.white};
        font-weight: bold;
        font-size: 2rem;
    }

    li:nth-last-child(2) {
        margin-top: 1rem;
        color: ${palette.borderColor};
        font-weight: bold;
        font-size: 1rem;
   
`;

const ResultWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 1rem 0 1rem 0;
    border-top: 1px solid ${palette.borderColor};
    padding: 1rem;

    p:nth-child(2) {
        font-weight: bold;
        color: ${palette.white};
        font-size: 2rem;
    }
    p:nth-child(1) {
        font-weight: bold;
        color: ${palette.borderColor};
        margin-top: 1rem;
        font-size: 1rem;
    }
`;

const data = [
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
];

export default function WeightResultGraph() {
    //나중에 백엔드 연동해서 이렇게 최근순으로 당겨오면됌
    //최근 데이터만 보여줌
    const perDay = data.slice(-5);
    const comaparisonResult =
        data[data.length - 1].wgt - data[data.length - 2].wgt;
    const Result = Math.floor(comaparisonResult);

    const perDayHandler = () => {
        // axios.get('<주소>').then((res) => {
        //     const data = res.data.map((data) => {
        //         return {
        //               //코드 작성
        //         };
        //     });
        // });
        data.map((data) => {
            return {
                //나중에 백엔드 연동해서 이렇게 최근 요일순으로 당겨오면됌
                // const perDay = data.slice(-7);
                XAxis: data.name,
            };
        });
        console.log('일마다', XAxis);
    };
    const perMonthHandler = () => {
        // axios.get('<주소>').then((res) => {
        //     const data = res.data.map((data) => {
        //         return {
        //             XAxis: data.name,
        //             YAxis: data.name,
        //나중에 백엔드 연동해서 이렇게 최근 월별순으로 당겨오면됌
        //그리고 나서 data의 값을 바꾸면 됌
        //
        //         };
        //     });
        // });
        console.log('매달');
    };
    useEffect(() => {
        // const data = axios.get('<주소> ');
        // console.log(test);
        // console.log(data.length - 3);
    });

    return (
        <GraphContainer>
            <div
                style={{
                    width: '100%',
                    height: 400,
                    maxWidth: 1200,
                    margin: 0,
                }}
            >
                <ResponsiveContainer>
                    <ComposedChart
                        width={1000}
                        height={400}
                        data={perDay}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" stroke="#fff" />
                        <Tooltip stroke="#fff" />
                        <Area
                            type="monotone"
                            dataKey="wgt"
                            fill="#E07A5F"
                            stroke="#f2cc8f"
                        />
                        <Line type="monotone" dataKey="wgt" stroke="#ff7300">
                            <LabelList
                                dataKey="wgt"
                                position="top"
                                stroke="#fff"
                            />
                        </Line>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <SelectorContainer>
                <DateSelector primary onClick={perDayHandler}>
                    일별
                </DateSelector>
                <DateSelector onClick={perMonthHandler}>월별</DateSelector>
            </SelectorContainer>
            <DataContainer>
                <WeightWrapper>
                    <h2>오늘 몸무게</h2>
                    <ul>
                        <li>{data[data.length - 1].name}</li>
                        <li>{data[data.length - 1].wgt}KG</li>
                    </ul>
                </WeightWrapper>
                <WeightWrapper>
                    <h2>이전 몸무게</h2>
                    <ul>
                        <li>{data[data.length - 2].name}</li>
                        <li>{data[data.length - 2].wgt}KG</li>
                    </ul>
                </WeightWrapper>
                <ResultWrapper>
                    <p>체중 변화</p>
                    <p>{Result < 0 ? `${Result}` : `+ ${Result}`} kg</p>
                </ResultWrapper>
            </DataContainer>
        </GraphContainer>
    );
}
