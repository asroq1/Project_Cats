import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import OverallPostsLayout from '../board/OverallPostsLayout';
import PostView from './PostView';
import ImageCarousel from './ImageCarousel';

const PostViewBody = styled.div`
    position: relative;
    width: 80%;
    margin: 0 auto;
    min-height: 100vh;
    padding-top: 50px;
`;

const PostViewContainer = ({ match }) => {
    //마운트 시 포스트 읽기 API 요청
    const { postId } = match.params;
    const dispatch = useDispatch();
    const { post, error, loading } = useSelector(({ post, loading }) => ({
        post: post.mainPosts[0],
        error: post.error,
        loading: '로딩하고 있어용',
    }));

    // useEffect(() => {
    //     dispatch({
    //         type: READ_POST_REQUEST,
    //         data: postId
    //     })
    //     //언마운트 시 리덕스에서 포스트 데이터 없애기
    //     dispatch({
    //         type: UNLOAD_POST,
    //     })
    // }, [postId])

    return (
        <>
        <OverallPostsLayout>
        <PostViewBody>
            <ImageCarousel images={post.Images} />
            <PostView post={post} loading={loading} error={error} />    
        </PostViewBody>
        </OverallPostsLayout>

        </>
    );
};
//URL 파라미터로 온 id값을 조회해야 하므로 withRouter 사용

export default withRouter(PostViewContainer);