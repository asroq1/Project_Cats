import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
    REMOVE_COMMENT_REQUEST,
    GET_COMMENTS_REQUEST,
} from '../../reducers/post';

const EachComment = styled.div`
    
    white-space:pre-wrap;
    padding-bottom: 1rem;
    padding-top: 1rem;
    & + & {
        border-top: 1px dotted ${({ theme }) => theme.green};
    }

    button {
        margin-left: 0.75rem;
        padding: 0.25rem;

        border: none;
        border-radius: 10px;
        background-color: lightgray;
    }
`;

const CommentsLayout = styled.div`
    margin-top: 2rem;
    font-size: 1rem;
    color: gray;
    h1 {
        font-weight: bold;
        text-decoration: underline;
        margin-bottom: 1rem;
    }
    h3 {
        font-weight: bold;
        padding-bottom: 0.25rem;
    }
`;

const CommentsWrapper = ({ postId }) => {
    const { me } = useSelector((state) => state.user);
    const { addCommentDone, removeCommentDone, currentComments } = useSelector(
        (state) => state.post
    );

    const dispatch = useDispatch();
    const onRemoveComment = useCallback(
        (commentId) => () => {
            dispatch({
                type: REMOVE_COMMENT_REQUEST,
                data: commentId,
            });
        }, []
    );

    // Whenever any change happens (comment added / deleted)
    // Call GET_COMMENTS_REQUEST
    // And re-render Comments
    useEffect(() => {
        dispatch({
            type: GET_COMMENTS_REQUEST,
            data: postId,
        });
    }, [addCommentDone, removeCommentDone, postId]);

    return (
        <CommentsLayout>
            <h1>{currentComments.length > 0 ? '댓글' : ''}</h1>
            <div>
                {currentComments &&
                    currentComments.map((c, i) => (
                        <EachComment key={c.content + i}>
                            <div>
                                <h3>
                                    
                                    {c.writer?.nickname}
                                    {c.writer.nickname === me.nickname && c.id && (
                                        <button
                                            type="button"
                                            onClick={onRemoveComment(c.id)}
                                        >
                                            댓글 삭제
                                        </button>
                                    )}
                                </h3>
                                <div>{c.content}</div>
                            </div>
                        </EachComment>
                    ))}
            </div>
        </CommentsLayout>
    );
};

CommentsWrapper.propTypes = {
    postId: PropTypes.number.isRequired,
};

export default CommentsWrapper;
