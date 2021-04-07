// HYDRATE는 공부 좀 해볼게요..!
// import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux'

import user from './user'
import cat from './cat'
import users from './users'

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
	// index: (state = {}, action) => {
	// 	switch (action.type) {
	// 		// case HYDRATE:
	// 		//     console.log('HYDRATE', action);
	// 		//     return {...state, ...action.payload};
	// 		default:
	// 			return state
	// 	}
	// },
	user,
	cat,
	users,
})

export default rootReducer
