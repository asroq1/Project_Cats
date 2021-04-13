import { combineReducers } from 'redux'

import user from './user'
import cat from './cat'
import post from './post'

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
	index: (state = {}, action) => {
		switch (action.type) {
			default:
				return state
		}
	},
	user,
	cat,
	post,
})

export default rootReducer
