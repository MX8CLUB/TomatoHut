/**
 * 登录
 * @author Jim
 * @date 2019/10/04
 */
import React from 'react';
import {ToastAndroid} from 'react-native';
import {put, call, takeLatest} from 'redux-saga/effects';
import * as UserActions from '../actions/user';
import Request from '../utils/Request';
import Navigation from '../utils/Navigation';

function* User({info}) {
  try {
    yield put(UserActions.UserRequestSuccess(info));
    Navigation.pop();
  } catch (error) {
    ToastAndroid.show('登录失败!', ToastAndroid.SHORT);
  }
}

export default function* WatchUser() {
  yield takeLatest('UserRequest', User);
}
