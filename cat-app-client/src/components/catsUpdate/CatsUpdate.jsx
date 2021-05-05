import React, { useCallback, useState, useRef, useMemo, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import { SET_CURRENT_IMAGE, UPDATE_CAT_REQUEST } from '../../reducers/cat';

import 'font-awesome/css/font-awesome.min.css';
import PropTypes from 'prop-types';
import {InnerGlobal, StyledInputBlock, CenterWrapper, ButtonWrapper, RadioBtnWrapper}from './styles.js';

const CatsUpdate = ({cat, currentIndex}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const currentCat = cat.find((v) => v.id === currentIndex);

    const {currImgUrl, updateCatDone} = useSelector((state) => state.cat);
    const [currbirthyear, currbirthmonth, currbirthdate] = currentCat.birth.split("-");
    const [name, onChangeName] =useInput(currentCat.name);
    const [goalWeight, onChangeGoalWeight] = useInput(currentCat.goalWeight);
    const [birthyear, onChangeBirthYear] = useInput(currbirthyear);
    const [birthmonth, onChangeBirthMonth] = useInput(currbirthmonth);
    const [birthdate, onChangeBirthDate] = useInput(currbirthdate);
    const [gender, onChangeGender] = useInput(currentCat.gender);

    // 버튼 누르면 정보 전달
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('birth', birthyear+"-"+birthmonth+"-"+birthdate);
            formData.append('gender',gender);
            formData.append('id', parseInt(currentIndex));
            formData.append('name',name);
            console.log(currImgUrl);
            formData.append('goalWeight', goalWeight);
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
                type: UPDATE_CAT_REQUEST,
                data: formData,
            });
        },
        [currImgUrl, name, birthyear, birthmonth, birthdate,gender, goalWeight]
    );

    const goBack = useCallback(() => {
        history.goBack();
    });

    const paddingStyle = useMemo(() => ({ paddingTop: '2rem' }), []);
    const marginTopStyle = useMemo(() =>({ marginTop: '0.5rem' }), []);

    
    useEffect(() => {
        if (updateCatDone){
            history.push('/user/main');
        }
    }, [updateCatDone]);

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
                                placeholder="Name"
                                value={name}
                                onChange={onChangeName}
                                maxLength="50"
                                required
                            />
                        </div>
                    </StyledInputBlock>
                    <StyledInputBlock>
                        <label htmlFor="cat-goal-weight">목표체중</label>
                            <br />
                            <div className="inputcontainer">
                                <input
                                    className="regular"
                                    type="number"
                                    id="cat-goal-weight"
                                    name="cat-goal-weight"
                                    placeholder="Goal Weight"
                                    value={goalWeight ? goalWeight : ''}
                                    onChange={onChangeGoalWeight}
                                    
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
                        <ButtonWrapper htmlType="submit">등록</ButtonWrapper>
                    </CenterWrapper>
                </form>
                </InnerGlobal>
        </>
    );
};

CatsUpdate.propTypes = {
    currentIndex: PropTypes.number.isRequired,
    cat:PropTypes.array.isRequired
}

export default CatsUpdate;