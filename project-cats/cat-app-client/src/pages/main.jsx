import React, { useState, useEffect, useMemo,useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainComponent from '../components/main/Main';

import MainEmptyComponent from '../components/main/MainEmpty'
import TopBar from '../components/main/TopBar';
import { GET_CAT_REQUEST } from '../reducers/cat';
import palette from '../styles/palette';

const Main = () => {
    const { cat } = useSelector((state) => state.cat);
    const { isLoading } = useSelector((state) => state.cat);
    const [current_index, setCurrentIndex] = useState(1);
    //const [age, setAge] = useState([0,0]);
    
    const onSelect = useCallback((index) => {
        setCurrentIndex(index);
    }, []);

    const today = new Date();
    
    const getAge = useCallback(()=>{
        const currentCat = cat[current_index - 1];
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


    const bgColor = useMemo(() => ({backgroundColor: palette.beige}), []);

    const dispatch = useDispatch();
    
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
                current_index={current_index}
                onSelect={onSelect}
            />
            {(!isLoading) &&
                (cat.length > 0 ? (
                    <MainComponent cat={cat} current_index={current_index} age={getAge()} />
                ) : (
                    
                    <MainEmptyComponent></MainEmptyComponent>
                )
            )}
        </div>
        </>
    );
};

export default Main;