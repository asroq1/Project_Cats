import { all, call, fork, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
    GET_CAT_REQUEST,
    GET_CAT_SUCCESS,
    GET_CAT_FAILURE,
    ADD_CAT_REQUEST,
    ADD_CAT_SUCCESS,
    ADD_CAT_FAILURE,
    DELETE_CAT_REQUEST,
    DELETE_CAT_SUCCESS,
    DELETE_CAT_FAILURE,
    UPDATE_CAT_REQUEST,
    UPDATE_CAT_SUCCESS,
    UPDATE_CAT_FAILURE,
    ADD_WEIGHT_REQUEST,
    ADD_WEIGHT_SUCCESS,
    ADD_WEIGHT_FAILURE,
} from '../reducers/cat';

// 해당 유저의 모든 고양이 정보 받아오기
// 이 부분은 논의할 것 - 로그인할 때 그냥 다 불러와도 됨
function getCatAPI(data) {
    return axios.get(`http://localhost:8080/api/cats`);
}

function* getCat(action) {
    try {
        // call은 비동기 호출, fork는 동기 호출

        // Call 사용 시 Promise를 반환하는 함수 호출하고 기다릴 수 있음
        // 첫 번쨰 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수
        const result = yield call(getCatAPI, action.data);
        yield put({
            type: GET_CAT_SUCCESS,
            //data: result.data,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: GET_CAT_FAILURE,
            data: err,
        });
    }
}

// 해당 유저에게
// 새로운 고양이 정보 추가
function addCatAPI(data) {
    return axios.post('/api/cats', data);
}

function* addCat(action) {
    try {
        
        const result = yield call(addCatAPI, action.data);
        yield put({
            type: ADD_CAT_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: ADD_CAT_FAILURE,
            data: err.response.data,
        });
    }
}

function deleteCatAPI(data) {
    return axios.delete('/api/cats/{id}', data);
}

function* deleteCat(action) {
    try {
        //const result = yield call(deleteCatAPI, action.data);
        yield put({
            type: DELETE_CAT_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: DELETE_CAT_FAILURE,
            data: err.response.data,
        });
    }
}

function updateCatAPI(data) {
    return axios.patch('/api/cat', data);
}

function* updateCat(action) {
    try {
        const result = yield call(updateCatAPI, action.data);
        yield put({
            type: UPDATE_CAT_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: UPDATE_CAT_FAILURE,
            data: err.response.data,
        });
    }
}

function addCatWeightAPI(data) {
    return axios.post('http://localhost:8080/api/records', data);
}
function* addWeight(action) {
    try {
        const result = yield call(addCatWeightAPI, action.data);
        yield put({
            type: ADD_WEIGHT_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: ADD_WEIGHT_FAILURE,
            error: err,
        });
    }
}

function* watchgetCat() {
    yield takeLatest(GET_CAT_REQUEST, getCat);
}

function* watchaddCat() {
    yield takeLatest(ADD_CAT_REQUEST, addCat);
}

function* watchdeleteCat() {
    yield takeLatest(DELETE_CAT_REQUEST, deleteCat);
}

function* watchupdateCat() {
    yield takeLatest(UPDATE_CAT_REQUEST, updateCat);
}

function* watchAddWeight() {
    yield takeLatest(ADD_WEIGHT_REQUEST, addWeight);
}
export default function* catSaga() {
    yield all([
        fork(watchgetCat),
        fork(watchaddCat),
        fork(watchdeleteCat),
        fork(watchupdateCat),
        fork(watchAddWeight),
    ]);
}
