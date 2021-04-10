import React, { useCallback, useState, useRef, useMemo } from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.min.css';

import { ADD_CAT_REQUEST } from '../../reducers/cat';
import palette from '../../styles/palette';

// 스타일링된 input block
const Global = styled.div`
    background-color: white;
    max-width: 1200px;
    width: 100vw;
    
    height: 100%;
    margin: 0 auto;
    h2 {
        font-size: 2rem;
        text-align: center;
    }
    label {
        font-weight: bold;
    }
    @media screen and (max-width: 768px) {
        width: 75vw;
    }
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
        min-width: 100px;
        max-width: 33%;
        flex: 1 1 auto;
    }

    & + & {
        margin-top: 1rem;
    }
    .birth + .birth {
        margin-left: 0.5rem;
    }
`;

const PhotoPlaceholder = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: ${(props) => (!props.url ? palette.orange : '')};
    background-image: ${(props) => (props.url ? 'url(' + props.url + ')' : '')};
    background-size: cover;
    border: 1px solid magenta;
    display: flex;
    margin: 2rem;
    align-items: center;
    text-align: center;
    .fa-camera {
        display: inline-block;
        font-size: 5rem;
    }
    .fa-upload {
        display: inline-block;
    }
`;

const PhotoAddBtn = styled.button`
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    border: none;
    border-radius: 50%;
    background: black;
    color: white;
    cursor: pointer;
    padding: 1rem;
    position: relative;
    margin-left: auto;
    margin-top: auto;
`;

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
    margin-top: 1rem;
    border: 1px solid darkred;
    & + & {
        margin-left: 0.5rem;
    }
    &:hover {
        background: darkred;
    }
`;

const RadioBtnWrapper = styled.div`
    margin-top: 1rem;
    margin-bottom: 2rem;
    display: flex;
    input {
        display: none;
    }
    .radiobtn {
        flex: 1;
        display: inline-block;
        background-color: lightgray;
        padding-top: 1rem;
        padding-bottom: 1rem;
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

const CatsAdd = ({ hasCat }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const imageInput = useRef();

    const [photo, onChangePhoto] = useState({ file: '', url: '' });
    const [name, onChangeName] = useInput('');
    const [birthyear, onChangeBirthYear] = useInput('');
    const [birthmonth, onChangeBirthMonth] = useInput('');
    const [birthdate, onChangeBirthDate] = useInput('');
    const [gender, onChangeGender] = useInput('');

    // 버튼 누르면 정보 전달
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            dispatch({
                type: ADD_CAT_REQUEST,
                data: { photo, name, birthyear, birthmonth, birthdate, gender },
            });
            history.push('/user/main');
        },
        [photo, name, birthyear, birthmonth, birthdate, gender]
    );

    // 버튼을 눌러서 사진 업로드 창 띄우기 위함!
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    // 이미지 올렸을 때, 파일과 미리보기를 위한 URL 저장
    const onChangeImage = useCallback((e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            onChangePhoto({ file: file, url: reader.result });
        };
        reader.readAsDataURL(file);
    }, []);

    const goBack = useCallback(() => {
        history.goBack();
    });

    const paddingStyle = useMemo(() => ({ paddingTop: '2rem' }), []);

    return (
        <>
            <Global>
                <h2 style={paddingStyle}>
                    당신의 주인님에 대해
                    <br />
                    알려주세요!
                </h2>
                <form onSubmit={onSubmit}>
                    <CenterWrapper>
                        <PhotoPlaceholder url={photo.url ? photo.url : ''}>
                            {!photo.url && (
                                <span class="fa fa-camera"></span>
                                /*<FontAwesomeIcon size="6x" icon={faCamera} />*/
                            )}
                            <input
                                type="file"
                                hidden
                                ref={imageInput}
                                accept="image/*"
                                name="cat-image"
                                onChange={onChangeImage}
                            />
                            {/*  DOM에 접근할 때 ref사용 */}
                            <PhotoAddBtn onClick={onClickImageUpload}>
                                <i class="fa fa-upload"></i>
                            </PhotoAddBtn>
                        </PhotoPlaceholder>
                    </CenterWrapper>
                    {/* 이름 */}
                    <StyledInputBlock>
                        <label htmlFor="cat-name">이름</label>
                        <br />
                        <div class="inputcontainer">
                            <input
                                class="regular"
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
                        <div class="inputcontainer">
                            <input
                                class="birth"
                                type="number"
                                id="cat-birthyear"
                                name="cat-birthyear"
                                placeholder="yyyy"
                                value={birthyear}
                                onChange={onChangeBirthYear}
                                required
                            />
                            <input
                                class="birth"
                                type="number"
                                name="cat-birthmonth"
                                placeholder="mm"
                                value={birthmonth}
                                onChange={onChangeBirthMonth}
                                required
                            />
                            <input
                                class="birth"
                                type="number"
                                name="cat-birthdate"
                                placeholder="dd"
                                value={birthdate}
                                onChange={onChangeBirthDate}
                                required
                            />
                        </div>
                    </StyledInputBlock>
                    {/* 성별 */}
                    <div style={{ marginTop: '1rem' }}>
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
                            <label class="radiobtn" htmlFor="male">
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
                            <label class="radiobtn" htmlFor="female">
                                여
                            </label>
                        </RadioBtnWrapper>
                    </div>
                    {/* 버튼 */}
                    <CenterWrapper>
                        {hasCat && (
                            <ButtonWrapper onClick={goBack}>취소</ButtonWrapper>
                        )}
                        <ButtonWrapper htmlType="submit">등록</ButtonWrapper>
                    </CenterWrapper>
                </form>
            </Global>
        </>
    );
};

export default CatsAdd;
