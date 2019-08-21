/**
 * 搜索获取关键词
 * @author Jim
 * @date 2019/07/10
 */
import React from 'react';
import {put, call, takeLatest} from 'redux-saga/effects';
import * as SearchActions from '../actions/search';
import Request from "../utils/Request";

function* SearchHotKey() {
    try {
        const res = yield call(Request.get, 'https://go.tomatohut.cn/api/Haodanku/hot_key/');
        yield put(SearchActions.SearchHotKeyRequestEnd(res.data));
    } catch (error) {

    }
}

export default function* WatchSearchHotKeyRequest() {
    yield takeLatest('SearchHotKeyRequest', SearchHotKey);
}
