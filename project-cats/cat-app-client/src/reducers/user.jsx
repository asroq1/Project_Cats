import produce from 'immer';
import axios from 'axios';

export const initialState = {
    logInLoading: false, //로그인 시도중
    logInDone: false, //로그인 완료
    logInError: null, //로그인 에러
    logOutLoading: false, //로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, //회원가입 시도중
    signUpDone: false,
    signUpError: null,

    me: null,
    signUpData: {},
    loginData: {},
};

// 기본적인 액션 이름들
// 'LOG_IN_REQUEST'처럼 문자열로 그 때 그 때 넣어줘도 되지만,
// 오타로 인해 오는 에러를 줄이기 위해 상수로 정해놓으면 편하다
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

//백엔드 연동 전
//더미데이터
const dummyUser = (data) => ({
    ...data,
    id: 1, //필요한 건지 확인해볼게요
    user_id: 'dummy user',
    name: 'dummy user',
    email: 'abc@gmail.com',
    pwd: 'aaa',
    login_type: '', //추가
});

//액션 함수
export const loginRequestAction = (data) => {
    console.log('로그인 츄라이');
    return {
        type: LOG_IN_REQUEST,
        data,
    };
};

export const loginSuccessAction = (data) => {
    console.log('로그인 성공');
    return {
        type: LOG_IN_SUCCESS,
        data,
    };
};

export const loginFailureAction = (data) => {
    return {
        type: LOG_IN_FAILURE,
        data,
    };
};

export const logoutRequestAction = () => {
    return {
        type: LOG_OUT_REQUEST,
    };
};

export const logoutSuccessAction = () => {
    return {
        type: LOG_OUT_SUCCESS,
    };
};

export const logoutFailureAction = (data) => {
    return {
        type: LOG_OUT_FAILURE,
        data,
    };
};
//회원가입 액션 함수
export const signUpRequest = (data) => {
    //axios로 회원가입 요청
    const request = axios
        .post('<root>', data)
        .then((response) => response.data);
    console.log('트라이');

    return {
        type: SIGN_UP_REQUEST,
        data: request,
    };
};
export const signUpSuccess = (data) => {
    return {
        type: SIGN_UP_SUCCESS,
        data,
    };
};
export const signUpFailure = (data) => {
    console.log('실패');
    return {
        type: SIGN_UP_FAILURE,
        data,
    };
};

//Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            return {
                ...state,
                logInLoading: true,
                logInDone: false,
                logInError: null,
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                logInLoading: false,
                logInDone: true,
                me: dummyUser(action.data),
            };
        case LOG_IN_FAILURE:
            return {
                ...state,
                logInLoading: false,
                logInDone: false,
                logInError: action.error,
            };
        case LOG_OUT_REQUEST:
            return {
                ...state,
                logOutLoading: true,
                logOutDone: false,
                logOutError: null,
            };
        case LOG_OUT_SUCCESS:
            return {
                ...state,
                logOutLoading: false,
                logInDone: false,
                me: dummyUser(action.data),
            };

        case LOG_OUT_FAILURE:
            return {
                ...state,
                logOutLoading: false,
                logOutError: action.error,
            };
        case SIGN_UP_REQUEST:
            return {
                ...state,
                signUpLoading: true,
                signUpDone: false,
                signUpError: null,
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpLoading: false,
                signUpDone: true,
                me: dummyUser(action.data),
            };

        case SIGN_UP_FAILURE:
            return {
                ...state,
                signUpLoading: false,
                signUpDone: false,
                signUpError: action.error,
            };
        default:
            return state;
    }
};

export default reducer;
