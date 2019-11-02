/**
 * 手机登录
 * @author Jim
 * @date 2019/10/09
 * @update 2019/10/09
 */
import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import Header from '../../components/Header';
import {Portal, Toast} from '@ant-design/react-native';
import Request from '../../utils/Request';
import {bindActionCreators} from 'redux';
import * as user from '../../actions/user';
import {connect} from 'react-redux';

class Phone extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      code: '',
      yzmDisabled: false,
      yzmTime: '',
    };
  }

  componentWillUnmount() {
    /**
     * 定时器存在清除定时器
     */
    this.time && clearTimeout(this.time);
  }

  /**
   * 获取验证码
   * @private
   */
  _yzm() {
    if (this.state.yzmTime) {
      return;
    }
    const key = Toast.loading('发送中...', 0, null, true);
    this.setState(
      {
        yzmTime: 60,
        yzmDisabled: true,
      },
      () => this._yzmTime(),
    );
    Request.post('/User/phone_yzm', {
      time: Math.round(new Date() / 1000),
      type: 'login',
      phone: this.state.phone,
    })
      .then(res => {
        Portal.remove(key);
        ToastAndroid.show(res.msg, ToastAndroid.SHORT);
      })
      .catch(err => {
        Portal.remove(key);
        ToastAndroid.show('网络错误！', ToastAndroid.SHORT);
      });
  }

  /**
   * 验证码倒计时
   */
  _yzmTime() {
    this.time = setInterval(() => {
      this.setState(
        (state, props) => ({
          yzmTime: state.yzmTime - 1,
        }),
        () => {
          if (this.state.yzmTime === 0) {
            clearTimeout(this.time);
          }
        },
      );
    }, 1000);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header title={'手机号登录'} />
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>手机号</Text>
            <TextInput
              maxLength={11}
              style={styles.boxInput}
              placeholder={'输入手机号'}
              onChangeText={phone => this.setState({phone})}
            />
          </View>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>验证码</Text>
            <TextInput
              maxLength={4}
              style={styles.boxInput}
              placeholder={'输入验证码'}
              onChangeText={code => this.setState({code})}
              editable={this.state.yzmDisabled}
            />
            <TouchableOpacity
              style={styles.boxYzm}
              activeOpacity={1}
              background={TouchableNativeFeedback.Ripple('#f39c12', true)}
              onPress={() => this._yzm()}>
              <Text style={styles.boxYzmText}>
                {this.state.yzmTime ? this.state.yzmTime + 's' : '获取验证码'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.box, {borderBottomWidth: 0}]}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.button}
              disabled={!this.state.yzmDisabled}
              onPress={() =>
                this.props.UserActions.UserPhoneLogin(
                  this.state.phone,
                  this.state.code,
                )
              }>
              <Text style={{fontSize: 18, color: '#fff'}}>登录</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  box: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  boxTitle: {
    height: 40,
    width: 80,
    textAlign: 'center',
    lineHeight: 40,
    color: '#000',
  },
  boxInput: {
    flex: 1,
    height: 40,
    padding: 0,
  },
  boxYzm: {
    width: 80,
    borderWidth: 1,
    borderColor: '#000',
  },
  boxYzmText: {
    color: '#000',
    lineHeight: 40,
    textAlign: 'center',
  },
  button: {
    width: '90%',
    height: 50,
    marginTop: 10,
    marginHorizontal: '5%',
    backgroundColor: '#E94F62',
    borderRadius: 5,
    flexDirection: 'row',
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
)(Phone);
