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

function signUpAPI() {
    return axios.post('http://localhost:8080/api/signup');
}

function* signUp(action) {
    try {
        console.log('SAGA SIGN UP');
        // const result = yield call(signUpAPI);
        console.log('Res data :', action.data);
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        console.log('SAGA SIGN UP ERR', err);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err,
        });
    }
}

// 3
// function logInAPI(data) {
//     //로컬스토리지에 엑세스 토큰 저장
//     return axios.post('/api/authenticate', data).then((res) => {
//         const { accessToken } = res.data;
//         axios.defaults.headers.common['Authorization'] = `Bearer${accessToken}`;
//         localStorage.setItem('jwtToken', accessToken);
//         console.log('jwt토큰', accessToken);
//     });
// }
// 2 call은 동기 await역할 fork는 비동기
function* logIn(action) {
    try {
        console.log('SAGA LOGIN');
        // const result = yield call(logInAPI, action.data);
        const { accessToken } = action.data;
        axios.defaults.headers.common['Authorization'] = `Bearer${accessToken}`;
        localStorage.setItem('jwtToken', accessToken);
        console.log('jwt토큰', accessToken);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        console.log('SAGA LOGIN ERR', err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err,
        });
    }
}

function logOutAPI() {
    return axios.post('/api/logout');
}

function* logOut() {
    try {
        const result = yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
            data: result.data,
        });
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
