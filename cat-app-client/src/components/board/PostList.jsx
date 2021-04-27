import React from 'react';
import { Link } from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css';
import styled from 'styled-components';

const PostItemsContainer = styled.div`
    width: 80%;
    margin: auto;
`;

const PostItemBlock = styled.div`
    padding-top: 0.25rem;
    padding-bottom: 0.75rem;
    position:relative;
    margin-top: 1rem;
    display: flex;
    // border: 1px solid ${({theme}) => theme.palette.green};
    // border-radius: 10px;

    border-bottom: 1px solid gray;
    &:first-child {
        padding-top: 0;
    }
    p {
        margin-top: 2rem;
    }
`;

const PostListBody = styled.div`
    position: relative;
    min-height: 100vh;
    //padding-top: 50px;
`;

const PhotoContainer = styled.img`
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    border-radius:5px;
    object-fit: cover;
`;

const SubInfo = styled.div`
    color: gray;
    display: inline-block;
    margin-top: 1rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    /* 스팬 사이 가운뎃점 문자 보여주기 */
    span + span:before {
        color: gray;
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7'; /* 가운뎃점 문자 */
    }
    /* 제목 */
    h1 {
        font-size: 1rem;
        font-weight: bold;
        color: ${({theme}) => theme.palette.navy};
        margin: 0;
        margin-bottom: 0.25rem;
    }
    div {
        font-size: 0.75rem;
        margin:0;
        padding: 0;
        text-align: start;
    }
    h2 > span {
        font-size: 0.75rem;
        color: gray;
    }
`;

const PreviewWrapper = styled.div`
    font-size: 0.75rem;
    top: 20px;
    margin-left: auto;
    position: relative;
    i + span {
        padding-left: 0.25rem;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;

    &:focus,
    &:hover,
    &:link,
    &:visited,
    &active {
        text-decoration: none;
    }
`;

const PostItem = ({ post }) => {
    const { date, User, title, Comments, _id, Images } = post;
    return (
        <StyledLink to={`/post/view/${_id}`}>
            <PostItemBlock>
                <PhotoContainer src={Images[0].src} alt="post" />

                <SubInfo>
                    <h1>{title}</h1>
                    <div>
                        <span>
                            <b>{User.nickname}</b>
                        </span>
                        {/* <span>{new Date(date)}</span> */}
                        <span>{date}</span>
                    </div>
                    <PreviewWrapper>
                        <i className="fa fa-comment"></i>
                        <span>{Comments.length}</span>
                    </PreviewWrapper>
                </SubInfo>
            </PostItemBlock>
        </StyledLink>
    );
};

const PostList = ({ posts, loading, error }) => {
    //에러
    if (error) {
        return <h2>에러 발생함</h2>;
    }
    return (
        <>
            {/* 로딩 중 아니고 포스트 배열 존재할 때만 */}
            {/* {!loading && posts && ( */}

            <PostListBody>

            <PostItemsContainer>
            {posts && (
                <div>
                    {posts.map((post) => (
                        <>
                        <PostItem post={post} key={post._id} />
                        </>
                    ))}
                </div>
            )}
            </PostItemsContainer>
            </PostListBody>
        </>
    );
};

export default PostList;