import React, { useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';

import palette from '../../styles/palette';

//코드 너무 장황해지니
//필요 딱히 없는 건 나중에 지워주기
//짧은 건 useMemo로 넣어줌
const Global = styled.div`
    background-color: ${palette.beige};
    max-width: 1200px;
    width: 100vw;
    height: 100%;
    margin: 0 auto;

    @media screen and (max-width: 768px) {
        width: 100vw;
    }
`;

const GeneralWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin-top: 1rem;
`;

const PhotoContainer = styled.div`
    width: 200px;
    height: 200px;
    background-color: lightgray;
    margin-top: 0.5rem;
    border-radius: 10px;
    background-size: cover;
    box-shadow:3px 5px 5px rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .fa-paw {
        font-size: 10rem;
        color: ${palette.beige};
    }
`;

const ButtonWrapper = styled.button`
    width: 100%;
    padding: 0.5rem auto;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    background-color: ${palette.navy};
    color:white;
    cursor: pointer;
    border: 1px solid black;
    &:hover {
        background: black;
    }
    & + & {margin-top: 0.5rem;}
`;


const WeightRecordWrapper = styled.div`

text-align: center;
margin-top: 1.5rem;
margin-bottom: 0;

h1 {
    font-size: 1rem;

    margin-bottom: 1rem;
}

h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}
h3 {
    font-size: 2rem;

}

`;
const Main = ({ cat, currentIndex, age }) => {
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
        () => ({ marginTop: '1.5em', padding: '0.5rem' }),
        []
    );
    const boldStyle = useMemo(
        () => ({ fontWeight: 'bold', padding: '0.25rem' }),
        []
    );

    const currentCat = cat[currentIndex - 1];

    return (
        <Global>
            <GeneralWrapper>
                <div style={paddingStyle}>
                    {age[0]}년 {age[1]}개월 |{' '}
                    {currentCat.gender === 'M' ? '수컷' : '암컷'}
                    <Link to = "/cat/update">
                        <i class="fa fa-edit"></i>
                    </Link>
                </div>
                {currentCat.photo ? (<PhotoContainer
                    style={{backgroundImage: `url(${currentCat.photo})`}}
                />)
                : (<PhotoContainer><i class="fa fa-paw"></i></PhotoContainer>)
                }
                <WeightRecordWrapper>
                    <h1>마지막 체중 기록</h1>
                    <h2>{currentCat.Record ? currentCat.Record.cdt : '체중을'}</h2>
                    <h3>{currentCat.Record ? currentCat.Record.wgt : '기록해주세용'}</h3>

                </WeightRecordWrapper>
                {/* <div style={boldStyle}>
                    {currentCat.Record.length > 0
                        ? currentCat.Record[currentCat.Record.length - 1].cdt
                        : '-'}{' '}
                    {currentCat.Record.length > 0
                        ? currentCat.Record[currentCat.Record.length - 1].wgt +
                          'kg'
                        : '-'}
                </div> */}
            </GeneralWrapper>

            <div style={paddingStyle}>
                <Link
                    to={{
                        pathname: '/cat/addWeight',
                        // Link컴포넌트를 사용해 페이지 전환하면
                        // 애플리케이션은 그대로 유지한 상태에서
                        // 페이지를 새로 불러오지 않고 HTML5 History API를 사용하여
                        // 페이지의 주소만 바꿔줍니다 (벨로퍼트님 책 13.2.5)
                        // 따라서 redux에 저장되어 있는 상태도 날라가지 않고,
                        // redux의 currentIndex를 참조해 현재 선택된 고양이가 어떤 고양이인 지 알 수 있을 것 같아요
                        //cat_id: current_index,
                    }}
                >
                    <ButtonWrapper>오늘 체중 기록하기</ButtonWrapper>
                </Link>
                <Link
                    to={{
                        pathname: '/cat/record',
                        //cat_id: current_index,
                    }}
                >
                    <ButtonWrapper>이전 데이터 보기</ButtonWrapper>
                </Link>
            </div>
        </Global>
    );
};

export default Main;
