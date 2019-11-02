/**
 * 我的
 * @author Jim
 * @date 2019/10/04
 * @update 2019/10/04
 */
import React, {PureComponent} from 'react';
import {
  ScrollView,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Icon} from '@ant-design/react-native';
import Navigation from '../utils/Navigation';
import {bindActionCreators} from 'redux';
import * as user from '../actions/user';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');
class Me extends PureComponent {
  /**
   * 标题栏配置
   */
  static navigationOptions = ({navigation}) => ({
    title: '我的',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name={'user'} color={tintColor} />
    ),
  });

  render() {
    const {UserState} = this.props;
    console.log(UserState)
    return (
      <ScrollView>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.header}>
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <Image
                style={{width: 24, height: 24}}
                source={require('../images/set.png')}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.headerImage}
            onPress={() =>
              this.props.UserState.isLogin
                ? Navigation.navigate('Setting')
                : Navigation.navigate('LoginIndex')
            }>
            <Image
              style={{width: 64, height: 64, borderRadius: 32}}
              source={
                this.props.UserState.isLogin && UserState.data.u_headImage
                  ? {uri: UserState.data.u_headImage}
                  : require('../images/default.png')
              }
            />
            <Text style={{color: '#fff', marginVertical: 10, fontSize: 16}}>
              {this.props.UserState.isLogin && UserState.data.u_nickName
                ? this.props.UserState.data.u_nickName
                : '登录/注册'}
            </Text>
          </TouchableOpacity>
          <View style={styles.yugu}>
            <View style={styles.yugu_button}>
              <Text style={{color: '#000'}}>0</Text>
              <Text style={{color: '#000'}}>本月预估</Text>
            </View>
            <View style={styles.yugu_button}>
              <Text style={{color: '#000'}}>0</Text>
              <Text style={{color: '#000'}}>我的团队</Text>
            </View>
            <View style={styles.yugu_button}>
              <Text style={{color: '#000'}}>0</Text>
              <Text style={{color: '#000'}}>上月结算</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.section_title}>我的订单</Text>
          <View style={styles.section_list}>
            {[
              {
                title: '全部订单',
                image: require('../images/me/dingdan.png'),
                onPress: () => console.log(1),
              },
              {
                title: '已付款',
                image: require('../images/me/yifukuan.png'),
                onPress: () => console.log(1),
              },
              {
                title: '已结算',
                image: require('../images/me/jiesuan.png'),
                onPress: () => console.log(1),
              },
              {
                title: '已失效',
                image: require('../images/me/yishixiao.png'),
                onPress: () => console.log(1),
              },
            ].map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  style={styles.section_button}
                  onPress={item.onPress}>
                  <Image
                    style={styles.section_button_img}
                    source={item.image}
                  />
                  <Text style={styles.section_button_text}>{item.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E94F62',
    paddingTop: StatusBar.currentHeight,
  },
  headerRight: {
    alignItems: 'flex-end',
    marginRight: 12,
    padding: 8,
  },
  headerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  yugu: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  yugu_button: {
    width: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 15,
  },
  section_title: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingVertical: 15,
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  },
  section_list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  section_button: {
    width: (width - 30) / 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  section_button_img: {
    width: (width - 30) / 4 - 60,
    height: (width - 30) / 4 - 60,
    tintColor: '#2c2c2c',
  },
  section_button_text: {
    color: '#2c2c2c',
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
)(Me);
