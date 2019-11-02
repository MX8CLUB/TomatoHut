/**
 * 手机登录
 * @author Jim
 * @date 2019/10/13
 */
import React from 'react';
import {ToastAndroid} from 'react-native';
import {put, call, takeLatest} from 'redux-saga/effects';
import * as UserActions from '../actions/user';
import Request from '../utils/Request';
import Navigation from '../utils/Navigation';

function* User({phone, code}) {
  try {
    const res = yield call(Request.post, '/User/phone_login/', {
      time: Math.round(new Date() / 1000),
      phone,
      code,
    });
    console.log(res);
    if (res.code === 200) {
      yield put(UserActions.UserRequestSuccess(res.data));
      storage.save({
        key: 'user',
        data: res.data,
      });
      ToastAndroid.show(res.msg, ToastAndroid.SHORT);
      Navigation.popToTop();
    } else {
      ToastAndroid.show(res.msg, ToastAndroid.SHORT);
    }
  } catch (error) {
    ToastAndroid.show('网络错误!', ToastAndroid.SHORT);
  }
}

export default function* WatchUser() {
  yield takeLatest('UserPhoneLogin', User);
}
