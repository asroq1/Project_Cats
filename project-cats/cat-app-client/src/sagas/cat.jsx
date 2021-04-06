import { all, call, fork, takeLatest, put, delay } from 'redux-saga/effects'
import axios from 'axios'

import //ACTION NAMES
'../reducers/cat'

function function_name_API(data) {
	return
	//axios...
}

function* function_name(action) {
	try {
		const result = yield call(function_name_API, action.data)

		yield put({
			type: ACTION_NAME_SUCCESS,
			data: result.data,
		})
	} catch (err) {
		yield put({
			type: ACTION_NAME_FAILURE,
			data: err.response.data,
		})
	}
}

function* watch_function_name() {
	yield takeLatest(ACTION_NAME, logOut)
}

export default function* userSaga() {
	yield all([fork(watch_function_name)])
}
