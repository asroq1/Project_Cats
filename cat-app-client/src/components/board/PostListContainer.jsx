import React from 'react';
//import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';

import OverallPostsLayout from '../board/OverallPostsLayout';

import PostList from './PostList';

const PostListContainer = ({ location, match }) => {
    //const dispatch = useDispatch();
    const { mainPosts, listPostLoading, listPostError } = useSelector((state) => state.post);

    
    
    return (
        <>
        <OverallPostsLayout>  
            <PostList loading={listPostLoading} error={listPostError} posts={mainPosts}  />
        </OverallPostsLayout>
        </>
    );
};
export default PostListContainer;
//export default withRouter(PostListContainer);