import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux'

import styled from 'styled-components';
import CommentForm from './CommentForm';
//import { REMOVE_COMMENT_REQUEST} from '../../reducers/post'

const OverallContainer = styled.div`
    color: gray;
    line-height: 1.25rem;
`;

const PostHead = styled.div`
    border-bottom: 1.5px solid ${({theme}) => theme.palette.green};
    padding-bottom: 1rem;
    margin-bottom: 1.25rem;
    h1 {
        font-weight: bold;
        color: ${({theme}) => theme.palette.navy};
        line-height: 1.5rem;
        font-size: 1.5rem;
        margin-top: 2rem;
    }
`;

const SubInfo = styled.div`
    margin-top: 1rem;
    font-size: 1rem;
    color: ${({theme}) => theme.palette.green};
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

const EachComment=styled.div`
    padding-bottom:1rem;
    padding-top:1rem; 
    & + & {
        border-top: 1px dotted ${({theme}) => theme.palette.green};
    }
`;

const CommentWrapper = styled.div`
    margin-top: 2rem;
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
`;

const PostView = ({ post, error, loading }) => {
    const dispatch = useDispatch();
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
    const { title, content, writer, createdDate, comments } = post;

    // const onRemoveComment = useCallback(
    //     (key, i)=> () =>{
    //         dispatch({
    //             type: REMOVE_COMMENT_REQUEST,
    //             data: {
    //                 key: key,
    //                 i: i
    //             }
    //         })
    // }, []);

    
    
    return (
        <OverallContainer>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo>
                    <span>
                        <b>{writer.nickname}</b>
                    </span>
                    
                    <span>{createdDate.slice(0,10)}</span>
                </SubInfo>
                <PostContent>{content}</PostContent>
            </PostHead>
            <CommentForm post={post} />
            <CommentWrapper>
                <h1>댓글</h1>
                <div>
                    {comments.map((c,i) => (
                        <EachComment key={c+i}>
                            <div>
                                <h3>{c.User.nickname}</h3>
                                <div>{c.content}</div>
                            </div>
                            {/* {comment.User == localStorage.currentUser && (
                                <div>
                                    <button type="button" onClick={onRemoveComment(comment+i,i)}>삭제</button>
                                </div>
                            ) */}                            
                        </EachComment>
                    ))}
                </div>
            </CommentWrapper>
        </OverallContainer>
    );
};

export default PostView;