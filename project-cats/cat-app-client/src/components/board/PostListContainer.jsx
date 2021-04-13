import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import palette from '../../styles/palette';
import styled from 'styled-components';

import PostList from './PostList';
import { LIST_POST_REQUEST } from '../../reducers/post';

const Global = styled.div`
    background-color: white;
    max-width: 1200px;
    width: 100vw;

    height: 100%;
    margin: 0 auto;
    h2 {
        font-size: 2rem;
        text-align: center;
    }
    label {
        font-weight: bold;
    }
    @media screen and (max-width: 768px) {
        width: 75vw;
    }
`;

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
        const { page } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        dispatch({
            type: LIST_POST_REQUEST,
            date: page,
        });
    }, [dispatch, location.search]);

    return (
        <Global>
            <PostList loading={loading} error={error} posts={posts} />
        </Global>
    );
};

export default withRouter(PostListContainer);
