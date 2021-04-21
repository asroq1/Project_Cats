import {
    all,
    call,
    fork,
    takeLatest,
    put,
    getContext,
    delay,
} from 'redux-saga/effects';
import axios from 'axios';
import { useHistory } from 'react-router';
import jwt from 'jsonwebtoken';

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
    SET_CURRENT_USER,
    RESET_CURRENT_USER,
    } from '../reducers/user';
import { GET_CAT_REQUEST } from '../reducers/cat';

function logInAPI(data) {
    return axios
        // CORS 문제 해결에 따라 줄 변경
        //.post('/user/login', data)
        .post('http://localhost:8080/api/authenticate', data)
        .then((res) => {
            const { accessToken } = res.data;
            axios.defaults.headers.common[
                'Authorization' 
            ] = `Bearer${accessToken}`;

            // 현재 유저 아이디만 로컬 스토리지에 저장
            const {id} = jwt.decode(accessToken);
            //CORS 문제 해결에 따라 아래 두 줄 중 하나 사용
            localStorage.setItem('currentUser', id);
            //localStorage.setItem('currentUser', 1);
        })
        // 이 부분 작동 x -> 알아볼 것
        //.then(useHistory.push('/main'));
}

function* logIn(action) {
    try {
        // 백엔드 연동하면 넣을 코드
        console.log(action.data);
        const result = yield call(logInAPI, action.data);
        yield delay(1000); // 백엔드 연동 안 됐기 때문에 딜레이하는 거 가짜로 표현하기 위함
        yield all([
            put({
                type: LOG_IN_SUCCESS,
                data: action.data, 
                // data: result.data
            }),
            put({
                type: SET_CURRENT_USER,
                data: localStorage.currentUser,
            }),
            put({
                type: GET_CAT_REQUEST,
                data: localStorage.currentUser
            })
        ])
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err
        });
    }
}

function logOutAPI() {
    return axios.post('/api/logout').then(localStorage.removeItem('currentUser'));
}

function* logOut() {
    try {
        const result = yield call(logOutAPI);
        yield delay(1000);
        yield all([
            put({
                type: LOG_OUT_SUCCESS,
                data: result.data,
            })
        ])
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        });
    }
}

function signUpAPI() {
    return axios.post('/user/signup');
}

function* signUp() {
    try {
        const result = yield call(signUpAPI);
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}

// signup 후 login된 상태로 홈페이지에 가기 위함
function* goToHome() {
    const history = yield getContext('history');
    history.push('/');
}

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
