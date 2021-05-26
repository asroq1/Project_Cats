import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';

import styled from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';
import PropTypes from 'prop-types';

import CommentForm from './CommentForm';

import CommentsWrapper from './CommentsWrapper';
import ImageCarousel from './ImageCarousel';
import { REMOVE_POST_REQUEST } from '../../reducers/post';

const OverallContainer = styled.div`
    color: gray;
    line-height: 1.25rem;
    h1 {
        cursor: pointer;
    }
`;

const PostHead = styled.div`
    border-bottom: 1.5px solid ${({ theme }) => theme.green};
    border-top: 1px solid lightgray;
    padding-bottom: 1rem;
    margin-bottom: 1.25rem;
    margin-top: 0.75rem;

    h1 {
        font-weight: bold;

        color: ${({ theme }) => theme.text};
        line-height: 1.5rem;
        font-size: 1.5rem;
        margin-top: 2rem;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 1rem;
    button {
        background-color: ${({ theme }) => theme.orange};
        color: ${({ theme }) => theme.beige};
        padding: 0.5rem;
        border: none;
        border-radius: 10px;
        margin-left: 0.5rem;
        cursor: pointer;
    }
    .EditButton {
        margin-left: 0;
        background-color: ${({ theme }) => theme.green};
    }
`;

const ErrorBox = styled.div`
    height: 100vh;
`;

const SubInfo = styled.div`
    margin-top: 1rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.green};
    span + span:before {
        color: gray;
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7';
    }
`;

const PostContent = styled.div`
    margin-top: 1rem;
    white-space: pre-wrap;
    font-size: 1rem;
    color: gray;
`;

const PostView = ({ postId, post, error }) => {
    const history = useHistory();
    const goBack = useCallback(() => {
        history.push('/post/list');
    }, []);
    const dispatch = useDispatch();
    const { removePostDone } = useSelector((state) => state.post);

    const { me } = useSelector((state) => state.user);
    const onRemovePost = useCallback(
        (e) => {
            e.preventDefault();

            if (window.confirm('정말로 게시글을 지우시겠습니까??')) {
                dispatch({
                    type: REMOVE_POST_REQUEST,
                    data: postId,
                });
            }
        },
        [postId]
    );

    useEffect(() => {
        if (removePostDone) {
            history.push('/post/list');
        }
    }, [removePostDone]);

    useEffect(() => {
        if (!me) {
            alert('로그인 먼저 해주세요');
            history.push('/');
        }
    }, [me]);

    //에러 발생 시
    if (error) {
        if ((error.response && error.response.status) === 404) {
            return <ErrorBox>존재하지 않는 포스트입니다.</ErrorBox>;
        }
        return <ErrorBox>에러가 발생했습니다.</ErrorBox>;
    }
    if (!post) {
        return null;
    }

    const { id, title, content, writer, createdDate, images } = post;

    return (
        <OverallContainer>
            <h1 onClick={goBack}>
                <i className="fa fa-arrow-left"></i> 전체게시글{' '}
            </h1>
            <PostHead>
                {images && <ImageCarousel images={images} />}
                <h1>{title}</h1>
                <SubInfo>
                    <span>
                        <b>{writer.nickname}</b>
                    </span>
                    <span>{createdDate.slice(0, 10)}</span>
                    <span>{createdDate.slice(11, 16)}</span>
                </SubInfo>
                <PostContent>{content}</PostContent>
                {me && me.id === writer.id && (
                    <ButtonWrapper>
                        <Link
                            to={{
                                pathname: `/post/edit/${id}`,
                                state: {
                                    originalTitle: title,
                                    originalContent: content,
                                },
                            }}
                        >
                            <button className="EditButton" type="button">
                                수정
                            </button>
                        </Link>
                        <button type="button" onClick={onRemovePost}>
                            삭제
                        </button>
                    </ButtonWrapper>
                )}
            </PostHead>
            <CommentForm id={id} />
            <CommentsWrapper postId={id} />
        </OverallContainer>
    );
};

PostView.propTypes = {
    postId: PropTypes.number.isRequired,
    post: PropTypes.object,
    error: PropTypes.object,
};

export default PostView;
