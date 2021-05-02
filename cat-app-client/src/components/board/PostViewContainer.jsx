import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import OverallPostsLayout from '../board/OverallPostsLayout';
import PostView from './PostView';
import { READ_POST_REQUEST, UNLOAD_POST } from '../../reducers/post';

const PostViewBody = styled.div`
    position: relative;
    width: 80%;
    margin: 0 auto;
    min-height: 100vh;
    padding-top: 50px;
`;

const PostViewContainer = ({ match }) => {
    const { currentPost, readPostError } = useSelector((state) => state.post);
    const { postId } = match.params;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: READ_POST_REQUEST,
            data: parseInt(postId),
        });
        //언마운트 시 리덕스에서 포스트 데이터 없애기
        return () => {
            dispatch({
                type: UNLOAD_POST,
            });
        };
    }, [dispatch, postId]);

    return (
        <>
            <OverallPostsLayout>
                <PostViewBody>
                    <PostView postId={parseInt(postId)}post={currentPost} error={readPostError} />
                </PostViewBody>
            </OverallPostsLayout>
        </>
    );
};

PostViewContainer.propTypes = {
    match: PropTypes.object.isRequired
}

//URL 파라미터로 온 id값을 조회해야 하므로 withRouter 사용
export default withRouter(PostViewContainer);