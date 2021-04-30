
import React, {useCallback, useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import styled from 'styled-components'





import { REMOVE_COMMENT_REQUEST, GET_COMMENTS_REQUEST} from  '../../reducers/post'

const EachComment = styled.div`
    padding-bottom: 1rem;
    padding-top: 1rem;
    & + & {
        border-top: 1px dotted ${({ theme }) => theme.palette.green};
    }
`;

const CommentsLayout = styled.div`
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

const CommentsWrapper = ({postId}) => {
    
    const {me} = useSelector((state) => state.user)
    const {currentPost} = useSelector((state) => state.post)
    
    const dispatch=useDispatch();
    const onRemoveComment = useCallback(
        
        (commentId)=> () =>{
            dispatch({
                type: REMOVE_COMMENT_REQUEST,
                
                data: commentId
                })
    }, []);

    useEffect(()=> {
        dispatch({
            type: GET_COMMENTS_REQUEST,
            data: postId
        })
    }, [currentPost])
    
    return (
        <CommentsLayout>
            
            
            
            
            
            
            <h1>{currentPost.comments.length>0?'댓글':''}</h1>
            <div>
                {currentPost.comments.map((c, i) => (
                    <EachComment key={c.content + i}>
                        <div>
                            <h3>{c.writer.nickname}</h3>
                            <div>{c.content}</div>
                        </div>
                        {c.writer.nickname == me.nickname && c.id && (
                        <div>
                            {/* 새로 만든 댓글은 삭제 못한다는 단점 있음 (id값 서버에서 불러와야 하기 때문) */}
                            {/* 리로드해야 가능 */}
                            <button type="button" onClick={onRemoveComment(c.id)}>삭제</button>
                        </div>
                    )
                    }
                    </EachComment>
                ))}
            </div>
        
        </CommentsLayout>
    )
};


export default CommentsWrapper;