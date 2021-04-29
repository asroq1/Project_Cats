import React, { useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../../reducers/post';

import styled from 'styled-components';

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
    background-color: lightgray;
    border-radius: 10px;

    font-size: 1rem;
`;

const CommentForm = ({ post }) => {
    const id = localStorage.currentUser;
    const { addCommentDone, addCommentLoading } = useSelector(
        (state) => state.post
    );
    const dispatch = useDispatch();
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone]);

    const onSubmitComment = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id },
        });
    }, [commentText, id]);

    return (
        <>
            <form onFinish={onSubmitComment}>
                <CommentFormWrapper>
                    <textarea
                        value={commentText}
                        onChange={onChangeCommentText}
                        rows={4}
                        placeholder="댓글을 달아주세용"
                    />
                </CommentFormWrapper>

                <CommentSubmitButton
                    type="primary"
                    htmlType="submit"
                    // loading ={addCommentLoading}
                >
                    달기
                </CommentSubmitButton>
            </form>
        </>
    );
};

// CommentForm.propTypes = {
//     post:PropTypes.object.isRequired
// }

export default CommentForm;