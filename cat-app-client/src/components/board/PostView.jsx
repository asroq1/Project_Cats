import React,{useCallback, useEffect}  from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Link, useHistory} from 'react-router-dom'

import styled from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';

import CommentForm from './CommentForm';

import CommentsWrapper from './CommentsWrapper'
import { REMOVE_POST_REQUEST } from '../../reducers/post';

const OverallContainer = styled.div`
    color: gray;
    line-height: 1.25rem;
    h1 {
        cursor: pointer;
    }
`;

const PostHead = styled.div`
    border-bottom: 1.5px solid ${({ theme }) => theme.palette.green};
    border-top:1px solid lightgray;
    padding-bottom: 1rem;
    margin-bottom: 1.25rem;
    margin-top:0.75rem;
    h1 {
        font-weight: bold;
        color: ${({ theme }) => theme.palette.navy};
        line-height: 1.5rem;
        font-size: 1.5rem;
        margin-top: 2rem;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 1rem;
    button {
        background-color: ${({theme}) => theme.palette.orange};
        color: ${({theme}) => theme.palette.beige};
        padding: 0.5rem;
        border: none;
        border-radius: 10px;
        margin-left: 0.5rem;
        cursor: pointer;
    }
    .EditButton{
        margin-left: 0;
        background-color: ${({theme})=>theme.palette.green};
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
   
const PostView = ({ postId, post, error }) => {
    const history = useHistory();
    const goBack = useCallback(()=>{
        history.goBack();
    })
    const dispatch = useDispatch();
    const { removePostDone } = useSelector((state) => state.post);

    const onRemovePost = useCallback(
        (e)=>{
            e.preventDefault();
            dispatch({
                type: REMOVE_POST_REQUEST,
                data: postId
            })
    },[])

    useEffect(() => {
        if (removePostDone){

            history.push('/post/list');
        }
    }, [ removePostDone]);
    
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
            <h1 onClick={goBack}><i className = "fa fa-arrow-left"></i> 전체게시글 </h1>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo>
                    <span>
                        <b>{writer.nickname}</b>
                    </span>

                    <span>{createdDate.slice(0, 10)}</span>
                </SubInfo>
                <PostContent>{content}</PostContent>
                
                <ButtonWrapper>
                    <Link to ={{
                        pathname: `/post/edit/${id}`,
                        state: {

                            originalTitle: title,
                            originalContent: content,
                        }
                    }}>
                        <button className="EditButton"type="button">수정</button>
                    </Link>
                    
                    <button type="button"onClick={onRemovePost}>삭제</button>
                </ButtonWrapper>
            </PostHead>
            <CommentForm id={id} />
            <CommentsWrapper comments= {comments} />
        </OverallContainer>
    );

};

export default PostView;
