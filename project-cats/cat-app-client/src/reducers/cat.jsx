export const initialState = {
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
            age: 3,
            Record: [
                {
                    cdt: '2021-03-30',
                    wgt: 3.1,
                },
            ],
        },
        {
            cat_id: 1,
            user_id: 1,
            name: 'meme',
            gender: 'F',
            Photo: {
                file: '',
                url:
                    'https://i.pinimg.com/originals/d5/d2/3e/d5d23ed7f286b97fe8319bea6ee0c9d0.jpg',
            },
            age: 5,
            Record: [
                {
                    cdt: '2018-03-18',
                    wgt: 5.7,
                },
            ],
        },

        {
            cat_id: 2,
            user_id: 1,
            name: '냥냥이',
            gender: 'M',
            Photo: {
                file: '',

                url:
                    'https://welovekitties.com/wp-content/uploads/2015/12/cutekittenspictures-145124821648lcp.jpg',
            },
            age: 6,
            Record: [
                {
                    cdt: '2019-02-28',
                    wgt: 10.2,
                },
            ],
        },
    ],
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
    age: 3,

    birth:
        data.birthyear +
        '-' +
        data.birthmonth +
        '-' +
        data.ADD_CAT_FAILUREbirthdate,
    Record: [],
});

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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CAT_REQUEST:
            return {
                ...state,
            };
        case GET_CAT_SUCCESS:
            return {
                ...state,
            };
        case GET_CAT_FAILURE:
            return {
                ...state,
            };
        case ADD_CAT_REQUEST:
            return {
                ...state,
            };
        case ADD_CAT_SUCCESS:
            console.log(action.data);
            return {
                ...state,
                cat: [...state.cat, dummyCat(action.data)],
            };
        case ADD_CAT_FAILURE:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default reducer;