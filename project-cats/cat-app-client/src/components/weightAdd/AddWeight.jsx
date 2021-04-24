import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addWeightRequest } from '../../reducers/cat';
import palette from '../../styles/palette';
// import styles from '../../styles/AddWeight.module.css';

const HeaderTitle = styled.span`
    margin: 0 auto;
    font-size: 2rem;
    font-weight: bold;
`;

const CarouselContainer = styled.div`
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`;

const CarouselWrapper = styled.div`
    width: 300vw;
`;

const CarouselContent = styled.div`
    display: grid;
    align-items: center;
    width: 100vw;
    height: 95vh;
    float: left;
    background: ${palette.beige};
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 1200px;
    margin: 0 auto;
    @media ${(props) => props.theme.mobile} {
        width: 100vw;
        margin: 0 auto;
    }
`;

const ContentImage = styled.img`
    width: 20%;
    margin: 0 auto;

    @media ${(props) => props.theme.mobile} {
        width: 50%;
        margin: 0 auto;
    }
`;

const ContentMain = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 30%;
    text-align: center;

    @media ${(props) => props.theme.mobile} {
        width: 85%;
    }
`;

const ContentText = styled.p`
    margin: 1rem 0 1rem 0;
    font-size: 1rem;
    font-weight: 600;
`;

const ResultBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const WeightBox = styled.div`
    display: flex;
    width: 50%;
    margin: 0 auto;
`;

const AddInput = styled.input`
    width: 50%;
    padding: 1rem;
    font-size: 1.6rem;
    background-color: ${palette.inputColor};
    border: 1px solid ${palette.borderColor};
    @media ${(props) => props.theme.mobile} {
        height: 1rem;
    }
`;

const BoxWrapper = styled.div`
    margin: 0 auto;
    margin-top: 10vh;
    width: 85%;
    display: flex;
    justify-content: space-between;
`;

const AddButton = styled.button`
    margin: 0 auto;
    margin-top: 10vh;
    width: 85%;
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    background-color: ${palette.navy};
    color: ${palette.white};
    border-radius: 4px;
`;

const AddText = styled.p`
    display: flex;
    align-items: center;
    margin: 0 auto;
    font-size: 2rem;
`;

const ResultButton = styled.button`
    width: 48%;
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    background-color: ${palette.navy};
    color: ${palette.white};
    border-radius: 4px;
`;

const SubmitButton = styled.button`
    width: 48%;
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    background-color: ${palette.orange};
    color: ${palette.white};
    border-radius: 4px;
`;
const AddWeight = () => {
    const [alone, setAlone] = useState('');
    const [together, setTogether] = useState(0);
    const weightResult = together - alone;
    const nextRef = useRef(null);
    const dispatch = useDispatch();
    const date = new Date();

    const today = date.toLocaleString();

    const onTogetherChange = (e) => {
        setTogether(e.target.value);
        if (together < 0) {
            setTogether(0);
            alert('잘못된 입력입니다.');
        }
    };
    const onAloneChange = (e) => {
        setAlone(e.currentTarget.value);
        if (alone < 0) {
            setAlone(0);
            alert('잘못된 입력입니다.');
        }
    };

    const onNextPage = (e) => {
        e.preventDefault();
        nextRef.current.style.transform += 'translateX(-100vw)';
    };
    const onReset = (e) => {
        e.preventDefault();
        nextRef.current.style.transform = 'translateX(0vw)';
    };
    const onGapSubmit = (e) => {
        e.preventDefault();
        if (weightResult <= 0) {
            alert('등록실패');
            setTogether(0);
            setAlone(0);
            nextRef.current.style.transform = 'translateX(0vw)';
        } else {
            alert('등록완료');
            const body = {
                wgt: weightResult,
                createdDate: today,
            };
            dispatch(addWeightRequest(body));
        }
    };
    // useEffect(() => {
    //     console.log(today);
    // });
    return (
        <>
            <CarouselContainer>
                <CarouselWrapper ref={nextRef}>
                    <CarouselContent ref={nextRef}>
                        <ContentWrapper>
                            <HeaderTitle>체중 측정 중...</HeaderTitle>
                            <ContentImage src="/image/scale.png" alt="" />
                            <ContentMain>
                                <ContentText>
                                    주인님을 들고 체중계 위로 올라가주세요.
                                </ContentText>
                                <WeightBox>
                                    <AddInput
                                        type="number"
                                        value={together}
                                        onChange={onTogetherChange}
                                        max="1000"
                                    />
                                    <AddText>kg</AddText>
                                </WeightBox>
                            </ContentMain>
                            <AddButton onClick={onNextPage}>다음으로</AddButton>
                        </ContentWrapper>
                    </CarouselContent>
                    <CarouselContent ref={nextRef}>
                        <ContentWrapper>
                            <HeaderTitle>체중 측정 중...</HeaderTitle>
                            <ContentImage
                                src="/image/scale.png"
                                alt=""
                                // className={styles.img__scale}
                            />
                            <ContentMain>
                                <ContentText>
                                    집사 혼자 체중계 위로 올라가주세요.
                                </ContentText>
                                <WeightBox>
                                    <AddInput
                                        type="number"
                                        value={alone}
                                        onChange={onAloneChange}
                                        min={0}
                                        max="1000"
                                    />
                                    <AddText>kg</AddText>
                                </WeightBox>
                            </ContentMain>
                            <AddButton onClick={onNextPage}>다음으로</AddButton>
                        </ContentWrapper>
                    </CarouselContent>
                    <CarouselContent ref={nextRef}>
                        <ContentWrapper>
                            <HeaderTitle>체중 측정 완료!</HeaderTitle>
                            <ContentImage src="/image/scale.png" alt="" />
                            <ContentMain>
                                <ResultBox>
                                    <ContentText>
                                        주인님 누구누구의 몸무게는 !
                                    </ContentText>
                                    <AddText>{weightResult}KG</AddText>
                                </ResultBox>
                            </ContentMain>
                            <BoxWrapper>
                                <ResultButton onClick={onReset}>
                                    다시 하기
                                </ResultButton>
                                <SubmitButton onClick={onGapSubmit}>
                                    기록 완료
                                </SubmitButton>
                            </BoxWrapper>
                        </ContentWrapper>
                    </CarouselContent>
                </CarouselWrapper>
            </CarouselContainer>
        </>
    );
};

export default AddWeight;
