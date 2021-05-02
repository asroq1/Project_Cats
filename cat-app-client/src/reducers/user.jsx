import produce from 'immer';

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
    token: null,
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

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

//백엔드 연동 전
//더미데이터

//액션 함수
export const loginRequestAction = (data) => {
    console.log('로그인 시도 (액션함수)');
    return {
        type: LOG_IN_REQUEST,
        data,
    };
};

export const loginSuccessAction = (data) => {
    console.log('login request act :', data);
    return {
        type: LOG_IN_SUCCESS,
        data,

        // onUser: dummyUser(),
    };
};

export const loginFailureAction = (data) => {
    console.log('로그인 실패 (액션함수)');
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
    return {
        type: SIGN_UP_REQUEST,
        data,
        // type: 'normal',
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

// export const getUserRequest = () => {
//     return {
//         type: GET_USER_REQUEST,
//     };
// };

//Reducer
// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성 유지)

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInDone = false;
                draft.logInError = null;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.logInDone = true;
                draft.me = action.data;
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInDone = false;
                draft.logInError = action.error;
                break;

            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutDone = false;
                draft.logOutError = null;
                break;

            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.logInDone = false;
                draft.me = action.data;
                break;

            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;

            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpDone = false;
                draft.signUpError = null;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpDone = true;
                draft.me = action.data;
                break;

            case SIGN_UP_FAILURE:
                draft.signUpLoading = false;
                draft.signUpDone = false;
                draft.signUpError = action.error;
                break;

            case GET_USER_REQUEST:
                break;
            case GET_USER_SUCCESS:
                draft.me = action.data;
                break;

            case GET_USER_FAILURE:
                break;

            default:
                return state;
        }
    });

export default reducer;
