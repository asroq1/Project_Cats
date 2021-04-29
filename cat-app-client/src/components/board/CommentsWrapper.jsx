
import React from 'react';
import styled from 'styled-components'

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

const CommentsWrapper = ({comments}) => {
    return (
        <CommentsLayout>
            <h1>댓글</h1>
            <div>
                {comments.map((c, i) => (
                    <EachComment key={c + i}>
                        <div>
                            <h3>{c.writer.nickname}</h3>
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
        
        </CommentsLayout>
    )
};


export default CommentsWrapper;