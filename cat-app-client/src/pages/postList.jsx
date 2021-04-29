import React, {useDispatch, useEffect} from 'react';
import {useSelector} from 'react-redux';

import PostListContainer from '../components/board/PostListContainer';

import {LIST_POST_REQUEST}from '../reducers/post';

const PostList = () => {
    const dispatch = useDispatch();
    const {mainPosts,hasMorePosts,loadPostLoading} = useSelector((state) => state.post);
    
    useEffect(() => {
        dispatch({
            type: LIST_POST_REQUEST,
        })
    }, []);

    // useEffect(() => {
    //     function onScroll(){
    //         //많이 쓰는 세 가지
    //         // scrollY: 얼마나 내렸는 지
    //         // clientHeight: 화면 보이는 길이
    //         // scrollHeight: 총 길이
    //         // 따라서 끝까지 내렸을 때
    //         // scrollY + clientHeight=scrollHeight!!
            
    //         console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
        
    //         if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight  -300) {
    //             if (hasMorePost && !loadPostLoading){
    //                 dispatch({
    //                     type: LIST_POST_REQUEST,
    //                 });
    //             }
    //         }
    //     }
    //     window.addEventListener('scroll', onScroll);
    //     //useEffect에서 window함수 쓸 때 중요한 건
    //     //이렇게 해제해주는 것
    //     //메모리 누수 방지
    //     return() => {
    //         window.removeEventListener('scroll', onScroll);
    //     };
    // },  [hasMorePosts, loadPostLoading]);

    return (
        <>
        <PostListContainer/>
    </>
    )
}

export default PostList;
