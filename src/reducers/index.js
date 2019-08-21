import { combineReducers } from 'redux';
import Tui from './Tui';
import Search from './Search';
import SearchList from './SearchList';
import Item from './Item';
import Subject from './Subject';
import ClassifyList from './ClassifyList';

const reducers = combineReducers({
    Tui,
    Search,
    SearchList,
    Item,
    Subject,
    ClassifyList,
});

export default reducers;
