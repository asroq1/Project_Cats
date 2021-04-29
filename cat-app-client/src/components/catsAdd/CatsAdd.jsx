import React, { useCallback, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4} from 'uuid';

import useInput from '../../hooks/useInput';
import { SET_CURRENT_IMAGE, ADD_CAT_REQUEST } from '../../reducers/cat';

import 'font-awesome/css/font-awesome.min.css';

import {InnerGlobal, StyledInputBlock, CenterWrapper, ButtonWrapper, RadioBtnWrapper}from './styles.js';

const CatsAdd = ({}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {currImgUrl, addCatDone} = useSelector((state) => state.cat);
    const [name, onChangeName] = useInput('');
    const [birthyear, onChangeBirthYear] = useInput('');
    const [birthmonth, onChangeBirthMonth] = useInput('');
    const [birthdate, onChangeBirthDate] = useInput('');
    const [gender, onChangeGender] = useInput('');

    // 버튼 누르면 정보 전달
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('birth', birthyear+"-"+birthmonth+"-"+birthdate);
            formData.append('gender',gender);
            // POST API가 id를 요구하기 때문
            formData.append('name',name);
            console.log(currImgUrl);
            formData.append('photo', currImgUrl);

            console.log("key")
            for (var key of formData.keys()){
                console.log(key);
            }

            console.log("value")
            for (var value of formData.values()){
                console.log(value);
            }

            console.log("entry")
            for (var entry of formData.entries()){
                console.log(entry);
            }

            dispatch({
                type: SET_CURRENT_IMAGE,
                data: null,
            });

            dispatch({
                type: ADD_CAT_REQUEST,
                data: formData,
            });
            if (addCatDone){
                history.push('/user/main');
            }
        },
        [currImgUrl, name, birthyear, birthmonth, birthdate, gender,addCatDone]
    );

    const goBack = useCallback(() => {
        history.goBack();
    });

    const paddingStyle = useMemo(() => ({ paddingTop: '2rem' }), []);
    const marginTopStyle = useMemo(() =>({ marginTop: '0.5rem' }), []);

    return (
        <>
        <InnerGlobal>
                <form
                    onSubmit={onSubmit}
                    encType="multipart/form-data"
                >
                    {/* 이름 */}
                    <StyledInputBlock>
                        <label htmlFor="cat-name">이름</label>
                        <br />
                        <div className="inputcontainer">
                            <input
                                className="regular"
                                type="text"
                                id="cat-name"
                                name="cat-name"
                                value={name}
                                placeholder="Name"
                                onChange={onChangeName}
                                maxLength="50"
                                required
                            />
                        </div>
                    </StyledInputBlock>
                    {/* 생일 */}
                    <StyledInputBlock>
                        <label htmlFor="cat-birthyear">생일</label>
                        <br />
                        <div className="inputcontainer">
                            <input
                                className="birth"
                                type="number"
                                id="cat-birthyear"
                                name="cat-birthyear"
                                placeholder="YYYY"
                                value={birthyear}
                                onChange={onChangeBirthYear}
                                required
                                min="1900"
                                max ="2025"
                            />
                            <input
                                className="birth"
                                type="number"
                                name="cat-birthmonth"
                                placeholder="MM"
                                value={birthmonth}
                                onChange={onChangeBirthMonth}
                                required
                                min="1"
                                max="12"
                            />
                            <input
                                className="birth"
                                type="number"
                                name="cat-birthdate"
                                placeholder="DD"
                                value={birthdate}
                                onChange={onChangeBirthDate}
                                required
                                min="1"
                                max="31"
                            />
                        </div>
                    </StyledInputBlock>
                    {/* 성별 */}
                    <div style= {marginTopStyle}>
                        <label htmlFor="male">성별</label>
                        <RadioBtnWrapper>
                            <input
                                type="radio"
                                id="male"
                                name="cat-gender"
                                value="M"
                                checked={gender === 'M'}
                                onChange={onChangeGender}
                            />
                            <label className="radiobtn" htmlFor="male">
                                남
                            </label>

                            <input
                                type="radio"
                                id="female"
                                name="cat-gender"
                                value="F"
                                checked={gender === 'F'}
                                onChange={onChangeGender}
                            />
                            <label className="radiobtn" htmlFor="female">
                                여
                            </label>
                        </RadioBtnWrapper>
                    </div>
                    {/* 버튼 */}
                    <CenterWrapper>
                        <ButtonWrapper onClick={goBack}  type="button">취소</ButtonWrapper>
                        <ButtonWrapper type="submit">등록</ButtonWrapper>
                    </CenterWrapper>
                </form>
                </InnerGlobal>
        </>
    );
};

export default CatsAdd;