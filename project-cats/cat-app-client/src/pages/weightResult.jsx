import React from 'react';
import { useState } from 'react';
import WeightResultGraph from '../components/weightResult/WeightResultGraph';
import WeightResultList from '../components/weightResult/WeightResultList';
const WeightResult = () => {
    const [onList, setOnList] = useState(false);
    const chartHandler = () => {
        setOnList(false);
    };
    const listHandler = () => {
        setOnList(true);
    };
    return (
        <>
            <div>
                <button onClick={chartHandler}>그래프</button>
                <button onClick={listHandler}>리스트</button>
            </div>
            {!onList && <WeightResultGraph />}
            {onList && <WeightResultList />}
        </>
    );
};

export default WeightResult;
