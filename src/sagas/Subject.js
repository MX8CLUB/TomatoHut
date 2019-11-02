/**
 * 详情页
 * @author Jim
 * @date 2019/07/10
 */
import React from 'react';
import {put, call, takeLatest} from 'redux-saga/effects';
import * as SubjectActions from '../actions/subject';
import Request from "../utils/Request";
import {Portal, Toast} from "@ant-design/react-native";

function* Subject({
    id
                    }) {
    let toast = Toast.loading('加载中...', 0);
    try {
        const res = yield call(Request.get, `/Haodanku/get_subject_item/id/${id}/`);
        yield put(SubjectActions.SubjectRequestEnd(res.data));
    } catch (error) {
        yield put(SubjectActions.SubjectRequestError());
    }
    if (toast) Portal.remove(toast);
}

export default function* WatchSubject() {
    yield takeLatest('SubjectRequest', Subject);
}
