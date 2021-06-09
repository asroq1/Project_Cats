import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TopBar from '../components/main/TopBar';
import MainComponent from '../components/main/Main';
import MainEmptyComponent from '../components/main/MainEmpty';

import { GET_CAT_REQUEST, SET_CURRENT_CAT } from '../reducers/cat';
import { GET_USER_REQUEST } from '../reducers/user';

const Main = () => {
    const { cat } = useSelector((state) => state.cat);
    const { currentIndex, isLoading } = useSelector((state) => state.cat);
    const { logOutDone } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const history = useHistory();
    const onSelect = useCallback((index) => {
        dispatch({
            type: SET_CURRENT_CAT,
            data: index,
        });
    }, []);

    const today = new Date();
    const getAge = useCallback(() => {
        const currentCat = cat.find((v) => v.id === currentIndex);
        if (currentCat) {
            const [birthYear, birthMonth, birthDate] =
                currentCat.birth.split('-');
            let ageYear = today.getFullYear() - parseInt(birthYear);
            let ageMonth = today.getMonth() + 1 - parseInt(birthMonth);
            let ageDate = today.getDate() - parseInt(birthDate);
            if (ageDate < 0) {
                ageMonth -= 1;
            }
            if (ageMonth < 0) {
                ageMonth += 12;
                ageYear -= 1;
            }
            return [ageYear, ageMonth];
        }
    }, [cat, currentIndex]);

    useEffect(() => {
        if (!localStorage.token) {
            alert('로그인 먼저 해주세요');
            history.push('/');
        }
        dispatch({
            type: GET_CAT_REQUEST,
        });
        dispatch({
            type: GET_USER_REQUEST,
        });
    }, [logOutDone]);

    return (
        <>
            <TopBar cat={cat} currentIndex={currentIndex} onSelect={onSelect} />
            {/* {(!isLoading) && */}
            {cat.length > 0 ? (
                <MainComponent
                    cat={cat}
                    currentIndex={currentIndex}
                    age={getAge()}
                    loading={isLoading}
                />
            ) : (
                <MainEmptyComponent></MainEmptyComponent>
            )}
            {/* )} */}
        </>
    );
};

export default Main;
