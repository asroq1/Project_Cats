import { applyMiddleware, createStore, compose } from 'redux';
// 크롬에서 debug하기 쉽게 extension 사용 위함
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas'

// 개발용
// 함수 실행마다 로그해줘서 개발에 유용함
// 이런 식으로 middleware를 직접 만들어 Redux기능을 확장시켜줄 수 있다
const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    console.log(action);
    return next(action);
};

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, loggerMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares)) //배포용
        : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(rootReducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

export default configureStore;