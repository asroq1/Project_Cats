import React from 'react';
//import { withRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';

import OverallPostsLayout from '../board/OverallPostsLayout';

import PostList from './PostList';

const PostListContainer = ( ) => {
    //const dispatch = useDispatch();
    const { mainPosts, listPostLoading, listPostError } = useSelector(
        (state) => state.post
    );

    return (
        <>
            <OverallPostsLayout>
                <PostList
                    loading={listPostLoading}
                    error={listPostError}
                    posts={mainPosts}
                />
            </OverallPostsLayout>
        </>
    );
};
export default PostListContainer;
//export default withRouter(PostListContainer);
