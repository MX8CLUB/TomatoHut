/**
 * 品牌列表
 * @author Jim
 * @date 2019/07/15
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import {call, put, takeLatest} from 'redux-saga/effects';
import * as ClassifyListActions from '../actions/classifyList';
import Request from '../utils/Request';
import {Portal, Toast} from '@ant-design/react-native';

export default class Brand extends Component {
  constructor(props) {
    super(props);
    Request.get('/Haodanku/brand').then(res => {
      console.log(res);
    });
  }

  render() {
    return <View />;
  }
}
