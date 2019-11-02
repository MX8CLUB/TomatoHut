import {all, fork} from 'redux-saga/effects';
import TuiCarousel from '../sagas/TuiCarousel';
import TuiSales from '../sagas/TuiSales';
import TuiDeserve from '../sagas/TuiDeserve';
import TuiColumn from '../sagas/TuiColumn';
import SearchHotKey from '../sagas/SearchHotKey';
import SearchList from '../sagas/SearchList';
import Subject from '../sagas/Subject';
import ClassifyList from '../sagas/ClassifyList';
import User from '../sagas/User';
import PhoneLogin from '../sagas/PhoneLogin';

export default function* rootSaga() {
  yield all([
    fork(TuiCarousel),
    fork(TuiSales),
    fork(TuiDeserve),
    fork(TuiColumn),
    fork(SearchHotKey),
    fork(SearchList),
    fork(Subject),
    fork(ClassifyList),
    fork(User),
    fork(PhoneLogin),
  ]);
}
