import React, { useCallback, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4} from 'uuid';

import useInput from '../../hooks/useInput';
import { SET_CURRENT_IMAGE, ADD_CAT_REQUEST } from '../../reducers/cat';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.min.css';

import palette from '../../styles/palette';

// 스타일링된 input block
const InnerGlobal = styled.div`
    width: 90%;

    margin: 0 auto;
`;

const StyledInputBlock = styled.div`
    input {
        font-size: 1rem;
        border: 1px solid gray;
        background-color: lightgray;
        padding: 0.5rem auto;
        outline: none;
    }
    input-placeholder {
        text-align: center;
    }

    & > .inputcontainer > input:focus {
        background-color: white;
    }
    .regular {
        width: 100%;
    }
    .inputcontainer {
        display: flex;
    }
    .birth {
        min-width: 20px;
        max-width: 33%;
        flex: 1 1 auto;
        text-align: center;

        &::placeholder {
            text-align: center;
        }
    }

    & + & {
        margin-top: 0.5rem;
    }
    .birth + .birth {
        margin-left: 0.5rem;
    }
`;

// const PhotoPlaceholder = styled.div`
//     width: 180px;
//     height: 180px;
//     border-radius: 50%;
//     background: ${(props) => (!props.url ? palette.orange : '')};
//     background-image: ${(props) => (props.url ? 'url(' + props.url + ')' : '')};
//     background-size: cover;
//     border: 1px solid magenta;
//     display: flex;
//     margin: 2rem;
//     align-items: center;
//     text-align: center;
//     .fa-camera {
//         display: inline-block;
//         font-size: 6rem;
//         margin-left: 38px;
//     }
//     .fa-upload {
//         display: inline-block;
//         margin-left: -2.5px;
//     }
// `;

// const PhotoAddBtn = styled.button`
//     width: 3rem;
//     height: 3rem;
//     font-size: 1.5rem;
//     border: none;
//     border-radius: 50%;
//     background: black;
//     color: white;
//     cursor: pointer;
//     padding: 1rem;
//     position: relative;
//     margin-left: auto;
//     margin-top: auto;
// `;

const CenterWrapper = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    justify-content: center;
`;

const ButtonWrapper = styled.button`
    flex: 1;
    padding: 0.5rem auto;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    background-color: ${palette.orange};
    cursor: pointer;
    margin-top: 0.5rem;
    border: 1px solid darkred;
    & + & {
        margin-left: 0.5rem;
    }
    &:hover {
        background: darkred;
    }
`;

const RadioBtnWrapper = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    display: flex;
    input {
        display: none;
    }
    .radiobtn {
        flex: 1;
        display: inline-block;
        background-color: lightgray;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        border-radius: 5px;
        cursor: pointer;
        border: 1px solid gray;
        text-align: center;
    }
    input + .radiobtn:last-child {
        margin-left: 0.5rem;
    }
    input:checked + .radiobtn {
        background-color: ${palette.orange};
        border: 1px solid darkred;
    }
`;

const CatsAdd = ({}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {currImgUrl} = useSelector((state) => state.cat);
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
            formData.append('id', uuidv4());
            formData.append('name',name);
            console.log(currImgUrl);
            formData.append('photo', currImgUrl);

            // console.log("key")
            // for (var key of formData.keys()){
            //     console.log(key);
            // }

            // console.log("value")
            // for (var value of formData.values()){
            //     console.log(value);
            // }

            // console.log("entry")
            // for (var entry of formData.entries()){
            //     console.log(entry);
            // }

            dispatch({
                type: SET_CURRENT_IMAGE,
                data: null,
            });

            dispatch({
                type: ADD_CAT_REQUEST,
                data: formData,
            });
            history.push('/user/main');
        },
        [currImgUrl, name, birthyear, birthmonth, birthdate, gender]
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
                        <ButtonWrapper onClick={goBack}>취소</ButtonWrapper>
                        <ButtonWrapper htmlType="submit">등록</ButtonWrapper>
                    </CenterWrapper>
                </form>
                </InnerGlobal>
        </>
    );
};

export default CatsAdd;
