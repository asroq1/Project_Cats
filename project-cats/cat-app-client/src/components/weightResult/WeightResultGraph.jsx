import React from 'react';
import styles from '../../styles/WeightResultGraph.module.css';

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
import axios from 'axios';

const data = [
    {
        name: '08-02',
        wgt: 22.2,
    },
    {
        name: '08-03',
        wgt: 22.4,
    },
    {
        name: '09-12',
        wgt: 25.2,
    },
    {
        name: '09-22',
        wgt: 25.0,
    },
    {
        name: '10-22',
        wgt: 28.2,
    },
    {
        name: '12-22',
        wgt: 30.2,
    },
    {
        name: '12-30',
        wgt: 22.2,
    },
];

export default function WeightResultGraph() {
    const comapareRes = data[data.length - 1].wgt - data[data.length - 2].wgt;
    const test = Math.floor(comapareRes);
    // let test = 0;

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
        //         };
        //     });
        // });
        console.log('매달');
    };
    useEffect(() => {
        // const data = axios.get('<주소> ');
    });

    return (
        <>
            <div style={{ width: '90%', height: 400, maxWidth: 1200 }}>
                <ResponsiveContainer>
                    <ComposedChart
                        width={1000}
                        height={400}
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" />
                        <YAxis type="number" dataKey="wgt" unit="kg" />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="wgt"
                            fill="#f2cc8f"
                            stroke="#f2cc8f"
                        />
                        <Line type="monotone" dataKey="wgt" stroke="#ff7300">
                            <LabelList dataKey="wgt" position="top" />
                        </Line>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <div>
                <button onClick={perDayHandler}>일</button>
                <button onClick={perMonthHandler}>월</button>
            </div>
            <div>
                <div>
                    <ul>
                        오늘 몸무게
                        <li>{data[data.length - 1].name}</li>
                        <li>{data[data.length - 1].wgt}KG</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        이전 몸무게
                        <li>{data[data.length - 2].name}</li>
                        <li>{data[data.length - 2].wgt}KG</li>
                    </ul>
                </div>
                <div>
                    <p>몸무게 변화</p>
                    <p>
                        {test}
                        {/* {comapareRes < 0 ? comapareRes : comapareRes} */}
                        kg
                    </p>
                </div>
            </div>
        </>
    );
}
