import React, { useState, useEffect, useMemo,useCallback } from 'react';
import { useSelector } from 'react-redux';
import CatsAdd from '../components/catsAdd/CatsAdd';
import MainComponent from '../components/main/Main';

import MainEmptyComponent from '../components/main/MainEmpty'
import TopBar from '../components/main/TopBar';
import palette from '../styles/palette';

const Main = () => {
    const { cat } = useSelector((state) => state.cat);
    const [current_index, setCurrentIndex] = useState(1);
    const onSelect = useCallback((index) => setCurrentIndex(index), []);

    const today = new Date();
    
    const getAge = useCallback(()=>{
        if (cat){
            cat.map((el) =>{
                console.log(el.birth)
                const [birthYear, birthMonth, birthDate] = el.birth.split("-");
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
                el.age = [ageYear, ageMonth];
            })
            console.log(cat);
        }
    },[cat]);

    getAge();

    const bgColor = useMemo(() => ({backgroundColor: palette.beige}), []);

    // useEffect(()=>{
    //     getAge();
    // })

    return (
        <>
        <div style={bgColor}>
            <TopBar
                cat={cat}
                current_index={current_index}
                onSelect={onSelect}
            />
            {cat.length > 0 ? (
                <MainComponent cat={cat} current_index={current_index} />
            ) : (
                
                <MainEmptyComponent></MainEmptyComponent>
            )}
        </div>
        </>
    );
};

export default Main;