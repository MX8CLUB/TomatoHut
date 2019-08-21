/**
 * 推荐今日值得买
 * @author Jim
 * @date 2019/07/10
 */
import React from 'react';
import {put, call, takeLatest} from 'redux-saga/effects';
import * as TuiActions from '../actions/tui';
import Request from "../utils/Request";

function* TuiDeserve() {
    try {
        const res = yield call(Request.get, 'https://go.tomatohut.cn/api/Haodanku/get_deserve_item/');
        yield put(TuiActions.TuiDeserveRequestEnd(res.item_info))
    } catch (error) {
        console.log(error)
    }
}

export default function* WatchTuiDeserve() {
    yield takeLatest('TuiDeserveRequest', TuiDeserve);
}