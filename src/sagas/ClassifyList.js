/**
 * 超级分类列表
 * @author Jim
 * @date 2019/07/14
 */
import React from 'react';
import {call, put, takeLatest} from 'redux-saga/effects';
import * as ClassifyListActions from '../actions/classifyList';
import Request from '../utils/Request';
import {Portal, Toast} from '@ant-design/react-native';

function* ClassifyListRequest({keyword, cid, page, sort}) {
  let toast = null;
  if (page === 1) {
    toast = Toast.loading('加载中...', 0);
  }
  try {
    const res = yield call(
      Request.post,
      '/Haodanku/get_keyword_items/',
      {
        params: `/keyword/${keyword}/back/20/min_id/${page}/sort/${sort}/cid/${cid}`,
      },
    );
    if (res.code && res.min_id) {
      yield put(ClassifyListActions.ClassifyListRequestEnd(res, page === 1));
    } else {
      yield put(ClassifyListActions.ClassifyListRequestFinish());
    }
  } catch (error) {
    yield put(ClassifyListActions.ClassifyListRequestError());
  }
  if (toast) {
    Portal.remove(toast);
  }
}

export default function* WatchClassifyListRequest() {
  yield takeLatest('ClassifyListRequest', ClassifyListRequest);
}
