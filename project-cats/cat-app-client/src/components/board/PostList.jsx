import React from 'react';
import { Link } from 'react-router-dom';
import palette from '../../styles/palette';
import styled from 'styled-components';

const Header = styled.div`
    display: flex;
    height: 50px;
    font-size: 1rem;
    background-color: ${palette.green};
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

const PostWriteButton = styled.button`
    font-size: 1rem;
    margin: 0;
    margin-left: auto;
    background: none;
    color: ${palette.beige};
    &:hover {
        border: 1px solid ${palette.beige};
        background-color: ${palette.green};
    }
`;

const PostItemBlock = styled.div`
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    margin-top: 1rem;
    display: flex;
    border: 1px solid ${palette.green};
    border-radius: 10px;
    &:first-child {
        padding-top: 0;
    }
    p {
        margin-top: 2rem;
    }
`;

const PhotoContainer = styled.img`
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    border: 2px solid ${palette.navy};
    object-fit: cover;
`;

const SubInfo = styled.div`
    color: ${palette.green};
    display: inline-block;
    margin-top: 1rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    /* 스팬 사이 가운뎃점 문자 보여주기 */
    span + span:before {
        color: ${palette.green};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7'; /* 가운뎃점 문자 */
    }
    /* 제목 */
    h1 {
        font-size: 1.5rem;
        color: ${palette.navy};
    }
    h2 {
        margin:0;
        text-align: start;
    }
    h2 > span {
        font-size: 1rem;
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
    const { date, User, title, content, _id, Images } = post;
    return (
        <StyledLink to={`/post/view/${_id}`}>
            <PostItemBlock>
                <PhotoContainer src={Images[0].src} alt="post" />

                <SubInfo>
                    <h1>{title}</h1>
                    <h2>
                        <span>
                            <b>{User.nickname}</b>
                        </span>
                        {/* <span>{new Date(date)}</span> */}
                        <span>{date}</span>
                    </h2>
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
            <Header>
                <HeaderCol>자유게시판</HeaderCol>
                <HeaderCol>
                    <Link to="/post/write">새 글 작성</Link>
                </HeaderCol>
            </Header>

            {/* 로딩 중 아니고 포스트 배열 존재할 때만 */}
            {/* {!loading && posts && ( */}

            {posts && (
                <div>
                    {posts.map((post) => (
                        <PostItem post={post} key={post._id} />
                    ))}
                </div>
            )}
        </>
    );
};

export default PostList;
