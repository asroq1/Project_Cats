import product, { produce } from 'immer';

export const initialState = {
    addWeightLoading: false,
    addWeightDone: false,
    addWeightError: null,
    deleteWeightLoading: false,
    deleteWeightDone: false,
    deleteWeightError: null,

    getWeightLoading: false,
    getWeightDone: false,
    getWeighError: null,

    catWeight: null,
    user: {
        isLoggedIn: true,
        user: 1,
    },
    cat: [
        {
            cat_id: 0,
            user_id: 1,
            name: 'Garfield',
            gender: 'M',
            Photo: {
                file: '',
                url:
                    'https://welovekitties.com/wp-content/uploads/2015/12/cutekittenspictures-145124821648lcp.jpg',
            },
            birth: '2020-02-28',
            Record: [
                {
                    cdt: '2021-03-30',
                    wgt: 3.1,
                },
            ],
        },
    ],
    isLoading: true,
    currentIndex: 1,
    currImgUrl: null,
};

// 몸무게 관련
export const ADD_WEIGHT_REQUEST = 'ADD_WEIGHT_REQUEST';
export const ADD_WEIGHT_SUCCESS = 'ADD_WEIGHT_SUCCESS';
export const ADD_WEIGHT_FAILURE = 'ADD_WEIGHT_FAILURE';

export const DELETE_WEIGHT_REQUEST = 'DELETE_WEIGHT_REQUEST';
export const DELETE_WEIGHT_SUCCESS = 'DELETE_WEIGHT_SUCCESS';
export const DELETE_WEIGHT_FAILURE = 'DELETE_WEIGHT_FAILURE';
//
// 논의할 부분
export const GET_CAT_REQUEST = 'GET_CAT_REQUEST';
export const GET_CAT_SUCCESS = 'GET_CAT_SUCCESS';
export const GET_CAT_FAILURE = 'GET_CAT_FAILURE';
// 로그인 때 해당 유저의 모든 정보를 불러와 계속 써도 됨

export const ADD_CAT_REQUEST = 'ADD_CAT_REQUEST';
export const ADD_CAT_SUCCESS = 'ADD_CAT_SUCCESS';
export const ADD_CAT_FAILURE = 'ADD_CAT_FAILURE';

export const DELETE_CAT_REQUEST = 'DELETE_CAT_REQUEST';
export const DELETE_CAT_SUCCESS = 'DELETE_CAT_SUCCESS';
export const DELETE_CAT_FAILURE = 'DELETE_CAT_FAILURE';

export const UPDATE_CAT_REQUEST = 'UPDATE_CAT_REQUEST';
export const UPDATE_CAT_SUCCESS = 'UPDATE_CAT_SUCCESS';
export const UPDATE_CAT_FAILURE = 'UPDATE_CAT_FAILURE';

export const SET_CURRENT_CAT = 'SET_CURRENT_CAT';

export const SET_CURRENT_IMAGE = 'SET_CURRENT_IMAGE';

export const GET_WEIGHT_REQUEST = 'GET_WEIGHT_REQUEST';
export const GET_WEIGHT_SUCCESS = 'GET_WEIGHT_SUCCESS';
export const GET_WEIGHT_FAILURE = 'GET_WEIGHT_FAILURE';

export const getCatRequestAction = (data) => ({
    type: GET_CAT_REQUEST,
    data,
});

export const getCatSuccessAction = (data) => ({
    type: GET_CAT_SUCCESS,
    data,
});
export const getCatFailureAction = (data) => ({
    type: GET_CAT_FAILURE,
    data,
});

export const addCatRequestAction = (data) => ({
    type: ADD_CAT_REQUEST,
    data,
});
export const addCatSuccessAction = (data) => ({
    type: ADD_CAT_SUCCESS,
    data,
});
export const addCatFailureAction = (data) => ({
    type: ADD_CAT_FAILURE,
    data,
});
export const deleteCatRequestAction = (data) => ({
    type: DELETE_CAT_REQUEST,
    data,
});
export const deleteCatSuccessAction = (data) => ({
    type: DELETE_CAT_SUCCESS,
    data,
});
export const deleteCatFailureAction = (data) => ({
    type: DELETE_CAT_FAILURE,
    data,
});
export const updateCatRequestAction = (data) => ({
    type: UPDATE_CAT_REQUEST,
    data,
});
export const updateCatSuccessAction = (data) => ({
    type: UPDATE_CAT_SUCCESS,
    data,
});
export const updateCatFailureAction = (data) => ({
    type: UPDATE_CAT_FAILURE,
    data,
});
export const addWeightRequestAction = (data) => {
    return {
        type: ADD_WEIGHT_REQUEST,
        data,
    };
};
export const addWeightSuccessAction = (data) => {
    return {
        type: ADD_WEIGHT_SUCCESS,
        data,
    };
};
export const addWeightFailureAction = (data) => {
    return {
        type: ADD_WEIGHT_FAILURE,
        data,
    };
};

