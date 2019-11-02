/**
 * 推荐幻灯片
 * @author Jim
 * @date 2019/07/09
 */
import React from 'react';
import {put, call, takeLatest} from 'redux-saga/effects';
import * as TuiActions from '../actions/tui';
import Request from '../utils/Request';

function* TuiCarousel() {
  try {
    const res = yield call(
      Request.get,
      '/Haodanku/get_subject/',
    );
    yield put(TuiActions.TuiCarouselRequestEnd(res.data));
  } catch (error) {
    console.log(error);
  }
}

export default function* WatchTuiCarousel() {
  yield takeLatest('TuiCarouselRequest', TuiCarousel);
}
