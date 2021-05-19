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
import { GET_CAT_REQUEST } from '../../reducers/cat';
import { useDispatch } from 'react-redux';
import { GET_USER_REQUEST } from '../../reducers/user';

const GraphContainer = styled.div`
    display: grid;
    margin: 0 auto;
    //max-width: 1200px;
    min-height: 94vh;
    width: 100%;
    background-color: ${({ theme }) => theme.graph};
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
    color: #fff;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.palette.orange};
    border: none;
    :hover {
        background: ${({ theme }) => theme.palette.borderColor};
    }
    &:active {
        transform: scale(0.9);
    }
`;

const DataContainer = styled.div`
    width: 90%;
    margin: 0 auto;
`;

const WeightWrapper = styled.div`
    margin: 1rem 0 1rem 0;
    border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
    padding: 1rem;

    h2{
        color: ${({ theme }) => theme.palette.borderColor}
    }
    ul {
        display: flex;
        justify-content: space-around;
    }

    li{ 
        color: ${({ theme }) => theme.resultText};
        font-weight: bold;
        font-size: 2rem;
    }

    li:nth-last-child(2) {
        margin-top: 1rem;
        color: ${({ theme }) => theme.resultText};
        font-weight: bold;
        font-size: 1rem;
   
`;

const ResultWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 1rem 0 1rem 0;
    border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
    padding: 1rem;

    p:nth-child(2) {
        font-weight: bold;
        color: ${({ theme }) => theme.resultText};
        font-size: 2rem;
    }
    p:nth-child(1) {
        font-weight: bold;
        color: ${({ theme }) => theme.resultText};
        margin-top: 1rem;
        font-size: 1rem;
    }
`;

const ErrorMessage = styled.p`
    font-size: 1rem;
`;

const dateParser = (text) => {
    const { 0: year, 1: month, 2: day } = text.split('-');
    return { year, month, day };
};
const WeightResultGraph = ({ currentCatWeights }) => {
    const dispatch = useDispatch();

    const nowaDays = currentCatWeights.slice(0, 5).reverse();
    const resultDays = nowaDays.map((data) => ({
        ...data,
        createdDate: data.createdDate.substr(5, 5),
    }));

    useEffect(() => {
        dispatch({
            type: GET_CAT_REQUEST,
        });
        dispatch({
            type: GET_USER_REQUEST,
        });
    }, []);

    return (
        <>
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
                            data={resultDays}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                        >
                            {/* 그리드 효과  */}
                            <CartesianGrid
                                stroke="#f5f5f5"
                                opacity={0.1}
                                vertical={false}
                            />
                            <XAxis dataKey="createdDate" stroke="#fff"></XAxis>

                            <Tooltip stroke="#fff" />
                            <defs>
                                <linearGradient
                                    id="color"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="#E07A5F"
                                        stopOpacity={0.4}
                                    />
                                    <stop
                                        offset="75%"
                                        stopColor="#E07A5F"
                                        stopOpacity={0.05}
                                    />
                                </linearGradient>
                            </defs>

                            <Area
                                name="몸무게"
                                type="monotone"
                                dataKey="weight"
                                fill="url(#color)"
                                stroke="#f2cc8f"
                            >
                                <LabelList
                                    name="몸무게"
                                    dataKey="weight"
                                    position="insideTop"
                                    offset="10"
                                    fill="#fff"
                                />
                            </Area>
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                {/* <SelectorContainer>
                    <DateSelector onClick={perWeekHandler}>Weekly</DateSelector>
                    <DateSelector onClick={() => perMonthHandler(perMonth)}>
                        Monthly
                    </DateSelector>
                </SelectorContainer> */}
                <DataContainer>
                    <WeightWrapper>
                        <h2>최근 몸무게</h2>
                        <ul>
                            <li>
                                {currentCatWeights.length === 0 ? (
                                    <ErrorMessage>
                                        등록된 기록이 없습니다.
                                    </ErrorMessage>
                                ) : (
                                    <>
                                        {currentCatWeights[0].createdDate.substr(
                                            0,
                                            10
                                        )}
                                    </>
                                )}
                            </li>
                            <li>
                                {currentCatWeights.length === 0 ? (
                                    <></>
                                ) : (
                                    <>
                                        {currentCatWeights[0].weight}
                                        KG
                                    </>
                                )}
                            </li>
                        </ul>
                    </WeightWrapper>
                    <WeightWrapper>
                        <h2>이전 몸무게</h2>
                        <ul>
                            <li>
                                {currentCatWeights.length === 1 ? (
                                    <ErrorMessage>
                                        등록된 기록이 없습니다.
                                    </ErrorMessage>
                                ) : (
                                    <>
                                        {currentCatWeights[1].createdDate.substr(
                                            0,
                                            10
                                        )}
                                    </>
                                )}
                            </li>
                            <li>
                                {currentCatWeights.length === 1 ? (
                                    <></>
                                ) : (
                                    <>
                                        {currentCatWeights[1].weight}
                                        KG
                                    </>
                                )}
                            </li>
                        </ul>
                    </WeightWrapper>
                    <ResultWrapper>
                        <p>체중 변화</p>
                        <p>
                            {currentCatWeights.length === 1 ? (
                                <></>
                            ) : (
                                <>
                                    {Math.round(
                                        (currentCatWeights[0].weight -
                                            currentCatWeights[1].weight) *
                                            100
                                    ) / 100}
                                </>
                            )}
                            KG
                        </p>
                    </ResultWrapper>
                </DataContainer>
            </GraphContainer>
        </>
    );
};

export default WeightResultGraph;
