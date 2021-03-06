import { produce } from 'immer';

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

    addCatLoading: false,
    addCatDone: false,
    addCatError: null,

    deleteCatLoading: false,
    deleteCatDone: false,
    deleteCatError: null,

    updateCatLoading: false,
    updateCatDone: false,
    updateCatError: null,

    catWeight: null,

    cat: [
        // {
        //     cat_id: 0,
        //     user_id: 1,
        //     name: 'Garfield',
        //     gender: 'M',
        //     Photo: {
        //         file: '',
        //         url:
        //             'https://welovekitties.com/wp-content/uploads/2015/12/cutekittenspictures-145124821648lcp.jpg',
        //     },
        //     birth: '2020-02-28',
        //     Record: [
        //         {
        //             cdt: '2021-03-30',
        //             wgt: 3.1,
        //         },
        //     ],
        // },
    ],
    isLoading: false,
    currentWeightIndex: 1,
    currentIndex: -1,
    currImgUrl: null,
    currentCatWeights: [],
};

// 몸무게 관련
export const ADD_WEIGHT_REQUEST = 'ADD_WEIGHT_REQUEST';
export const ADD_WEIGHT_SUCCESS = 'ADD_WEIGHT_SUCCESS';
export const ADD_WEIGHT_FAILURE = 'ADD_WEIGHT_FAILURE';

export const DELETE_WEIGHT_REQUEST = 'DELETE_WEIGHT_REQUEST';
export const DELETE_WEIGHT_SUCCESS = 'DELETE_WEIGHT_SUCCESS';
export const DELETE_WEIGHT_FAILURE = 'DELETE_WEIGHT_FAILURE';

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
const reducer = (state = initialState, action) =>
    // state는 가만히 두고
    // draft이용해 상태 바꿈 (state를 모두 draft로 대체)
    // immer가 알아서 불변성 지키며 바꿔줌
    produce(state, (draft) => {
        switch (action.type) {
            case GET_CAT_REQUEST:
                draft.isLoading = true;
                draft.currentIndex = -1;
                break;
            case GET_CAT_SUCCESS:
                draft.cat = action.data;
                draft.currentIndex =
                    draft.currentIndex === -1
                        ? action.data[0].id
                        : draft.currentIndex;
                draft.addCatDone = false;
                draft.updateCatDone = false;

                draft.deleteCatDone = false;
                draft.isLoading = false;
                break;
            case GET_CAT_FAILURE:
                draft.isLoading = false;
                break;
            case ADD_CAT_REQUEST:
                draft.addCatLoading = true;
                draft.addCatDone = false;
                draft.addCatError = null;
                break;
            case ADD_CAT_SUCCESS:
                draft.addCatLoading = false;
                draft.cat = draft.cat.concat(action.data);
                draft.addCatDone = true;
                break;
            case ADD_CAT_FAILURE:
                draft.addCatLoading = false;
                draft.addCatError = action.data;
                break;
            case DELETE_CAT_REQUEST:
                draft.deleteCatLoading = true;
                draft.deleteCatDone = false;
                draft.deleteCatError = null;
                break;
            case DELETE_CAT_SUCCESS:
                draft.cat = draft.cat.filter((v) => v.id !== action.data);
                draft.currentIndex = draft.cat[0].id;
                draft.deleteCatLoading = false;
                draft.deleteCatDone = true;
                break;
            case DELETE_CAT_FAILURE:
                draft.deleteCatLoading = false;
                draft.deleteCatError = action.data;
                break;
            case UPDATE_CAT_REQUEST:
                draft.updateCatLoading = true;
                draft.updateCatDone = false;
                draft.updateCatError = null;
                break;
            case UPDATE_CAT_SUCCESS:
                draft.updateCatDone = true;
                break;
            case UPDATE_CAT_FAILURE:
                draft.updateCatError = action.data;
                break;
            case ADD_WEIGHT_REQUEST:
                draft.addWeightLoading = true;
                draft.addWeightDone = false;
                draft.addWeightError = null;
                break;
            case ADD_WEIGHT_SUCCESS:
                draft.addWeightLoading = false;
                draft.addWeightDone = true;
                break;
            case ADD_WEIGHT_FAILURE:
                draft.addWeightLoading = false;
                draft.addWeightDone = false;
                draft.addWeightError = action.error;
                break;
            case DELETE_WEIGHT_REQUEST:
                draft.deleteWeightDone = false;
                draft.deleteWeightLoading = true;
                draft.deleteWeightError = null;
                break;
            case DELETE_WEIGHT_SUCCESS:
                draft.deleteWeightDone = true;
                draft.deleteWeightLoading = false;
                draft.currentCatWeights.filter((v) => v.id !== action.data);
                break;
            case DELETE_WEIGHT_FAILURE:
                draft.deleteWeightLoading = false;
                draft.deleteWeightDone = false;
                draft.deleteWeightError = action.error;
                break;
            case SET_CURRENT_CAT:
                draft.currentIndex = action.data;
                break;
            case SET_CURRENT_IMAGE:
                draft.currImgUrl = action.data;
                break;
            case GET_WEIGHT_REQUEST:
                draft.getWeightLoading = true;
                draft.getWeightDone = false;
                draft.addWeightError = null;
                draft.currentCatWeights = [];
                break;
            case GET_WEIGHT_SUCCESS:
                draft.getWeightDone = true;
                draft.getWeightLoading = false;
                draft.getWeightError = null;
                draft.currentCatWeights = action.data;
                break;
            case GET_WEIGHT_FAILURE:
                draft.getWeightLoading = false;
                draft.getWeightDone = false;
                draft.getWeightError = action.error;
                break;
            default:
                break;
        }
    });

export default reducer;