export const deleteWeightRequestAction = (data) => {
    return {
        type: DELETE_WEIGHT_REQUEST,
        data,
    };
};

export const deleteWeightSuccessAction = (data) => {
    return {
        type: DELETE_WEIGHT_SUCCESS,
        data,
    };
};

export const deleteWeightFailureAction = (data) => {
    return {
        type: DELETE_WEIGHT_FAILURE,
        data,
    };
};

export const setCurrentCat = (data) => {
    return {
        type: SET_CURRENT_CAT,
        data,
    };
};

export const setCurrentImage = (data) => {
    return {
        type: SET_CURRENT_IMAGE,
        data,
    };
};

export const getWeightRequest = (data) => {
    return {
        type: GET_WEIGHT_REQUEST,
        data,
    };
};
export const getWeightSuccess = (data) => {
    return {
        type: GET_WEIGHT_SUCCESS,
        data,
    };
};
export const getWeightFailure = (data) => {
    return {
        type: GET_WEIGHT_FAILURE,
        data,
    };
};
// 리듀서는
// 이전 상태를 액션을 통해 다음 상태로 만드는 함수
// 단 불변성은 지켜야 함
// 'draft'를 state로 생각하면 됨
const reducer = (state = initialState, action) => {
    // state는 가만히 두고
    // draft이용해 상태 바꿈 (state를 모두 draft로 대체)
    // immer가 알아서 불변성 지키며 바꿔줌
    return produce(state, (draft) => {
        switch (action.type) {
            case GET_CAT_REQUEST:
                draft.isLoading = true;
                break;
            case GET_CAT_SUCCESS:
                draft.cat = draft.cat;
                draft.isLoading = false;
                break;
            case GET_CAT_FAILURE:
                break;
            case ADD_CAT_REQUEST:
                break;
            case ADD_CAT_SUCCESS:
                draft.cat = draft.cat.concat(action.data);
                break;
            case ADD_CAT_FAILURE:
                break;
            case DELETE_CAT_REQUEST:
                break;
            case DELETE_CAT_SUCCESS:
                draft.cat = draft.cat.filter((v) => v.id !== action.data);
                break;
            case DELETE_CAT_FAILURE:
                break;
            case UPDATE_CAT_REQUEST:
                break;
            case UPDATE_CAT_SUCCESS:
                draft.cat[draft.currentIndex - 1] = action.data;
                break;
            case UPDATE_CAT_FAILURE:
                break;
            case ADD_WEIGHT_REQUEST:
                draft.addWeightLoading = true;
                draft.addWeightDone = false;
                draft.addWeightError = null;
                break;
            case ADD_WEIGHT_SUCCESS:
                draft.addWeightLoading = false;
                draft.addWeightDone = true;
                draft.cat.Record.wgt.concat(action.data);
                break;
            case ADD_WEIGHT_FAILURE:
                draft.addWeightLoading = false;
                draft.addWeightDone = false;
                draft.addWeightError = null;
                break;
            case DELETE_WEIGHT_REQUEST:
                draft.deleteWeightDone = false;
                draft.deleteWeightLoading = true;
                draft.deleteWeightError = null;
                // draft.draft.cat = draft.cat.filter((v) => v.id !== action.data);
                break;
            case DELETE_WEIGHT_SUCCESS:
                draft.deleteWeightDone = true;
                draft.deleteWeightLoading = false;
                draft.cat.Record.wgt.filter((v) => v.id !== action.data);
                break;
            case DELETE_WEIGHT_FAILURE:
                draft.deleteWeightLoading = false;
                draft.deleteWeightDone = false;
                draft.deleteWeightError = null;
                break;
            case SET_CURRENT_CAT:
                draft.currentIndex = action.data;
                break;
            case SET_CURRENT_IMAGE:
                draft.currImgUrl = action.data;
                break;
            case GET_WEIGHT_REQUEST:
                draft.isLoading = true;
                break;
            // case GET_WEIGHT_SUCCESS:
            //     draft.isLoading - false;
            //     draft.cat = action.data;
            //     break;
            case GET_WEIGHT_FAILURE:
                break;
            default:
                break;
        }
    });
};

export default reducer;
