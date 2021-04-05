import {all, fork} from 'redux-saga/effects'

import userSaga from './user.jsx';

export default function* rootSaga() {
    yield all([
        fork(userSaga),
    ]);
};