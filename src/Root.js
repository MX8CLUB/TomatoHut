import React, {Component} from 'react';
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    getActiveChildNavigationOptions
} from 'react-navigation';
import {Provider} from 'react-redux';
import {Provider as AntProvider} from '@ant-design/react-native';
import store from './store/store';
import Navigation from "./utils/Navigation";
import Main from "./containers/Main";
import Kefu from "./containers/Kefu";
import Search from "./containers/Search";
import SearchList from "./containers/SearchList";
import Item from "./containers/Item";
import Subject from "./containers/Subject";
import Classify from "./containers/Classify";
import ClassifyList from "./containers/ClassifyList";
import Brand from "./containers/Brand";


const TabNavigator = createBottomTabNavigator({
    Main: Main,
    Classify: Classify,
    // Brand: Brand,
}, {
    navigationOptions: ({navigation}) => ({
        ...getActiveChildNavigationOptions(navigation),
    }),
    tabBarOptions: {
        activeTintColor: '#E94F4F',
        activeBackgroundColor: '#fff',
        inactiveTintColor: '#000',
        inactiveBackgroundColor: '#fff',
    }
});

const AppNavigator = createStackNavigator({
    TabNavigator: TabNavigator,
    Kefu: Kefu,
    Search: Search,
    SearchList: SearchList,
    Item: Item,
    Subject: Subject,
    ClassifyList: ClassifyList,
}, {
    defaultNavigationOptions: {
        header: null,
    }
});

const AppContainer = createAppContainer(AppNavigator);

export default class Root extends Component {
    render() {
        return (
            <Provider
                store={store}
            >
                <AntProvider>
                    <AppContainer
                        ref={navigatorRef => {
                            Navigation.setTopLevelNavigator(navigatorRef);
                        }}
                    />
                </AntProvider>
            </Provider>
        )
    }
};
