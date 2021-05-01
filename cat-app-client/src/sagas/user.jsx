import {
    all,
    call,
    fork,
    takeLatest,
    put,
    getContext,
    delay,
} from 'redux-saga/effects';

import {
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
} from '../reducers/user';

import axios from 'axios';
import jwt from 'jsonwebtoken';

function signUpAPI(data) {
    return axios.post('/api/signup', data);
}

function* signUp(action) {
    try {
        console.log('SAGA SIGN UP', action);
        const result = yield call(signUpAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log('SAGA SIGN UP ERR', err);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err,
        });
    }
}

function logInAPI(data) {
    return axios.post('/api/login', data);
}
// 2 call은 동기 await역할 fork는 비동기
function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        axios.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${result.data.token}`;
        yield put({
            type: LOG_IN_SUCCESS,
            data: {
                data: result.data,
            },
        });
    } catch (err) {
        console.log('사가 로그인 에러', err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err,
        });
    }
}

function logOutAPI() {
    return axios
        .post('/api/logout')
        .then(localStorage.removeItem('currentUser'));
}

function* logOut() {
    try {
        const result = yield call(logOutAPI);
        yield delay(1000);
        yield all([
            put({
                type: LOG_OUT_SUCCESS,
                data: result.data,
            }),
        ]);
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        });
    }
}

// signup 후 login된 상태로 홈페이지에 가기 위함
function* goToHome() {
    const history = yield getContext('history');
    history.push('/');
}

//1.계속 감시하고 있다가 해당하는 Action이 발생하면 기다리고 있다가 얘가 실행된다. 2번째 인자의 함수가 실행.
function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all(
        [fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)],
        fork(goToHome)
    );
}
