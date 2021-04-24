import React, { useState, useCallback } from 'react';
import palette from '../../styles/palette';
import styled from 'styled-components';



const OverallContainer = styled.div`

    color: gray;
    line-height:1.25rem;
    `;

const PostHead = styled.div`
    border-bottom: 1px solid ${palette.green};
    padding-bottom: 1rem;
    margin-bottom: 1.25rem;
    h1 {
        font-weight: bold;

        color: ${palette.navy};
        line-height: 1.5rem;
        font-size: 1.5rem;
        margin-top: 2rem;
    }
`;

const SubInfo = styled.div`
    margin-top: 1rem;
    font-size: 1rem;
    color: ${palette.green};
    span + span:before {
        color: gray;
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7';
    }
`;

const PostContent = styled.div`
    margin-top: 1rem;
    font-size: 1rem;
    color: gray;
`;

const CommentWrapper = styled.div`
    margin-top: 1rem;
    font-size: 1rem;
    color: gray;

    h1 {
        font-weight: bold;
        text-decoration: underline;
        margin-bottom: 1rem;
    }

    h3 {
        font-weight: bold;
        padding-bottom: 0.25rem;
    }

    div {
        margin-bottom: 1rem;
    }
`;

const PostView = ({ post, error, loading }) => {
    //에러 발생 시
    if (error) {
        if ((error.response && error.response.status) === 404) {
            return <h2>존재하지 않는 포스트입니다.</h2>;
        }
        return <h2>에러가 발생했습니다.</h2>;
    }

    // 로딩 중이거나 포스트 데이터 없을 때
    // if (loading || !post){
    if (!post) {
        return <h2>로딩중</h2>;
    }
    const { title, content, User, date, Images, Comments } = post;
    return (
        <OverallContainer>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo>
                    <span>
                        <b>{User.nickname}</b>
                    </span>
                    <span>{date}</span>
                </SubInfo>
                <PostContent>{content}</PostContent>
            </PostHead>
            <CommentWrapper>
                <h1>댓글</h1>
                <div>
                    {Comments.map((comment) => (
                        <div>
                            <h3>{comment.User.nickname}</h3>
                            <div>{comment.content}</div>
                        </div>
                    ))}
                </div>
            </CommentWrapper>
        
        </OverallContainer>
    );
};
export default PostView;
