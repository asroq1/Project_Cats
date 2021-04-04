import {all, fork} from 'redux-saga/effects'

import userSaga from './user.js';

export default function* rootSaga() {
    yield all([
        fork(userSaga),
    ]);
};