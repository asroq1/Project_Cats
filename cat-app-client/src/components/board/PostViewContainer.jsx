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

const PostViewContainer = ({ }) => {
    const { currentPost, readPostError } = useSelector((state) => state.post);

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
            {/* <ImageCarousel images={currentPost.Images} /> */}
            <PostView post={currentPost} error={readPostError}/>    
        </PostViewBody>
        </OverallPostsLayout>

        </>
    );
};
//URL 파라미터로 온 id값을 조회해야 하므로 withRouter 사용

export default withRouter(PostViewContainer);