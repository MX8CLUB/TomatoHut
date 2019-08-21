/**
 * 首页
 * @author Jim
 * @date 2019/07/03
 */
import React, { Component } from 'react';
import { View, StatusBar, TouchableOpacity, FlatList, Image, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import {Icon, Tabs, Toast} from '@ant-design/react-native';
import Navigation from "../utils/Navigation";
import SplashScreen from 'react-native-splash-screen'
import RNBugly from "react-native-bugly";
import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';
import _updateConfig from '../../update.json';
import Tui from "./Tui";
import SalesList from "./SalesList";
const {appKey} = _updateConfig['android'];

// 标签
const tabs = [
    { title: '推荐' },
    { title: '百变穿搭' },
    { title: '时尚潮男' },
    { title: '舒适好物' },
    { title: '美妆达人' },
    { title: '魅力配饰' },
    { title: '步履不停' },
    { title: '包罗万象' },
    { title: '萌娃驾到' },
    { title: '宝妈神器' },
    { title: '居家好物' },
    { title: '吃货专区' },
    { title: '数码达人' },
    { title: '用电能手' },
    { title: '伴你前行' },
    { title: '学习娱乐' },
    { title: '萌宠世界' },
    { title: '其他' },
];

export default class Main extends Component {

    /**
     * 标题栏配置
     */
    static navigationOptions = ({navigation}) => ({
        title: '主页',
        tabBarIcon: ({
                         focused,
                         tintColor
                     }) => (
            <Icon name={'home'} color={tintColor} />
        ),
    });

    componentDidMount(){
        /**
         * 检查更新
         */
        if (isFirstTime) {
            markSuccess();
        } else if (isRolledBack) {
            Toast.info('刚刚更新失败了,版本被回滚！', 3, undefined, false);
        }
        checkUpdate(appKey).then(info => {
            if (info.expired) {
                RNBugly.checkUpgrade(false, false);
            } else if (info.update) {
                downloadUpdate(info).then(hash => {
                    switchVersionLater(hash);
                })
            }
        });
        /**
         * 关闭启动页
         */
        SplashScreen.hide();
    }

    render(){
        return(
            <View
                style={styles.container}
            >
                <StatusBar translucent={true} backgroundColor="transparent" />
                <View
                    style={styles.header}
                >
                    <View
                        style={styles.search}
                    >
                        <TouchableOpacity
                            style={styles.searchBar}
                            activeOpacity={1}
                            onPress={() => Navigation.navigate('Search')}
                        >
                            <Icon name={'search'}/>
                            <Text style={{marginLeft: 10}}>宝贝关键词搜索</Text>
                            <Text style={{marginLeft: 10, color: '#E94F62'}}>领券省钱</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.littleButton}
                            onPress={() => Navigation.navigate('Kefu')}
                            activeOpacity={1}
                        >
                            <Icon name={'customer-service'} size={'xs'} color={'#fff'}/>
                            <Text style={{fontSize: 10, color: '#fff'}}>客服</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Tabs
                    tabs={tabs}
                    tabBarActiveTextColor={'#fff'}
                    tabBarInactiveTextColor={'#fff'}
                    tabBarBackgroundColor={'#E94F62'}
                    tabBarUnderlineStyle={{backgroundColor: '#fff'}}
                >
                    <Tui/>
                    <SalesList cat_id={1}/>
                    <SalesList cat_id={2}/>
                    <SalesList cat_id={3}/>
                    <SalesList cat_id={4}/>
                    <SalesList cat_id={5}/>
                    <SalesList cat_id={6}/>
                    <SalesList cat_id={7}/>
                    <SalesList cat_id={8}/>
                    <SalesList cat_id={9}/>
                    <SalesList cat_id={10}/>
                    <SalesList cat_id={11}/>
                    <SalesList cat_id={12}/>
                    <SalesList cat_id={13}/>
                    <SalesList cat_id={15}/>
                    <SalesList cat_id={16}/>
                    <SalesList cat_id={17}/>
                    <SalesList cat_id={14}/>
                </Tabs>
            </View>
        )
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
        height: '100%'
    }
});
