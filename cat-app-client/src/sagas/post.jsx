import axios from 'axios';
import {all, fork, takeLatetest, put, takeLatest, call} from 'redux-saga/effects'
import shortId from 'shortid';

import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS,ADD_POST_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    READ_POST_REQUEST, READ_POST_SUCCESS, READ_POST_FAILURE,
    UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS,UPDATE_POST_FAILURE,
    LIST_POST_REQUEST,LIST_POST_SUCCESS, LIST_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
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

    return axios.delete(`api/posts/{id}?id=${id}`);
}

function* removePost(action){
    try {
        
        const result = yield call(removePostAPI, action.data);
        console.log(result)
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

function updatePostAPI(id){
    return axios.patch(`/api/posts/${id}`);
}

function* updatePost(action){
    try {
        const result = yield call(updatePostAPI,action.data);
        yield put({
            type: UPDATE_POST_SUCCESS,
            data: result.data
        })
    } catch(err){
        yield put({
            type: UPDATE_POST_FAILURE,
            data: err.response.data,
        })
    }
}

function listPostAPI(){
    return axios.get("/api/posts");
}

function* listPost(action){
    try {
        const result= yield call(listPostAPI);
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
    
    return axios.post(`/api/comment?content=${data.content}&postId=${data.postId}`);
}


function* addComment(action){
    try {
        //console.log(`/api/comment?content=${action.data.content}&postId=${action.data.postId}`)
        const result= yield call(addCommentAPI, action.data);

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

export default function* postSaga(){
    yield all([
        fork(watchAddPost),   
        fork(watchRemovePost),
        fork(watchReadPost),
        fork(watchUpdatePost),
        fork(watchListPost),
        fork(watchAddComment),
    ]);
}