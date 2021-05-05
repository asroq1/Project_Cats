import axios from 'axios';
import {all, fork, takeLatetest, put, takeLatest, call} from 'redux-saga/effects'
//import shortId from 'shortid';

import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS,ADD_POST_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    READ_POST_REQUEST, READ_POST_SUCCESS, READ_POST_FAILURE,
    UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS,UPDATE_POST_FAILURE,
    LIST_POST_REQUEST,LIST_POST_SUCCESS, LIST_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    REMOVE_COMMENT_REQUEST, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_FAILURE,
    GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE,
} from '../reducers/post';

function addPostAPI(data){
    return axios.post('/api/posts', data)
}

function* addPost(action){
    try{
        const result = yield call(addPostAPI,action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            // data: result.data  // API에서 아무 것도 반환되지 않음
        });
        // yield put({
        //     type: ADD_POST_TO_ME,
        //     data: id,
        //     // userid
        // });
    } catch(err){
        yield put ({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        })
    }
}

function removePostAPI(id){
    return axios.delete(`api/posts/${id}`);
}

function* removePost(action){
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
            type: REMOVE_POST_SUCCESS,
            //data: action.data, 
        })
        // yield put({
        //     type: REMOVE_POST_FROM_ME,
        //     data: action.data
        // });
    } catch(err){
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function readPostAPI(id){
    return axios.get(`/api/posts/${id}`);
}

function* readPost(action){
    try {
        const result = yield call(readPostAPI,action.data);
        yield put({
            type: READ_POST_SUCCESS,
            data: result.data
        })
    } catch(err){
        yield put({
            type: READ_POST_FAILURE,
            data: err.response.data,
        })
    }
}

function updatePostAPI(data){
    return axios.patch('/api/posts/', data);
}

function* updatePost(action){
    try {
        const result = yield call(updatePostAPI,action.data);
        yield put({
            type: UPDATE_POST_SUCCESS,
            data: action.data
        })
    } catch(err){
        yield put({
            type: UPDATE_POST_FAILURE,
            data: err.response.data,
        })
    }
}

function listPostAPI(data){
    return axios.get(`/api/posts?lastPostId=${data.lastPostId}&size=${data.size}`);
    //posts?lastPostId=7&size=10
}

function* listPost(action){
    try {
        const result= yield call(listPostAPI, action.data);
        yield put({
            type: LIST_POST_SUCCESS,
            data: result.data,
        }) 
    } catch(err){
        yield put({
            type: LIST_POST_FAILURE,
            data: err.response.data,
        })
    }
}

function addCommentAPI(data){
    // return axios.post(`/api/comments?content=${data.content}&postId=${data.postId}`);
    return axios.post('/api/comments', data);
}

function* addComment(action){
    try {
        //console.log(`/api/comments?content=${action.data.content}&postId=${action.data.postId}`)
        const result= yield call(addCommentAPI, action.data); // No data returned

        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
        })
    } catch(err){
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        })
    }
}

function removeCommentAPI(id){
    return axios.delete(`/api/comments/${id}`);
}

function* removeComment(action){
    try {
        const result= yield call(removeCommentAPI, action.data);
        console.log(result);

        yield put({
            type: REMOVE_COMMENT_SUCCESS,
            data: action.data
        })
    } catch(err){
        yield put({
            type: REMOVE_COMMENT_FAILURE,
            data: err.response.data
        })
    }
};

function getPostCommentsAPI(postId){
    return axios.get(`/api/comments/${postId}`);
}

function* getPostComments(action){
    try {
        const result= yield call(getPostCommentsAPI, action.data);
        console.log(result);

        yield put({
            type: GET_COMMENTS_SUCCESS,
            data: result.data
        })
    } catch(err){
        yield put({      
            type: GET_COMMENTS_FAILURE,
            data: err.response.data
        })
    }
};
 
function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST,removePost);
}

function* watchReadPost(){
    yield takeLatest(READ_POST_REQUEST, readPost);
}

function* watchUpdatePost(){
    yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}

function* watchListPost(){
    yield takeLatest(LIST_POST_REQUEST, listPost);
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST,addComment);
}

function* watchGetComments(){
    yield takeLatest(GET_COMMENTS_REQUEST, getPostComments);
}

function* watchRemoveComment(){
    yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),   
        fork(watchRemovePost),
        fork(watchReadPost),
        fork(watchUpdatePost),
        fork(watchListPost),
        fork(watchAddComment),
        fork(watchRemoveComment),
        fork(watchGetComments)
    ]);
}