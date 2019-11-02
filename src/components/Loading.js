import React, {PureComponent} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
export default class Loading extends PureComponent {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LottieView
          style={{width: 128}}
          source={require('../lotties/196-material-wave-loading')}
          autoPlay
          loop
        />
      </View>
    );
  }
}
