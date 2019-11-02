import {combineReducers} from 'redux';
import Tui from './Tui';
import Search from './Search';
import SearchList from './SearchList';
import Subject from './Subject';
import ClassifyList from './ClassifyList';
import User from './User';
import Device from './Device';

const reducers = combineReducers({
  Tui,
  Search,
  SearchList,
  Subject,
  ClassifyList,
  User,
  Device,
});

export default reducers;
