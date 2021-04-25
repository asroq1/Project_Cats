import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';

import OverallPostsLayout from '../board/OverallPostsLayout';

import PostList from './PostList';
import { LIST_POST_REQUEST } from '../../reducers/post';


const PostListContainer = ({ location, match }) => {
    const dispatch = useDispatch();
    const { posts, error, loading, user } = useSelector(
        ({ post, loading }) => ({
            posts: post.mainPosts,
            error: post.error,
            loading: '로딩 중예용',
        })
    );
    useEffect(() => {
        // const { page } = qs.parse(location.search, {
        //     ignoreQueryPrefix: true,
        // });
        dispatch({
            type: LIST_POST_REQUEST,
            // date: page,
        });
    }, [dispatch, location.search]);

    return (
        <>
        <OverallPostsLayout>  
            <PostList loading={loading} error={error} posts={posts} />
        </OverallPostsLayout>
        </>
    );
};

export default withRouter(PostListContainer);