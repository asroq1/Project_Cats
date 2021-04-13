import { all, fork } from 'redux-saga/effects'

import userSaga from './user.jsx'
import catSaga from './cat.jsx'
import postSaga from './post.jsx'

export default function* rootSaga() {
	yield all([
		fork(userSaga),
		fork(catSaga),
		fork(postSaga)
	])
}
