/**
 * 推荐今日值得买
 * @author Jim
 * @date 2019/07/10
 */
import React from 'react';
import {put, call, takeLatest} from 'redux-saga/effects';
import * as TuiActions from '../actions/tui';
import Request from "../utils/Request";

function* TuiColumn({
    page
                    }) {
    try {
        const res = yield call(Request.post, `https://go.tomatohut.cn/api/Haodanku/column/`, {
            params: `/type/1/back/20/min_id/${page}/item_type/1/`
        });
        if(res.code){
            yield put(TuiActions.TuiColumnRequestEnd(res, (page===1)));
        }else{
            yield put(TuiActions.TuiColumnFinish());
        }
    } catch (error) {
        yield put(TuiActions.TuiColumnError(error));
    }
}

export default function* WatchTuiColumn() {
    yield takeLatest('TuiColumnRequest', TuiColumn);
}
