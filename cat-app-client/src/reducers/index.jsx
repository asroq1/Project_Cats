import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './user';
import cat from './cat';
import post from './post';

const persistConfing = {
    key: 'root',
    storage,
};
// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            default:
                return state;
        }
    },
    user,
    cat,
    post,
});

export default persistReducer(persistConfing, rootReducer);
