import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWeightRequest } from '../../reducers/cat';
import styles from '../../styles/AddWeight.module.css';
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
            <div className={styles.carousel__container}>
                <div className={styles.carousel__wrapper} ref={nextRef}>
                    <div className={styles.carousel__content} ref={nextRef}>
                        <div className={styles.content__wrapper}>
                            <img
                                src="/image/scale.png"
                                alt=""
                                className={styles.content__image}
                            />
                            <div className={styles.content__main}>
                                <h2 className={styles.content__text}>
                                    주인님을 들고 체중계 위로 올라가주세요.
                                </h2>
                                <div className={styles.weight__box}>
                                    <input
                                        type="number"
                                        value={together}
                                        onChange={onTogetherChange}
                                        max="1000"
                                    />
                                    <p>kg</p>
                                </div>

                                <button onClick={onNextPage}>다음으로</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.carousel__content} ref={nextRef}>
                        <div className={styles.content__wrapper}>
                            <img
                                src="/image/scale.png"
                                alt=""
                                className={styles.img__scale}
                                className={styles.content__image}
                            />
                            <div className={styles.content__main}>
                                <h2 className={styles.content__text}>
                                    집사 혼자 체중계 위로 올라가주세요.
                                </h2>
                                <div className={styles.weight__box}>
                                    <input
                                        type="number"
                                        value={alone}
                                        onChange={onAloneChange}
                                        min={0}
                                        max="1000"
                                    />
                                    <p>kg</p>
                                </div>
                                <button onClick={onNextPage}>다음으로</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.carousel__content} ref={nextRef}>
                        <div className={styles.content__wrapper}>
                            <img
                                src="/image/scale.png"
                                alt=""
                                className={styles.img__scale}
                                className={styles.content__image}
                            />
                            <div className={styles.content__main}>
                                <div className={styles.result__box}>
                                    <h2 className={styles.content__text}>
                                        주인님 누구누구의 몸무게는 !
                                    </h2>
                                    <strong>{weightResult}KG</strong>
                                </div>
                                <div className={styles.box__wrapper}>
                                    <button onClick={onReset}>다시하기</button>
                                    <button onClick={onGapSubmit}>
                                        등록하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddWeight;
