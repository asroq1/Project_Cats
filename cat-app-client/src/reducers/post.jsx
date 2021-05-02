// import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
//import shortId from 'shortid';

const initialState = {
    mainPosts:[],  
    imagePaths: [
        // 'https://images.unsplash.com/photo-1572097664187-7b183a6bda78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=675&q=80',
        // 'https://lh3.googleusercontent.com/proxy/zf7oU6Dpf3eVygxcgjUyt0zQMUiH7mO1Hvr9ygse9b_PhGgrD7iPj7cR9aFBNy53_JGupIhtNOpRCKTv7eHT0sqfzggWM5lpzcD5gT-E0kkoB5QAkhM5-r6euWU4zEpxCH022ksHXbyGQ3J91-09cSYiG_E1gxbdMc-sZc6Y3mXvLrCf',
        // 'https://image.fmkorea.com/files/attach/new/20190825/486616/1352801771/2125438472/03b3d5be5accbcbdc1d3c5ab990e8e88.jpg'
    ],
    currentPost: null,
    currentComments: [],

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,

    getCommentsLoading: false,
    getCommentsDone: false,
    getCommentsError:null,

    removeCommentLoading: false,
    removeCommentDone: false,
    removeCommentError: null,

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

                // draft.currentPost.comments.unshift(action.data);
                // 어차피 댓글 전체를 다시 불러오는 식으로 설계돼서
                // 아래와 같은 코드 필요 x
                
                // draft.currentComments.unshift(action.data);
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            case REMOVE_COMMENT_REQUEST:
                draft.removeCommentLoading = true;
                draft.removeCommentDone = false;
                break;
            case REMOVE_COMMENT_SUCCESS:
                // draft.currentPost.comments = draft.currentPost.commments.filter(
                //     (v) => v.id !== action
                // );
                // 어차피 댓글 전체를 불러오는 식으로 구성되어서
                // 아래와 같은 코드 필요 x
                // draft.currentComments = draft.currentComments.filter((v) => v.id == action.data);
                draft.removeCommentLoading = false;
                draft.removeCommentDone = true;
                break;
            case REMOVE_COMMENT_FAILURE:
                draft.removeCommentLoading = false;
                draft.removeCommentError = action.data;
                break;
            case GET_COMMENTS_REQUEST:
                // 댓글 변화가 게시글 내의 댓글 (GET /api/posts/{id} 시 반환되는)에는 반영이 현재 되지 않아
                // 댓글 부분은 현재 게시글과 따로 구현 (GET /api/comment/{postId})
                draft.currentComments =[];    
                draft.getCommentsLoading = true;
                draft.getCommentsDone = false;
                draft.getCommentsError = null;
                break;
            case GET_COMMENTS_SUCCESS:
                draft.currentComments = action.data;
                draft.getCommentsLoading = false;
                draft.getCommentsDone = true;
                break;
            case GET_COMMENTS_FAILURE:
                draft.getCommentsLoading = false;
                draft.getCommentsError = action.data;
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
