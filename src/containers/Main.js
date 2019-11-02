/**
 * 首页
 * @author Jim
 * @date 2019/07/03
 */
import React, {Component} from 'react';
import {
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Tabs, Toast} from '@ant-design/react-native';
import Navigation from '../utils/Navigation';
import SplashScreen from 'react-native-splash-screen';
import RNBugly from 'react-native-bugly';
import IMEI from 'react-native-imei';
import {
  checkUpdate,
  downloadUpdate,
  isFirstTime,
  isRolledBack,
  markSuccess,
  switchVersionLater,
} from 'react-native-update';
import _updateConfig from '../../update.json';
import Tui from './Tui';
import SalesList from './SalesList';
import RNAlibcSdk from 'react-native-alibaichuan';
import {bindActionCreators} from 'redux';
import * as user from '../actions/user';
import * as device from '../actions/device';
import {connect} from 'react-redux';
import RNExitApp from 'react-native-exit-app';
import DeviceInfo from 'react-native-device-info';

const {appKey} = _updateConfig.android;

// 标签
const tabs = [
  {title: '推荐'},
  {title: '百变穿搭'},
  {title: '时尚潮男'},
  {title: '舒适好物'},
  {title: '美妆达人'},
  {title: '魅力配饰'},
  {title: '步履不停'},
  {title: '包罗万象'},
  {title: '萌娃驾到'},
  {title: '宝妈神器'},
  {title: '居家好物'},
  {title: '吃货专区'},
  {title: '数码达人'},
  {title: '用电能手'},
  {title: '伴你前行'},
  {title: '学习娱乐'},
  {title: '萌宠世界'},
  {title: '其他'},
];

class Main extends Component {
  /**
   * 标题栏配置
   */
  static navigationOptions = ({navigation}) => ({
    title: '主页',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name={'home'} color={tintColor} />
    ),
  });

  componentDidMount() {
    this._getStorage();
    /**
     * 检查更新
     */
    if (isFirstTime) {
      markSuccess();
    } else if (isRolledBack) {
      Toast.info('刚刚更新失败了,版本被回滚！', 3, undefined, false);
    }
    checkUpdate(appKey).then(info => {
      if (info.update) {
        downloadUpdate(info).then(hash => {
          switchVersionLater(hash);
        });
      }
      RNBugly.checkUpgrade(false, false);
    });
    /**
     * 申请权限
     */
    // this.requestMultiplePermission();
    /**
     * 查询是否登录
     */
    RNAlibcSdk.getUserInfo(
      info => {
        // this.props.UserActions.UserSet(true, info);
        /**
         * 关闭启动页
         */
        SplashScreen.hide();
      },
      err => {
        /**
         * 关闭启动页
         */
        SplashScreen.hide();
      },
    );
  }

  /**
   * 申请权限
   * @returns {Promise<void>}
   */
  async requestMultiplePermission() {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        // PermissionsAndroid.PERMISSIONS.CAMERA,
      ];
      //返回得是对象类型
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      if (granted['android.permission.READ_PHONE_STATE'] !== 'granted') {
        Toast.fail('关键权限未允许\n即将关闭APP', 3, () => RNExitApp.exitApp());
      }
      /**
       * 获取IMEI
       */
      const Imei = await IMEI.getImei();
      const DeviceName = await DeviceInfo.getDeviceName();
      const SystemName = await DeviceInfo.getSystemName();
      const SystemVersion = await DeviceInfo.getSystemVersion();
      const Version = await DeviceInfo.getVersion();
      this.props.DeviceActions.DeviceSet({
        Imei,
        DeviceName,
        SystemName,
        SystemVersion,
        Version,
      });
    } catch (err) {
      // ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      console.log(err.toString());
    }
  }

  /**
   * 获取缓存用户
   */
  _getStorage() {
    storage
      .load({
        key: 'user',
      })
      .then(res => {
        console.log(res);
        this.props.UserActions.UserRequestSuccess(res);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={'dark-content'}
          translucent={true}
          backgroundColor="transparent"
        />
        <View style={styles.header}>
          <View style={styles.search}>
            <TouchableOpacity
              style={styles.searchBar}
              activeOpacity={1}
              onPress={() => Navigation.navigate('Search')}>
              <Icon name={'search'} />
              <Text style={{marginLeft: 10}}>宝贝关键词搜索</Text>
              <Text style={{marginLeft: 10, color: '#E94F62'}}>领券省钱</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.littleButton}
              onPress={() => Navigation.navigate('Kefu')}
              activeOpacity={1}>
              <Icon name={'customer-service'} size={'xs'} color={'#fff'} />
              <Text style={{fontSize: 10, color: '#fff'}}>客服</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Tabs
          tabs={tabs}
          tabBarActiveTextColor={'#fff'}
          tabBarInactiveTextColor={'#fff'}
          tabBarBackgroundColor={'#E94F62'}
          tabBarUnderlineStyle={{backgroundColor: '#fff'}}>
          <Tui />
          <SalesList cat_id={1} />
          <SalesList cat_id={2} />
          <SalesList cat_id={3} />
          <SalesList cat_id={4} />
          <SalesList cat_id={5} />
          <SalesList cat_id={6} />
          <SalesList cat_id={7} />
          <SalesList cat_id={8} />
          <SalesList cat_id={9} />
          <SalesList cat_id={10} />
          <SalesList cat_id={11} />
          <SalesList cat_id={12} />
          <SalesList cat_id={13} />
          <SalesList cat_id={15} />
          <SalesList cat_id={16} />
          <SalesList cat_id={17} />
          <SalesList cat_id={14} />
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  header: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#E94F62',
  },
  search: {
    flexDirection: 'row',
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 10,
  },
  littleButton: {
    alignItems: 'center',
    width: 30,
    height: '100%',
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
  const DeviceActions = bindActionCreators(device, dispatch);
  return {
    UserActions,
    DeviceActions,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
