import React, {Component} from 'react';
import {
  createAppContainer,
  getActiveChildNavigationOptions,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Provider} from 'react-redux';
import {Provider as AntProvider} from '@ant-design/react-native';
import store from './store/store';
import Navigation from './utils/Navigation';
import Main from './containers/Main';
import Kefu from './containers/Kefu';
import Search from './containers/Search';
import SearchList from './containers/SearchList';
import Item from './containers/Item';
import Subject from './containers/Subject';
import Classify from './containers/Classify';
import ClassifyList from './containers/ClassifyList';
import Brand from './containers/Brand';
import Special from './containers/Special';
import Me from './containers/Me';
import LoginIndex from './containers/Login/Index';
import LoginPhone from './containers/Login/Phone';
import CopyRightIndex from './containers/CopyRight/Index';

const TabNavigator = createBottomTabNavigator(
  {
    Main: Main,
    Classify: Classify,
    Me: Me,
    // Brand: Brand,
  },
  {
    navigationOptions: ({navigation}) => ({
      ...getActiveChildNavigationOptions(navigation),
    }),
    tabBarOptions: {
      activeTintColor: '#E94F4F',
      activeBackgroundColor: '#fff',
      inactiveTintColor: '#000',
      inactiveBackgroundColor: '#fff',
    },
  },
);

const AppNavigator = createStackNavigator(
  {
    TabNavigator: TabNavigator,
    Kefu: Kefu,
    Search: Search,
    SearchList: SearchList,
    Item: Item,
    Subject: Subject,
    ClassifyList: ClassifyList,
    Special: Special,
    /**
     * 登录
     */
    LoginIndex: LoginIndex,
    LoginPhone: LoginPhone,
    /**
     * 服务条款
     */
    CopyRightIndex: CopyRightIndex,
  },
  {
    mode: 'card',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AntProvider>
          <AppContainer
            ref={navigatorRef => {
              Navigation.setTopLevelNavigator(navigatorRef);
            }}
          />
        </AntProvider>
      </Provider>
    );
  }
}
