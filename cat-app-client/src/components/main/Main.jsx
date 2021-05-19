import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';

//코드 너무 장황해지니
//짧은 건 useMemo로 넣어줌
const InnerGlobal = styled.div`
    background-color:${({theme})=>theme.beige};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height:  calc(100vh - 45px);
    margin: 0;
    padding: 0;

    & a:last-child button { 
        margin-bottom: 2rem;
    }
    
`;

const GeneralWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin-top: 1rem;
    i {
        text-decoration: none;

        color: ${({theme}) => theme.text};
    }
    h4 {
        font-size:1.25rem;
        font-weight:900;
    }
`;

const PhotoContainer = styled.div`
    width: 200px;
    height: 200px;
    background-color: lightgray;
    margin-top:0.75rem;
    border-radius: 10px;
    background-size: cover;
    box-shadow:3px 5px 5px  ${({theme})=>theme.shadow};
    display: flex;
    justify-content: center;
    align-items: center;
    .fa-paw {
        font-size: 10rem;
        color: ${({ theme }) => theme.beige};
    }
`;

const ButtonWrapper = styled.button`
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 0.75rem;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    background-color: ${({ theme }) => theme.navy};
    color: ${({theme}) => theme.textlight};
    cursor: pointer;
    border: 1px solid black;
    &:hover, &:focus {
        background: black;
    }
`;

const WeightRecordWrapper = styled.div`
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 0;
    h1 {
        font-size: 1rem;

        margin-bottom: 0.5rem;
    }
    h2 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
    h3 {
        font-size: 3rem;
        margin-bottom: 1rem;
        font-weight: 900;
    }
`;

const Main = ({ cat, currentIndex, age }) => {
    // styled-component대신 useMemo 써줌
    const paddingStyle = useMemo(
        () => ({
            width: '80%',
            textAlign: 'center',
            marginTop: '0.5em',
            padding: '0',
        }),[]);

    const topPaddingStyle = useMemo(
        () => ({
            width: '100%',
            textAlign: 'center',
            marginTop: '0.5em',
            padding: '0',
        }),[]);
    
    const currentCat = cat.find((v) => v.id === currentIndex);

    return (
        <InnerGlobal>
            <GeneralWrapper>
                <div style={topPaddingStyle}>
                    {currentCat.goalWeight&& (<h1>목표 체중 : {currentCat.goalWeight } kg</h1>) }
                </div>
                <div style={topPaddingStyle}>
                    <h4>
                    {age[0]}년 {age[1]}개월 |{' '}
                    {currentCat.gender === 'M' ? '수컷' : '암컷'}
                    <Link to={{
                        pathname: "/cat/update"
                    }}>
                        <i className="fa fa-edit"></i>
                    </Link>
                    </h4>
                </div>
                
                
                {currentCat.photo && currentCat.photo !=='/home/admin/app/step1/Project_Cats/catchoo-server/build/libs/null'
                ? (
                    <PhotoContainer
                        style={{ backgroundImage: `url(${currentCat.photo})` }}
                    />
                ) : (
                    <PhotoContainer>
                        <i className="fa fa-paw"></i>
                    </PhotoContainer>
                )}
                <WeightRecordWrapper>
                    <h1>마지막 체중 기록</h1>
                    <h2>
                        {currentCat.recentRecord ? currentCat.recentRecord.createdDate.slice(0,10) : '체중을'}
                    </h2>
                    <h3>
                        {currentCat.recentRecord
                            ? currentCat.recentRecord.weight + " kg"
                            : '기록해주세용'}
                    </h3>
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
                        pathname: '/cat/record',
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
                        pathname: '/cat/data',
                        //cat_id: current_index,
                    }}
                >
                    <ButtonWrapper >이전 데이터 보기</ButtonWrapper>
                </Link>
            </div>
        </InnerGlobal>
    );
};

Main.propTypes = {
    cat: PropTypes.array.isRequired,
    currentIndex: PropTypes.number.isRequired,
    age: PropTypes.array,
}

export default Main;