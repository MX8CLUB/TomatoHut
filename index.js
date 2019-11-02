/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/Root';
import {name as appName} from './app.json';
import RNAlibcSdk from 'react-native-alibaichuan';
import './src/utils/Storage';

RNAlibcSdk.initTae(err => {
  if (!err) {
    console.log('ok');
  } else {
    console.log(err);
  }
});

AppRegistry.registerComponent(appName, () => App);
