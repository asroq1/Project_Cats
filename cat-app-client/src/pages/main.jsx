import React, { useEffect, useMemo,useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TopBar from '../components/main/TopBar';
import MainComponent from '../components/main/Main';
import MainEmptyComponent from '../components/main/MainEmpty'

import { GET_CAT_REQUEST, SET_CURRENT_CAT } from '../reducers/cat';
import { GET_USER_REQUEST } from '../reducers/user';
//여기 페이지에 위치해 여러 번 호출되지만 그럼에도 최적의 위치라 판단함

const Main = () => {
    const { cat } = useSelector((state) => state.cat);
    const { currentIndex } = useSelector((state) => state.cat);

    const { logInDone } = useSelector((state) => state.user);
    
    const dispatch = useDispatch();
    const history = useHistory();
    
    const onSelect = useCallback((index) => {
        dispatch({
            type: SET_CURRENT_CAT,
            data: index,
        })
    }, []);

    const today = new Date();
    const getAge = useCallback(()=>{
        const currentCat = cat.find((v) => v.id === currentIndex)
        const [birthYear, birthMonth, birthDate] = currentCat.birth.split("-");
                let ageYear = today.getFullYear() - parseInt(birthYear);
                let ageMonth =today.getMonth()+1 -parseInt(birthMonth);
                let ageDate = today.getDate() - parseInt(birthDate);
                if (ageDate < 0) {
                    ageMonth -=1;
                } 
                if (ageMonth < 0){
                    ageMonth +=12;
                    ageYear -= 1;
                }
                //setAge([ageYear, ageMonth]);
                return [ageYear, ageMonth];
    },[cat, currentIndex]);
    
    useEffect(()=>{
        if (!logInDone){
            history.push('/');
        }
        dispatch({
            type: GET_CAT_REQUEST,
        })
        dispatch({
            type: GET_USER_REQUEST,
        })
    },[]);

    return (
        <>
            <TopBar
                cat={cat}
                currentIndex={currentIndex}
                onSelect={onSelect}
            />
            {/* {(!isLoading) && */}
                {(cat.length > 0 ? (
                    <MainComponent cat={cat} currentIndex={currentIndex} age={getAge()} />
                    ) : (
                    <MainEmptyComponent></MainEmptyComponent>
                    )
                )
                }
            {/* )} */}
        </>
    );
};

export default Main;