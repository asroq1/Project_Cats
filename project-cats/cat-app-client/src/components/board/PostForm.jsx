import React, { useState, useRef, useEffect, useCallback } from 'react';
import useInput from '../../hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import {
    ADD_POST_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    REMOVE_IMAGE,
} from '../../reducers/post';
import styled from 'styled-components';

import 'font-awesome/css/font-awesome.min.css';
import palette from '../../styles/palette';

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

const Header = styled.div`
    display: flex;
    height: 50px;
    font-size: 1rem;
    background-color: ${palette.green};
`;
const HeaderCol = styled.div`
    padding: 1rem;
    display: flex;
    font-size: 1rem;
    color: ${palette.beige};
    flex: auto;
    &:last-child {
        flex-direction: row-reverse;
        a {
            text-decoration: none;
            color: ${palette.beige};
        }
        a:hover {
            color: ${palette.navy};
        }
    }
`;

const EditBlock = styled.div`
    padding-top: 5rem;
    padding-bottom: 5rem;
    color: gray;
`;

const StyledBlock = styled.div`
    display: flex;
    textarea, input {
        width: 100%;
        font-size: 1rem;
        border: 1px solid  ${palette.green};
        padding: 0.5rem auto;
        
        border-radius:5px;
        outline: none;
    }
    textarea{
        height: 150px;
    }

    input::placeholder{
        text-align:start;
    }
`;


const StyledButton = styled.button`
background-color: ${palette.green};
color: ${palette.beige};
`;
const PreviewBox = styled.div`
padding: 1rem;
border: 1px dotted gray;

`;

const PostForm = () => {
    const dispatch = useDispatch();
    const imageInput = useRef();

    // 각 form 내용은 useState이용한 커스텀 훅으로 관리
    const [title, onChangeTitle, setTitle] = useInput('');
    const [text, onChangeText, setText] = useInput('');

    // 게시판에 올리는 사진들은 redux에서 상태 관리
    const { imagePaths } = useSelector((state) => state.post);

    // 이미지 올리는 input은 숨기고, 버튼을 input과 연결하기 위함
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    // 이미지 올렸을 때, 파일과 미리보기를 위한 URL 저장
    const paths = [...imagePaths];
    const onChangeImages = useCallback(
        (e) => {
            // const currImagePaths = [...imagePaths];
            const files = e.target.files;
            Object.keys(files).forEach((i) => {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = () => {
                    const path = [
                        {
                            file: file,
                            url: reader.result,
                        },
                    ];
                    console.log(path);

                    dispatch({
                        type: UPLOAD_IMAGES_SUCCESS,
                        data: path,
                    });
                };
                reader.readAsDataURL(file);
                // reader.readAsBinaryString(file);
            });
        },
        [imagePaths]
    );

    const onRemoveImages = useCallback(
        (key) => () => {
            dispatch({
                type: REMOVE_IMAGE,
                data: key,
            });
        },
        []
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            console.log(imagePaths);
            if (!text || !text.trim()) {
                return alert('게시글 작성해주세용');
            }
            const formData = new FormData();
            imagePaths.forEach((p) => {
                formData.append('image', p.file);
            });
            formData.append('title', text);
            formData.append('content', text);

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
            return dispatch({
                type: ADD_POST_REQUEST,
                data: formData,
            });
        },
        [text, imagePaths]
    );

    return (
        <Global>
            <Header>
                <HeaderCol>자유게시판</HeaderCol>

                <HeaderCol>
                    <Link to="/post/list">전체 글</Link>
                </HeaderCol>
            </Header>
            <form
                style={{ margin: '10px 0 20px' }}
                encType="multipart/form-data"
                onSubmit={onSubmit}
            >
                
                <StyledBlock>
                    <input
                        value={title}
                        onChange={onChangeTitle}
                        maxLength="20"
                        placeholder="제목을 입력하세용"
                    />
                </StyledBlock>
                
                <StyledBlock>
                <textarea
                    value={text}
                    onChange={onChangeText}
                    maxLength={200}
                    placeholder="글을 작성해주세용"
                />
                
                </StyledBlock>
                <div>
                    <input
                        type="file"
                        hidden
                        ref={imageInput}
                        accept="image/*"
                        name="post-images"
                        multiple
                        onChange={onChangeImages}
                    />
                    
                    
                    
                    <StyledButton type="button" onClick={onClickImageUpload}>
                        사진을 올려달라냥! <i className="fa fa-paw"></i>
                    </StyledButton>
                    <StyledButton
                        type="primary"
                        style={{ float: 'right' }}
                        htmltype="submit"
                    >
                        등록
                    </StyledButton>
                </div>
                <div>
                    <div>사진 체크</div>
                    {imagePaths.map((v, i) => (
                        <PreviewBox
                            key={v.file.name}
                            style={{ display: 'inline-block' }}
                        >
                            <img
                                src={v.url}
                                style={{ width: '200px' }}
                                alt={v.file.name}
                            ></img>
                            <div>
                                <button
                                    type="button"
                                    onClick={onRemoveImages(v.file.name)}
                                >
                                    삭제
                                </button>
                            </div>
                        </PreviewBox>
                    ))}
                </div>
            </form>
        </Global>
    );
};

export default PostForm;
