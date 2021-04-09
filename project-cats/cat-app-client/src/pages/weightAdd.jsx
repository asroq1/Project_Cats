import React, { useRef, useState } from 'react';
import styles from '../styles/weightAdd.module.css';
const WeightAdd = () => {
    const [alone, setAlone] = useState('');
    const [together, setTogether] = useState(0);
    const number = together - alone;
    const nextRef = useRef(null);
    const onTogetherChange = (e) => {
        console.log('together: ', together);
        setTogether(e.currentTarget.value);
        if (together > 1000) {
            setTogether(0);
        } else if (together < 0) {
            setTogether(0);
        }
    };
    const onAloneChange = (e) => {
        console.log('alone : ', alone);
        setAlone(e.currentTarget.value);
        if (alone > 1000) {
            setAlone(0);
        } else if (alone < 0) {
            setAlone(0);
        } else if (together < alone) {
            alert('잘못된 입력입니다.');
            setAlone(0);
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
        alert('등록완료');
    };
    return (
        <>
            {/* <div className={styles.carousel__container}> */}
            <div className={styles.carousel__wrapper} ref={nextRef}>
                <div className={styles.carousel__content} ref={nextRef}>
                    <div className={styles.content__wrapper}>
                        <img
                            src="/image/scale.png"
                            alt=""
                            className={styles.content__image}
                        />
                        <strong>주인님을 들고 체중계 위로 올라가주세요.</strong>
                        <input
                            type="number"
                            value={together}
                            onChange={onTogetherChange}
                        />
                        <button onClick={onNextPage}>다음으로</button>
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
                        <strong>집사 혼자 체중계 위로 올라가주세요.</strong>
                        <input
                            type="number"
                            value={alone}
                            onChange={onAloneChange}
                            min={0}
                            max={1000}
                        />
                        <button onClick={onNextPage}>다음으로</button>
                    </div>
                </div>
                <div className={styles.carousel__content} ref={nextRef}>
                    <strong>주인님 ?의 몸무게는 !</strong>
                    <input type="number" value={number} readOnly />
                    <h2>KG</h2>
                    <div>
                        <button onClick={onReset}>다시하기</button>
                        <button onClick={onGapSubmit}>등록하기</button>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    );
};

export default WeightAdd;
