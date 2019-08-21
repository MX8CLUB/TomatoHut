/**
 * 搜索列表
 * @author Jim
 * @date 2019/07/05
 */
import React from 'react';
import {call, put, takeLatest} from 'redux-saga/effects';
import * as SearchListActions from '../actions/searchList';
import Request from '../utils/Request';
import {Portal, Toast} from "@ant-design/react-native";

function* SearchListRequest({
                            keyword,
                            page,
                            sort,
                        }) {
    let toast = null;
    if(page === 1) toast = Toast.loading('加载中...', 0);
    try {
        const res = yield call(Request.post, 'https://go.tomatohut.cn/api/Haodanku/get_keyword_items/', {
            params: `/keyword/${keyword}/back/20/min_id/${page}/sort/${sort}/`
        });
        console.log(res);
        if(res.code && res.min_id){
            yield put(SearchListActions.SearchListRequestEnd(res, (page===1)))
        }else{
            yield put(SearchListActions.SearchListRequestFinish())
        }
    } catch (error) {
        yield put(SearchListActions.SearchListRequestError())
    }
    if(toast) Portal.remove(toast);
}

export default function* WatchSearchListRequest() {
    yield takeLatest('SearchListRequest', SearchListRequest);
}
