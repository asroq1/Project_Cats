import React, { useEffect, useMemo,useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TopBar from '../components/main/TopBar';
import MainComponent from '../components/main/Main';
import MainEmptyComponent from '../components/main/MainEmpty'

import { GET_CAT_REQUEST, SET_CURRENT_CAT } from '../reducers/cat';

import palette from '../styles/palette';

const Main = () => {
    const { cat } = useSelector((state) => state.cat);
    const { isLoading } = useSelector((state) => state.cat);
    const { currentIndex } = useSelector((state) => state.cat);

    const bgColor = useMemo(() => ({backgroundColor: palette.beige}), []);
    
    const dispatch = useDispatch();
    
    const onSelect = useCallback((index) => {
        dispatch({
            type: SET_CURRENT_CAT,
            data: index,
        })
    }, []);

    const today = new Date();
    
    const getAge = useCallback(()=>{
        const currentCat = cat[currentIndex - 1];
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
    },[cat]);
    
    useEffect(()=>{
        dispatch({
            type: GET_CAT_REQUEST,
            data: localStorage.currentUser
        })
    },[]);

    return (
        <>
        <div style={bgColor}>
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
        </div>
        </>
    );
};

export default Main;