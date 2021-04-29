import React  from 'react';

import {Link} from 'react-router-dom'

import styled from 'styled-components';

import CommentForm from './CommentForm';

import CommentsWrapper from './CommentsWrapper'
//import { REMOVE_COMMENT_REQUEST} from '../../reducers/post'

const OverallContainer = styled.div`
    color: gray;
    line-height: 1.25rem;
`;

const PostHead = styled.div`
    border-bottom: 1.5px solid ${({ theme }) => theme.palette.green};
    padding-bottom: 1rem;
    margin-bottom: 1.25rem;
    h1 {
        font-weight: bold;
        color: ${({ theme }) => theme.palette.navy};
        line-height: 1.5rem;
        font-size: 1.5rem;
        margin-top: 2rem;
    }
`;

const SubInfo = styled.div`
    margin-top: 1rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.palette.green};
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

    
const PostView = ({ post, error }) => {

    //에러 발생 시
    if (error) {
        if ((error.response && error.response.status) === 404) {
            return <h2>존재하지 않는 포스트입니다.</h2>;
        }
        return <h2>에러가 발생했습니다.</h2>;
    }

    if (!post){
        return null;
    }

    console.log(post);
    const { id, title, content, writer, createdDate, comments } = post;
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

                    <span>{createdDate.slice(0, 10)}</span>
                </SubInfo>
                <PostContent>{content}</PostContent>
                <Link to = {`/post/edit/${id}`}>
                    <button type="button">수정</button>
                </Link>
            </PostHead>
            <CommentForm id={id} />
            <CommentsWrapper comments= {comments} />
        </OverallContainer>
    );

};

export default PostView;
