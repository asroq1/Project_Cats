import React from 'react';
import { Link } from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PostItemsContainer = styled.div`
    width: 80%;
    margin: auto;
`;

const PostItemBlock = styled.div`
    padding-top: 0.25rem;
    padding-bottom: 0.75rem;
    position: relative;
    margin-top: 1rem;
    display: flex;

    &:not(last-child) {
        border-bottom: 1px solid gray;
    }
    &:first-child {
        padding-top: 0;
    }
    p {
        margin-top: 2rem;
    }
`;

const PostListBody = styled.div`
    position: relative;

    min-height: calc(100vh - 100px);
    //padding-top: 50px;
`;

const PhotoContainer = styled.div`
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    border-radius: 10px;
    border-bottom: 2px solid gray;

    background-size: cover;
    background-color: lightgray;

    .flex {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100%;

        .fa-paw {
            font-size: 3.5rem;
            color: ${({ theme }) => theme.beige};
        }
    }
`;

const ErrorBox = styled.div`
    height: 100vh;
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
        color: ${({ theme }) => theme.text};
        margin: 0;
        margin-bottom: 0.25rem;
    }
    div {
        font-size: 0.75rem;
        margin: 0;
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
    &:focus,
    &:link,
    &:visited,
    &active {
        text-decoration: none;
    }
`;

const PostItem = ({ post }) => {
    const { id, title, viewCount, writer, createdDate, thumbnail } = post;
    // const dispatch = useDispatch();
    // const setCurrentPost = useCallback((id)=>{
    //     dispatch({
    //         type: READ_POST_REQUEST,
    //         data: id,

    //     })
    // }, []);

    return (
        <StyledLink to={`/post/view/${id}`}>
            <PostItemBlock>
                
                {photos ? (
                    <PhotoContainer
                        style={{ backgroundImage: `url(${thumbnail})` }}
                    />
                ) : (
                    <PhotoContainer>
                        <div class="flex">
                            <i className="fa fa-paw"></i>
                        </div>
                    </PhotoContainer>
                )}

                <SubInfo>
                    <h1>{title}</h1>
                    <div>
                        <span>
                            <b>{writer.nickname}</b>
                        </span>
                        {/* <span>{new Date(date)}</span> */}
                        <span>{createdDate.slice(0, 10)}</span>
                    </div>
                    <PreviewWrapper>
                        {/* <i className="fa fa-comment"></i>
                        <span>{Comments.length}</span> */}
                        <i className="fa fa-eye"></i>
                        <span> {viewCount}</span>
                    </PreviewWrapper>
                </SubInfo>
            </PostItemBlock>
        </StyledLink>
    );
};

const PostList = ({ posts, error }) => {
    //에러
    if (error) {
        return <ErrorBox>에러 발생함</ErrorBox>;
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
                                <PostItem post={post} key={post.id} />
                            ))}
                        </div>
                    )}
                </PostItemsContainer>
            </PostListBody>
        </>
    );
};

PostItem.propTypes = {
    post: PropTypes.object,
};

PostList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.object,
};

export default PostList;
