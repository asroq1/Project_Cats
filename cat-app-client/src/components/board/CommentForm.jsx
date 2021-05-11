import React, { useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../../reducers/post';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import useInput from '../../hooks/useInput';

const CommentFormWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0;
    textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 1rem;
        border-radius: 10px;
    }
`;

const CommentSubmitButton = styled.button`
    position: absolute;
    right: 0;
    bottom: -40;
    border: none;
    border-radius: 10px;

    background-color: lightgray;

    //font-size: 1rem;
    padding: 0.5rem;

    cursor: pointer;
`;

const CommentForm = ({ id }) => {
    const { addCommentDone } = useSelector((state) => state.post);
    //const {me} = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone, setCommentText]);

    const onSubmitComment = useCallback(
        (e) => {
            e.preventDefault();
            dispatch({
                type: ADD_COMMENT_REQUEST,
                // API와 연동 위해 추가 작업
                // 댓글 추가할 때마다 댓글 부분 reload되도록 처리
                data: { content: commentText, postId: id },
            });
        },
        [commentText, id]
    );

    return (
        <>
            <form onSubmit={onSubmitComment}>
                <CommentFormWrapper>
                    <textarea
                        value={commentText}
                        onChange={onChangeCommentText}
                        rows={4}
                        placeholder="댓글을 달아주세용"
                    />
                </CommentFormWrapper>

                <CommentSubmitButton
                    type="submit"
                    // loading ={addCommentLoading}
                >
                    달기
                </CommentSubmitButton>
            </form>
        </>
    );
};

CommentForm.propTypes = {
    id: PropTypes.number.isRequired,
};

export default CommentForm;
