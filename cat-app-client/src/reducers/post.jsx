// import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import shortId from 'shortid';

const initialState = {
    mainPosts: [
        {
            _id: 1,
            User: {
                id: 1,
                nickname: '고양이제국만세',
            },
            title: '전 고양이가 너무 좋아요... 어떡하죠?',
            content:
                '고양이가 세상을 지배해야 된다고 생각해요. 비판은 거절합니다.',
            date: '2020-01-03',

            Images: [
                {
                    id: shortId.generate(),
                    src: 'https://t1.daumcdn.net/cfile/blog/110C0E0349706F77F5',
                },
                {
                    id: shortId.generate(),
                    src:
                        'https://imgnn.seoul.co.kr/img/upload/2019/01/30/SSI_20190130171000_V.jpg',
                },
                {
                    id: shortId.generate(),
                    src:
                        'https://i.pinimg.com/originals/ca/c0/a0/cac0a030fa07099fef5ad6d9c1df6fdc.jpg',
                },
            ],

            Comments: [
                {
                    id: shortId.generate(),
                    User: {
                        nickname: 'ㅇㅇ',
                    },
                    content:
                        '주인님을 사랑하고 공경하는 건 집사의 당연한 도리입니당',
                },
                {
                    id: shortId.generate(),
                    User: {
                        nickname: '저두용',
                    },
                    content: '동의합니당!',
                },
            ],
        },
        {
            _id: 2,
            User: {
                id: 1,
                nickname: '고양이제국만세',
            },
            title: '전 고양이가 너무 좋아요... 어떡하죠?',
            content:
                '고양이가 세상을 지배해야 된다고 생각해요. 비판은 거절합니다.',
            date: '2020-01-03',
            Images: [
                {
                    id: shortId.generate(),
                    src: 'https://t1.daumcdn.net/cfile/blog/110C0E0349706F77F5',
                },
            ],

            Comments: [],
        },
        {
            _id: 3,
            User: {
                id: 1,
                nickname: '고양이제국만세',
            },
            title: '전 고양이가 너무 좋아요... 어떡하죠?',
            content:
                '고양이가 세상을 지배해야 된다고 생각해요. 비판은 거절합니다.',
            date: '2020-01-03',
            Images: [
                {
                    id: shortId.generate(),
                    src: 'https://t1.daumcdn.net/cfile/blog/110C0E0349706F77F5',
                },
            ],

            Comments: [],
        },
        {
            _id: 4,
            User: {
                id: 1,
                nickname: '고양이제국만세',
            },
            title: '전 고양이가 너무 좋아요... 어떡하죠?',
            content:
                '고양이가 세상을 지배해야 된다고 생각해요. 비판은 거절합니다.',
            date: '2020-01-03',
            Images: [
                {
                    id: shortId.generate(),
                    src: 'https://t1.daumcdn.net/cfile/blog/110C0E0349706F77F5',
                },
            ],

            Comments: [],
        },
        {
            _id: 5,
            User: {
                id: 1,
                nickname: '고양이제국만세',
            },
            title: '전 고양이가 너무 좋아요... 어떡하죠?',
            content:
                '고양이가 세상을 지배해야 된다고 생각해요. 비판은 거절합니다.',
            date: '2020-01-03',
            Images: [
                {
                    id: shortId.generate(),
                    src: 'https://t1.daumcdn.net/cfile/blog/110C0E0349706F77F5',
                },
            ],

            Comments: [],
        },
        {
            _id: 6,
            User: {
                id: 1,
                nickname: '고양이제국만세',
            },
            title: '전 고양이가 너무 좋아요... 어떡하죠?',
            content:
                '고양이가 세상을 지배해야 된다고 생각해요. 비판은 거절합니다.',
            date: '2020-01-03',
            Images: [
                {
                    id: shortId.generate(),
                    src: 'https://t1.daumcdn.net/cfile/blog/110C0E0349706F77F5',
                },
            ],

            Comments: [],
        },
    ],
    imagePaths: [],
    currentPost: null,
    listPosts: null,
    error: null,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const READ_POST_REQUEST = 'READ_POST_REQUEST';
export const READ_POST_SUCCESS = 'READ_POST_SUCCESS';
export const READ_POST_FAILURE = 'READ_POST_FAILURE';

//포스트 리스트
export const LIST_POST_REQUEST = 'LIST_POST_REQUEST';
export const LIST_POST_SUCCESS = 'LIST_POST_SUCCESS';
export const LIST_POST_FAILURE = 'LIST_POST_FAILURE';

//포스트 페이지에서 벗어날 땐 데이터 비우기
export const UNLOAD_POST = 'UNLOAD_POST';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const readPost = (data) => ({
    type: READ_POST_REQUEST,
    data,
});

export const listPost = (data) => ({
    type: LIST_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_POST_REQUEST:
                break;
            case ADD_POST_SUCCESS:
                draft.mainPosts.unshift(action.data);
                draft.imagePaths = [];
                break;
            case ADD_POST_FAILURE:
                break;
            case READ_POST_REQUEST:
                break;
            case READ_POST_SUCCESS:
                draft.currentPost = action.data;
                break;
            case READ_POST_FAILURE:
                draft.error = action.data;
                break;
            case LIST_POST_REQUEST:
                break;
            case LIST_POST_SUCCESS:
                // draft.listPosts = action.data;
                break;
            case LIST_POST_FAILURE:
                break;
            case UNLOAD_POST:
                draft.currentPost = [];
                break;
            case UPDATE_POST_REQUEST:
                break;
            case UPDATE_POST_SUCCESS:
                draft.mainPosts.find(
                    (v) => v.id === action.data.PostId
                ).content = action.data.content;
                break;
            case UPDATE_POST_FAILURE:
                break;
            case REMOVE_POST_REQUEST:
                break;
            case REMOVE_POST_SUCCESS:
                draft.mainPosts = draft.mainPosts.filter(
                    (v) => v.id !== action.data.PostId
                );
                break;
            case REMOVE_POST_FAILURE:
                break;

            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                const post = draft.mainPosts.find(
                    (v) => v.id === action.data.postId
                );
                post.Comments.unshift(action.data);
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;

            case REMOVE_COMMENT_REQUEST:
                break;
            case REMOVE_COMMENT_SUCCESS:
                draft.mainPosts.Comments[
                    action.data.i
                ] = draft.mainPosts.Commments[action.data.i].filter(
                    (v) => v.key !== action.data.key
                );
                break;
            case REMOVE_COMMENT_FAILURE:
                break;
            case UPLOAD_IMAGES_REQUEST:
                break;
            case UPLOAD_IMAGES_SUCCESS:
                draft.imagePaths = draft.imagePaths.concat(action.data);
                break;
            case UPLOAD_IMAGES_FAILURE:
                break;
            case REMOVE_IMAGE:
                draft.imagePaths = draft.imagePaths.filter(
                    (v) => v.file.name !== action.data
                );
                break;
            default:
                break;
        }
    });
};

export default reducer;
