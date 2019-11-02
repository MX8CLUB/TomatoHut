/**
 * 推荐热销榜单
 * @author Jim
 * @date 2019/07/10
 */
import React from 'react';
import {put, call, takeLatest} from 'redux-saga/effects';
import * as TuiActions from '../actions/tui';
import Request from "../utils/Request";

function* TuiSales() {
    try {
        const res = yield call(Request.get, '/Haodanku/sales_list/sale_type/1/back/20/');
        yield put(TuiActions.TuiSalesRequestEnd(res.data))
    } catch (error) {
        console.log(error)
    }
}

export default function* WatchTuiSales() {
    yield takeLatest('TuiSalesRequest', TuiSales);
}
