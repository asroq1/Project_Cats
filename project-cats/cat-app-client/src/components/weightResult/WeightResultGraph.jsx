import React from 'react';
import '../../styles/WeightResultGraph.module.css';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
    ResponsiveContainer,
} from 'recharts';
import { useEffect } from 'react';

const data = [
    {
        name: '08-02',
        wgt: 22.2,
        pv: 800,
    },
    {
        name: '08-03',
        wgt: 22.4,
        pv: 967,
    },
    {
        name: '09-02',
        wgt: 25.2,
        pv: 1098,
    },
    {
        name: '09-22',
        wgt: 25.0,
        pv: 1200,
    },
    {
        name: '10-22',
        wgt: 26,
        pv: 1108,
    },
    {
        name: '11-22',
        wgt: 20,
        pv: 680,
    },
];

export default function WeightResultGraph() {
    const comapareRes = data[data.length - 1].wgt - data[data.length - 2].wgt;
    useEffect(() => {});
    return (
        <>
            <ResponsiveContainer>
                <ComposedChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" scale="band" />
                    <YAxis
                        dataKey="wgt"
                        label={{
                            value: '몸무게(kg)',
                            angle: -90,
                            position: 'insideLeft',
                        }}
                    />
                    {/* <Tooltip /> */}
                    <Bar dataKey="wgt" fill="#f2cc8f" barSize={30}>
                        <LabelList dataKey="wgt" position="top" />
                    </Bar>
                    <Line dataKey="wgt" stroke="#e07a5f" />
                </ComposedChart>
            </ResponsiveContainer>
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
                    <p>{comapareRes}kg</p>
                </div>
            </div>
        </>
    );
}
