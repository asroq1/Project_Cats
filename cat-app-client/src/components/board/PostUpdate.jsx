import React, {   useRef, useEffect, useCallback } from 'react';
import useInput from '../../hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory,withRouter } from 'react-router-dom';
import {
    READ_POST_REQUEST,
    UPDATE_POST_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    REMOVE_IMAGE,
} from '../../reducers/post';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import 'font-awesome/css/font-awesome.min.css';
import OverallPostsLayout from './OverallPostsLayout';

const FormBlock = styled.div`
    position: relative;
    padding-top: 50px;
    width:80%;
    margin: 0 auto;
    min-height: 100vh;
`;

// const EditBlock = styled.div`
//     padding-top: 5rem;
//     padding-bottom: 5rem;
//    color: gray;

//`;

const StyledBlock = styled.div`
    display: flex;
    line-height: 1.5rem;

    textarea,
    input {
        margin-top: 1rem;
        width: 100%;
        font-size: 1rem;
        border: 1px solid gray;
        padding: 1rem;
        border-radius: 10px;
        outline: none;
    }
    textarea {
        height: 300px;
        padding: 1rem;
        margin-bottom: 1rem;
    }
    input::placeholder {
        text-align: start;
    }
`;

const CenterWrapper = styled.div`
    width: 100%;
    display: flex;
    position: relative;
`;


const ImagesContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledButton = styled.button`
    flex: 1;
    padding: 1rem;
    border-radius: 10px;
    color: white;
    border:none; 
    background-color: ${({theme})=>theme.green};
    font-weight:bold;
    cursor:pointer;
    margin-bottom: 1rem;
    & + & {
        margin-left: 0.5rem;
    }
    &:hover,&:focus {
        background-color: darkgreen;
    }
    &:first-child {
        background-color: ${({theme}) => theme.navy};
    }
    &:first-child:hover, &:first-child:focus {
        background-color: black;
    }
`;
const PreviewBox = styled.div`
    padding: 1rem;
    border: 1px dotted gray;
    margin: 0 auto;
    button {
        border-radius: 10px;
        border: 1px solid gray;
        padding: 0.25rem;
        background-color: none;

        margin-top: 0.5rem;
        width: 100%;
    }
`;


const PostUpdate = ({match, location}) => {
    const { updatePostDone } = useSelector((state) => state.post);
    
    const { me } = useSelector((state) => state.user);
    const { postId } = match.params;
    const history=useHistory();


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: READ_POST_REQUEST,
            data: parseInt(postId),
        });
    
    }, [postId,  dispatch]);

    useEffect(()=>{
        if (updatePostDone){
            history.push(`/post/view/${postId}`)
        }
    },[updatePostDone,   postId, history]);

    useEffect(()=> { 
        if (!me){
            alert("로그인 먼저 해주세요")
            history.push('/');
        }
    }, [me,  history]);

    const imageInput = useRef();

    // 각 form 내용은 useState이용한 커스텀 훅으로 관리
    const [title,onChangeTitle] =useInput(location.state.originalTitle);
    const [text, onChangeText] =  useInput(location.state.originalContent);


    // 게시판에 올리는 사진들은 redux에서 상태 관리
    const { imagePaths } = useSelector((state) => state.post);

    // 이미지 올리는 input은 숨기고, 버튼을 input과 연결하기 위함
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    
    
    }, [ ]);

    // 이미지 올렸을 때, 파일과 미리보기를 위한 URL 저장
    
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
            });
        },
        [ ]
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

    const goBack = useCallback(()=>{
        history.goBack();
    }, [])

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
            formData.append('title', title);
            formData.append('content', text);
            formData.append('id', postId);

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
            return dispatch({
                type: UPDATE_POST_REQUEST,
                data: formData
            })
        },
        [text, title, imagePaths , postId]
    );

    return (
        <>
            <OverallPostsLayout>
                <FormBlock>
                    <form
                        style={{ margin: '10px 0 20px' }}
                        encType="multipart/form-data"
                        onSubmit={onSubmit}
                    >
                        <StyledBlock>
                            <input
                                value={title}
                                onChange={onChangeTitle}
                                maxLength="30"
                                
                            />
                        </StyledBlock>

                        <StyledBlock>
                            <textarea
                                value={text}
                                onChange={onChangeText}
                                maxLength={200}
                                
                            />
                        </StyledBlock>
                        
                        <CenterWrapper>
                            <StyledButton
                                type="button"
                                onClick={goBack} 
                            >
                                취소
                            </StyledButton>
                            <StyledButton
                                type="primary"
                                htmltype="submit"
                            >
                                등록
                            </StyledButton>
                        </CenterWrapper>
                       
                        <CenterWrapper>
                            <input
                                type="file"
                                hidden
                                ref={imageInput}
                                accept="image/*"
                                name="post-images"
                                multiple
                                onChange={onChangeImages}
                            />
                            <StyledButton
                                type="button"
                                onClick={onClickImageUpload}
                            >
                                사진을 올려주세요 <i className="fa fa-paw"></i>
                            </StyledButton>
                        </CenterWrapper>

                        <ImagesContainer>
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
                                            onClick={onRemoveImages(
                                                v.file.name
                                            )}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </PreviewBox>
                            ))}
                        </ImagesContainer>
                    </form>
                </FormBlock>
            </OverallPostsLayout>
        </>
    );
};

PostUpdate.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}

export default withRouter(PostUpdate);