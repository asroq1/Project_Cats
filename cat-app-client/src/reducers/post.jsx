// import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import shortId from 'shortid';

const initialState = {
    mainPosts:[],  
    imagePaths: [],
    currentPost: null,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,

    readPostLoading: false,
    readPostDone: false,
    readPostError:null,

    addPostLoading:false,
    addPostDone: false,
    addPostError: null,

    udpatePostLoading:false,
    updatePostDone: false,
    updatePostError: null,

    removePostLoading: false,
    removePostDone: false,
    removePostError: null,

    listPostLoading: false,
    listPostDone: false,
    listPostError: null,

    hasMorePosts: true,
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

export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const readPost = (data) => ({
    type: READ_POST_REQUEST,
    data,
});

export const updatePost = (data) => ({
    type: UPDATE_POST_REQUEST,
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
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                //draft.mainPosts.unshift(action.data);
                draft.imagePaths = [];

                draft.addPostLoading = false;
                draft.addPostDone = true;
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostErrror = action.data;    
                break;
            case READ_POST_REQUEST:
                draft.readPostLoading = true;
                draft.readPostDone = false;
                draft.readPostError = null;
                break;
            case READ_POST_SUCCESS:
                draft.currentPost = action.data;
                draft.updatePostDone = false;
                // draft.imagePaths = draft.currentPost.images;
                break;
            case READ_POST_FAILURE:
                draft.error = action.data;
                break;
            case LIST_POST_REQUEST:
                draft.listPostLoading = true;
                break;
            case LIST_POST_SUCCESS:
                draft.listPostLoading = false;
                draft.listPostDone = true;
                draft.mainPosts = action.data;
                draft.hasMorePost = draft.mainPosts.length < 50;
                draft.removePostDone = false;
                break;
            case LIST_POST_FAILURE:
                draft.listPostLoading = false;
                draft.listPostError = action.data;
                break;
            case UNLOAD_POST:
                draft.currentPost = null;
                break;
            case UPDATE_POST_REQUEST:
                draft.updatePostLoading = true;
                draft.updatePostDone= false;
                draft.updatePostError = null;
                break;
            case UPDATE_POST_SUCCESS:
                // draft.mainPosts.find(
                //     (v) => v.id === action.data.PostId
                // ).content = action.data.content;
                draft.updatePostLoading = false;
                draft.updatePostDone = true;
                break;
            case UPDATE_POST_FAILURE:
                
                draft.updatePostLoading = false;
                draft.updatePostError = action.data;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                // draft.mainPosts = draft.mainPosts.filter(
                //     (v) => v.id !== action.data.PostId
                // );
                draft.removePostLoading = false;
                draft.removePostDone= true;
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.data;
                break;

            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                // const post = draft.mainPosts.find(
                //     (v) => v.id === action.data.postId
                // );
                // post.Comments.unshift(action.data);

                draft.currentPost.comments.unshift(action.data);
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
                // draft.currentPost.comments = draft.currentPost.commments.filter(
                //     (v) => v.id !== action
                // );
                break;
            case REMOVE_COMMENT_FAILURE:
                break;
            case GET_COMMENTS_REQUEST:
                break;
            case GET_COMMENTS_SUCCESS:
                break;
            case GET_COMMENTS_FAILURE:
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
