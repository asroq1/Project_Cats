import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import palette from '../../styles/palette';
import styled from 'styled-components';

import PostView from './PostView';

import ImageCarousel from './ImageCarousel';

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
const Header = styled.div`
    display: flex;
    height: 50px;
    font-size: 1rem;
    background-color: ${palette.green};

    position: sticky;
    top: 0;
    z-index: 1;
`;

const HeaderCol = styled.div`
    padding: 1rem;
    display: flex;
    font-size: 1rem;
    color: ${palette.beige};
    flex: auto;
    &:last-child {
        flex-direction: row-reverse;
        a {
            text-decoration: none;
            color: ${palette.beige};
        }
        a:hover {
            color: ${palette.navy};
        }
    }
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
        <Global>
            <Header>
                <HeaderCol>자유게시판</HeaderCol>
                <HeaderCol>
                    <Link to="/post/list">전체 글</Link>
                </HeaderCol>
            </Header>
            <ImageCarousel images={post.Images} />
            <PostView post={post} loading={loading} error={error} />
        </Global>
    );
};
//URL 파라미터로 온 id값을 조회해야 하므로 withRouter 사용
export default withRouter(PostViewContainer);
