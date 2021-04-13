import React from 'react';

import PostListContainer from '../components/board/PostListContainer';
import palette from '../styles/palette';

const postList = () => {
    // const dispatch = useDispatch();
    // const onLike = useCallback(() => {
        
    //     return dispatch({
    //         type: LIKE_POST_REQUEST,
    //         data: post.id,
    //     })
    // }, [id]);



    // const onUnlike = useCallback(() => {

        
        
    //     return dispatch({
    //         type: UNLIKE_POST_REQUEST,
    //         data: post.id
    //     });
    // }, [id]);
    return (
        <>
        <PostListContainer/>
    </>
    )
}

export default postList;