/**
 * 详情页
 * @author Jim
 * @date 2019/07/10
 */
import React from 'react';
import {put, call, takeLatest} from 'redux-saga/effects';
import * as ItemActions from '../actions/item';
import Request from "../utils/Request";
import {Portal, Toast} from "@ant-design/react-native";

function* Item({
    id
                    }) {
    let toast = Toast.loading('加载中...', 0);
    try {
        const res = yield call(Request.post, `https://go.tomatohut.cn/api/Haodanku/item_detail/`, {
            params: `/itemid/${id}`
        });
        console.log(res);
        yield put(ItemActions.ItemRequestEnd(res.data));
    } catch (error) {
        yield put(ItemActions.ItemRequestError());
    }
    if (toast) Portal.remove(toast);
}

export default function* WatchItem() {
    yield takeLatest('ItemRequest', Item);
}
