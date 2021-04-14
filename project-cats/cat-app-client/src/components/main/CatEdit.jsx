import React, { useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import palette from '../../styles/palette';

//코드 너무 장황해지니
//필요 딱히 없는 건 나중에 지워주기
//짧은 건 useMemo로 넣어줌
const Global = styled.div`
    background-color: white;
    max-width: 1200px;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;

    @media screen and (max-width: 768px) {
        width: 75vw;
    }
`;

const GeneralWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin-top: 1rem;
`;

const PhotoContainer = styled.img`
    width: 200px;
    height: 200px;
    margin-top: 2rem;
    border: 2px solid ${palette.navy};
    object-fit: cover;
`;

const ButtonWrapper = styled.button`
    width: 100%;
    padding: 0.5rem auto;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    background-color: ${palette.navy};
    color: ${palette.beige};
    cursor: pointer;
    border: 1px solid black;
    &:hover {
        background: black;
    }
    margin-top: 0.5rem;
`;

const Main = ({ cat, current_index }) => {
    // styled-component대신 useMemo 써줌
    const colStyle = useMemo(
        () => ({
            maxWidth: '150px',
            flex: 'auto',
            border: '1px solid lightgreen',
        }),
        []
    );
    const paddingStyle = useMemo(
        () => ({ marginTop: '1em', padding: '0.5rem' }),
        []
    );
    const boldStyle = useMemo(
        () => ({ fontWeight: 'bold', padding: '0.25rem' }),
        []
    );

    const currentCat = cat[current_index];

    return (
        <Global>
            <GeneralWrapper>
                <PhotoContainer
                    src={currentCat.Photo.url}
                    alt="cat_image"
                ></PhotoContainer>
                <div style={paddingStyle}>
                    {/* {currentCat.age[0]}년 {currentCat.age[1]}개월 |{' '} */}
                    {currentCat.gender === 'M' ? '수컷' : '암컷'}
                </div>
            </GeneralWrapper>
            <GeneralWrapper>
                <div style={boldStyle}>최종 기록</div>
                <div style={boldStyle}>
                    {currentCat.Record.length > 0
                        ? currentCat.Record[currentCat.Record.length - 1].cdt
                        : '-'}{' '}
                    {currentCat.Record.length > 0
                        ? currentCat.Record[currentCat.Record.length - 1].wgt +
                          'kg'
                        : '-'}
                </div>
            </GeneralWrapper>

            <div style={paddingStyle}>
                <Link
                    to={{
                        pathname: '/cat/addWeight',
                        cat_id: current_index,
                    }}
                >
                    <ButtonWrapper>오늘 체중 기록하기</ButtonWrapper>
                </Link>
                <Link
                    to={{
                        pathname: '/cat/record',
                        cat_id: current_index,
                    }}
                >
                    <ButtonWrapper>이전 데이터 보기</ButtonWrapper>
                </Link>
            </div>
        </Global>
    );
};

export default Main;
