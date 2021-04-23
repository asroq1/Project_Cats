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
    } from '../reducers/user';

function signUpAPI() {
    return axios.post('http://localhost:8080/api/signup');
}

function* signUp(action) {
    try {
        console.log('SAGA SIGN UP');
        const result = yield call(signUpAPI);
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
function logInAPI(data) {
    return axios
        // CORS 문제 해결에 따라 줄 변경
        //.post('/user/login', data)
        .post('http://localhost:8080/api/authenticate', data)
        .then((res) => {
            console.log(res.data);
            const { token } = res.data;
            axios.defaults.headers.common[
                'Authorization' 
            ] = `Bearer${token}`;

            // 현재 유저 아이디만 로컬 스토리지에 저장
            const {id} = jwt.decode(token);
            //CORS 문제 해결에 따라 아래 두 줄 중 하나 사용
            localStorage.setItem('currentUser', id);
            //localStorage.setItem('currentUser', 1);
        })
        // 이 부분 작동 x -> 알아볼 것
        //.then(useHistory.push('/main'));
}
// 2 call은 동기 await역할 fork는 비동기
function* logIn(action) {
    try {
        console.log('SAGA LOGIN');
        //const result = yield call(logInAPI, action.data);
        localStorage.setItem('currentUser', 1);
        yield put({
            type: LOG_IN_SUCCESS,
            //로그인 구현 되면 data: result.data로 변경할 것
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
