import axios from 'axios';
import {all, fork, takeLatetest, put, takeLatest, call} from 'redux-saga/effects'
import shortId from 'shortid';

import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS,ADD_POST_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    READ_POST_REQUEST, READ_POST_SUCCESS, READ_POST_FAILURE,
    LIST_POST_REQUEST,LIST_POST_SUCCESS, LIST_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from '../reducers/post';

function addPostAPI(data){
    return axios.post('/api/post', data)
}

function* addPost(action){
    try{
        //const result = yield call(addPostAPI,action.data);
        const id = shortId.generate();
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id,
                content: action.data
            }
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

function removePostAPI(data){
    return axios.delete('/api/post', data);
}

function* removePost(action){
    try {
        //const result = yield call(addPostAPI, action.data);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data, //여기에 id 포함
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
    return axios.post(`/api/comment?content=${data.content}&postId=${data.id}`);
}


function* addComment(action){
    try {
        const result= yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
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
        fork(watchListPost),
        fork(watchAddComment),
    ]);
}