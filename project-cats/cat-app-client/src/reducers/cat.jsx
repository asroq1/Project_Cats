import product, { produce } from 'immer';

export const initialState = {
    user: {
        isLoggedIn: true,
        user: 1,
    },
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
        // {
        //     cat_id: 1,
        //     user_id: 1,
        //     name: 'meme',
        //     gender: 'F',
        //     Photo: {
        //         file: '',
        //         url:
        //             'https://i.pinimg.com/originals/d5/d2/3e/d5d23ed7f286b97fe8319bea6ee0c9d0.jpg',
        //     },
        //     birth: '2010-10-17',
        //     Record: [
        //         {
        //             cdt: '2018-03-18',
        //             wgt: 5.7,
        //         },
        //     ],
        // },
        // {
        //     cat_id: 2,
        //     user_id: 1,
        //     name: '냥냥이',
        //     gender: 'M',
        //     Photo: {
        //         file: '',
        //         url:
        //             'https://static.boredpanda.com/blog/wp-content/uploads/2016/10/laid-back-cat-statue-tombili-istanbul-2.jpg',
        //     },
        //     birth: '2018-03-06',
        //     Record: [
        //         {
        //             cdt: '2019-02-28',
        //             wgt: 10.2,
        //         },
        //     ],
        // },
    ],
    isLoading: true
};

const dummyCat = (data) => ({
    cat_id: 3,
    user_id: 1,
    name: data.name,
    gender: data.gender,
    Photo: {
        file: data.photo.file,
        url: data.photo.url,
    },
    birth: data.birthyear + '-' + data.birthmonth + '-' + data.birthdate,
    Record: [],
});

// 몸무게 추가
export const ADD_WEIGHT_REQUEST = 'ADD_WEIGHT_REQUEST';
export const ADD_WEIGHT_SUCCESS = 'ADD_WEIGHT_SUCCESS';
export const ADD_WEIGHT_FAILURE = 'ADD_WEIGHT_FAILURE';

// 논의할 부분
export const GET_CAT_REQUEST = 'GET_CAT_REQUEST';
export const GET_CAT_SUCCESS = 'GET_CAT_SUCCESS';
export const GET_CAT_FAILURE = 'GET_CAT_FAILURE';
// 로그인 때 해당 유저의 모든 정보를 불러와 계속 써도 됨

export const ADD_CAT_REQUEST = 'ADD_CAT_REQUEST';
export const ADD_CAT_SUCCESS = 'ADD_CAT_SUCCESS';
export const ADD_CAT_FAILURE = 'ADD_CAT_FAILURE';

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
export const addWeightRequest = (data) => {
    return {
        type: ADD_WEIGHT_REQUEST,
        data,
    };
};
export const addWeightSuccess = (data) => {
    return {
        type: ADD_WEIGHT_SUCCESS,
        data,
    };
};
export const addWeightFailure = (data) => {
    return {
        type: ADD_WEIGHT_FAILURE,
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
                draft.cat = action.data;
                draft.isLoading = false;
                break;
            case GET_CAT_FAILURE:
                break;
            case ADD_CAT_REQUEST:
                break;
            case ADD_CAT_SUCCESS:
                draft.cat = draft.cat.concat(dummyCat(action.data));
                break;
            case ADD_CAT_FAILURE:
                break;
            case ADD_WEIGHT_REQUEST:
                console.log(action.data);
                break;
            case ADD_WEIGHT_SUCCESS:
                break;
            case ADD_WEIGHT_FAILURE:
                break;
            default:
                break;
        }
    });
};

export default reducer;
