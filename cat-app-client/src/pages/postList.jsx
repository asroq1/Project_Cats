import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PostListContainer from '../components/board/PostListContainer';

import { LIST_POST_REQUEST, UNLOAD_POSTS } from '../reducers/post';

const PostList = () => {
    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, listPostLoading } = useSelector(
        (state) => state.post
    );

    const SIZE = 5;

    useEffect(() => {
        dispatch({
            type: UNLOAD_POSTS,
        });
        dispatch({
            type: LIST_POST_REQUEST,
            data: {
                size: SIZE,
                lastPostId: Number.MAX_SAFE_INTEGER,
            },
        });
        return () => {
            dispatch({
                type: UNLOAD_POSTS,
            });
        };
    }, []);

    useEffect(() => {
        function onScroll() {
            //많이 쓰는 세 가지
            // scrollY: 얼마나 내렸는 지
            // clientHeight: 화면 보이는 길이
            // scrollHeight: 총 길이
            // 따라서 끝까지 내렸을 때
            // scrollY + clientHeight=scrollHeight!!

            console.log(
                window.scrollY,
                document.documentElement.clientHeight,
                window.innerHeight,
                document.documentElement.scrollHeight
            );

            if (
                window.scrollY + window.innerHeight >
                document.documentElement.scrollHeight - 50
            ) {
                if (hasMorePosts && !listPostLoading && mainPosts) {
                    dispatch({
                        type: LIST_POST_REQUEST,
                        data: {
                            lastPostId: mainPosts[mainPosts.length - 1].id,
                            size: SIZE,
                        },
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        window.addEventListener('touchmove',onScroll);
        
        //useEffect에서 window함수 쓸 때 중요한 건
        //이렇게 해제해주는 것
        //메모리 누수 방지
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('touchmove', onScroll);
        };
    }, [mainPosts, hasMorePosts, listPostLoading]);

    return (
        <>
            <PostListContainer />
        </>
    );
};

export default PostList;
