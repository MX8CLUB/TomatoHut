/**
 * 登录
 * @author Jim
 * @date 2019/10/04
 * @update 2019/10/04
 */
import React, {PureComponent} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  ToastAndroid,
  Clipboard,
  TouchableNativeFeedback
} from 'react-native';
import Navigation from '../../utils/Navigation';
import {bindActionCreators} from 'redux';
import * as user from '../../actions/user';
import {connect} from 'react-redux';
import RNAlibcSdk from 'react-native-alibaichuan';
import TbParams from '../../utils/TbParams';
import {Toast} from '@ant-design/react-native';

class Index extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.close}>
          <TouchableOpacity activeOpacity={1} onPress={() => Navigation.pop()}>
            <Image
              style={{width: 18, height: 18}}
              source={require('../../images/close.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={styles.logo}>
            <Image
              style={{width: 80, height: 80}}
              source={require('../../images/tomato.png')}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: '90%',
                height: 50,
                marginHorizontal: '5%',
                backgroundColor: '#E94F62',
                borderRadius: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => Navigation.navigate('RegisterPhone')}>
              <Text style={{color: '#fff', fontSize: 18}}>注册</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: '90%',
                height: 50,
                marginTop: 10,
                marginHorizontal: '5%',
                backgroundColor: 'rgba(0,0,0,0)',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#E94F62',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => Navigation.navigate('LoginPhone')}>
              <Text style={{color: '#E94F62', fontSize: 18}}>登录</Text>
            </TouchableOpacity>
            <Text style={{marginVertical: 20}}>
              登录注册即代表您同意{' '}
              <Text
                onPress={() => Navigation.navigate('CopyRightIndex')}
                style={{color: 'blue'}}>
                番茄小屋服务条款
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  close: {
    marginTop: StatusBar.currentHeight + 30,
    marginHorizontal: 30,
    alignItems: 'flex-end',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  footer: {
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  const UserState = state.User;
  return {
    UserState,
  };
};

const mapDispatchToProps = dispatch => {
  const UserActions = bindActionCreators(user, dispatch);
  return {
    UserActions,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
