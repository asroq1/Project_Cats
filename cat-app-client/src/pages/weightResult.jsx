import React, { useEffect } from 'react';
import { useState } from 'react';
import WeightResultGraph from '../components/weightResult/WeightResultGraph';
import WeightResultList from '../components/weightResult/WeightResultList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getWeightRequest } from '../reducers/cat';
import axios from 'axios';

const Header = styled.header`
    position: sticky;
    top: 0;
    background: #f2cc8f;
    margin: 0 auto;
    //max-width: 1200px;
    width: 100%;
    height: 6vh;
    background-color: ${({ theme }) => theme.resultBackground};
    align-items: center;
    border: none;
`;
const DataButton = styled.button`
    width: 40%;
    height: 100%;
    border: none;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.resultHeader};
    border-radius: 8px;
    color: white;
    font-weight: 600;
    :hover {
        background: ${({ theme }) => theme.palette.borderColor};
    }
    &:active {
        transform: scale(0.9);
    }
`;

const ExitButton = styled.span`
    position: absolute;
    right: 1rem;
    top: 0.5rem;
    font-size: 2rem;

    a {
        color: ${({ theme }) => theme.resultExit};
    }
`;
const WeightResult = () => {
    const { currentCatWeights, currentIndex } = useSelector(
        (state) => state.cat
    );
    const [onList, setOnList] = useState(false);
    const dispatch = useDispatch();
    const chartHandler = () => {
        setOnList(false);
    };
    const listHandler = () => {
        setOnList(true);
    };

    useEffect(() => {
        console.log('커런 인덱', currentIndex);
        dispatch(getWeightRequest(currentIndex));
    }, []);

    useEffect(() => {
        console.log('CurCatWeights', currentCatWeights);
    });
    return (
        <>
            <Header>
                <DataButton onClick={chartHandler}>그래프</DataButton>
                <DataButton
                    active={false}
                    activeClassName={{}}
                    onClick={listHandler}
                >
                    리스트
                </DataButton>
                <ExitButton>
                    <Link to="/user/main">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </ExitButton>
            </Header>
            {!onList && <WeightResultGraph />}
            {onList && <WeightResultList />}
        </>
    );
};

export default WeightResult;
