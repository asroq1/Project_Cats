import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import MainComponent from '../components/main/Main';
import TopBar from '../components/main/TopBar';

const Main = () => {
    const { cat } = useSelector((state) => state.cat);
    const [current_index, setCurrentIndex] = useState(1);
    const onSelect = useCallback((index) => setCurrentIndex(index), []);

    return (
        <>
            <h2>메인 페이지</h2>
            <TopBar
                cat={cat}
                current_index={current_index}
                onSelect={onSelect}
            />
            {cat.length > 0 ? (
                <MainComponent cat={cat} current_index={current_index} />
            ) : (
                <h2>고양이를 추가해주세용</h2>
            )}
        </>
    );
};

export default Main;