import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware  from 'redux-saga';
import Reducers from '../reducers/index';
import rootSaga from "../sagas/index";

const sagaMiddleware = createSagaMiddleware(rootSaga);

const configureStore = () => {
    const store = createStore(Reducers, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
};

const store = configureStore();
export default store;