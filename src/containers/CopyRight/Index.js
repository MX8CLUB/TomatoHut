/**
 * 服务条款
 * @author Jim
 * @date 2019/10/07
 * @update 2019/10/09
 */
import React, {PureComponent} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import Header from '../../components/Header';
export default class Index extends PureComponent {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header title={'服务条款'} />
        <WebView
          style={{flex: 1}}
          source={{uri: 'file:///android_asset/copyright.html'}}
        />
      </View>
    );
  }
}
