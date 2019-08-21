/**
 * 商品详情页
 * @author Jim
 * @date 2019/07/06
 */
import React, {Component} from 'react';
import {FlatList, Dimensions, Image, ImageBackground, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Text, Linking, Clipboard, View} from 'react-native';
import {Carousel, Flex, Icon, Portal, Toast, WhiteSpace, WingBlank} from "@ant-design/react-native";
import {bindActionCreators} from "redux";
import * as item from "../actions/item";
import {connect} from "react-redux";
import Navigation from "../utils/Navigation";
import TbParams from "../utils/TbParams";
import Hr from "../components/Hr";

// 百川
import RNAlibcSdk from 'react-native-alibaichuan';
import {Youhuiquan} from "../components/Youhuiquan";

const {width, height} = Dimensions.get('window');
class Item extends Component {

    componentDidMount() {
        RNAlibcSdk.initTae((err) => {
            if (!err)
                console.log('ok')
            else
                console.log(err)
        });
        this.getDetail();
    }

    componentWillUnmount() {
        this.props.ItemActions.ItemUnmount();
    }

    /**
     * 获取详情
     */
    getDetail() {
        const {itemid} = this.props.navigation.state.params;
        this.props.ItemActions.ItemRequest(itemid);
    }

    /**
     * 时间戳转日期
     * @returns {*}
     */
    time(timestamp){
        let date = new Date(parseInt(timestamp+'000'));
        return date.getFullYear() + '.'
            + (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.'
            + (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())
    }

    render() {
        const {data} = this.props.ItemState;
        console.log(data);
        return (
            <View
                style={{flex: 1}}
            >
                <ScrollView
                    style={styles.container}
                >
                    <StatusBar translucent={true} backgroundColor="transparent" />
                    <Carousel>
                        {
                            data.taobao_image ? data.taobao_image.split(',').map((item, index) =>
                                    <Image
                                        key={index}
                                        style={{width: width, height: width}}
                                        source={{uri: item}}
                                    />
                                )
                                : data ? <Image style={{width: width, height: width}} source={{uri: data.itempic}}/> : null
                        }
                    </Carousel>
                    <Flex
                        direction='row'
                        justify='between'
                        style={{backgroundColor: '#fff', paddingHorizontal: 15}}
                    >
                        <Text style={{height: 40, lineHeight: 40, color: '#E94F62'}}>
                            <Text style={{fontSize: 12}}>券后</Text>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>￥{data.itemendprice}</Text>
                            <Text style={{fontSize: 12, color: '#ccc'}}> 价格￥{data.itemprice}</Text>
                        </Text>
                        <Flex direction='row' align='end'>
                            <Text style={{fontSize: 12, color: '#ccc'}}>{data.itemsale}件已售</Text>
                        </Flex>
                    </Flex>
                    <View
                        style={{backgroundColor: '#fff', paddingHorizontal: 15, paddingBottom: 10}}
                    >
                        <Text>
                            {
                                data.shoptype=='B'?
                                    <Image style={{tintColor: '#E94F62', width: 16, height: 16}} source={require("../images/tmall.png")}/>:
                                    <Image style={{tintColor: '#E94F62', width: 16, height: 16}} source={require("../images/taobao.png")}/>
                            }
                            {data.itemtitle}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                // Clipboard.setString(data.tkl);
                                // Toast.info('淘口令复制成功，打开淘宝客户端即可自动跳转领券页面', 5, undefined, false)
                                RNAlibcSdk.show({
                                        type: 'url',
                                        payload: TbParams({
                                            url: data.coupon_click_url
                                        })
                                    }, (err, info) => {
                                    console.log(err);
                                        if (!err)
                                            Toast.success('支付成功！', 2, undefined, false);
                                        else {
                                            Clipboard.setString(data.tkl);
                                            Toast.info('淘口令复制成功，打开淘宝客户端即可自动跳转领券页面', 5, undefined, false)
                                        }
                                    }
                                );
                            }}
                        >
                            <ImageBackground
                                style={styles.youhui}
                                source={require("../images/youhui.png")}
                            >
                                <Text style={{fontSize: 18, color: '#fff'}}>优惠券 <Text style={{fontSize: 24}}>￥{data.couponmoney}</Text></Text>
                                <Text style={{fontSize: 14, color: '#fff'}}>使用期限:{this.time(data.couponstarttime)}-{this.time(data.couponendtime)}</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <WhiteSpace/>
                    <View
                        style={{backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10}}
                    >
                        <Text
                            style={{fontSize: 14, lineHeight: 20}}
                        >
                            {data.itemdesc}
                        </Text>
                    </View>
                    <View
                        style={{position: 'absolute', paddingTop: StatusBar.currentHeight}}
                    >
                        <WingBlank>
                            <TouchableOpacity
                                style={{borderRadius: 15, padding: 5, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center'}}
                                activeOpacity={1}
                                onPress={() => Navigation.pop()}
                            >
                                <Icon name={'left'} size={20}/>
                            </TouchableOpacity>
                        </WingBlank>
                    </View>
                    <WhiteSpace/>
                    <FlatList
                        columnWrapperStyle={{paddingHorizontal: 15}}
                        ListHeaderComponent={
                            <Hr
                                title='猜你喜欢'
                            />
                        }
                        data={data.similar}
                        keyExtractor={item => item.itemid}
                        numColumns={2}
                        ItemSeparatorComponent={WhiteSpace}
                        renderItem={({item, index}) => {
                            let marginRight = index % 2 === 0 ? 15 : null;
                            let marginTop = (index === 0 || index === 1) ? 10 : null;
                            return (
                                <TouchableOpacity
                                    style={[styles.list_box, {marginRight, marginTop}]}
                                    onPress={() => Navigation.replace('Item', {itemid: item.itemid})}
                                    activeOpacity={1}
                                >
                                    <Image style={{height: (width - 45) / 2, width: (width - 45) / 2}}
                                           source={{uri: item.itempic + '_310x310.jpg'}}/>
                                    <View
                                        style={styles.list_box_body}
                                    >
                                        <Text style={{marginVertical: 5}} numberOfLines={2}>{item.itemtitle}</Text>
                                        <Text>{item.shopname}</Text>
                                        <Youhuiquan
                                            now={item.itemendprice}
                                            old={item.itemprice}
                                            quan={item.couponmoney}
                                        />
                                        <Text style={{
                                            fontSize: 12,
                                            color: '#ccc',
                                            marginVertical: 10
                                        }}>{item.itemsale}件已售</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                    <WhiteSpace/>
                </ScrollView>
                <View
                    style={styles.footer}
                >
                    <TouchableOpacity
                        style={{flex: 1, backgroundColor: '#E94F62', justifyContent: 'center', alignItems: 'center'}}
                        activeOpacity={1}
                        onPress={() => {
                            // Clipboard.setString(data.tkl);
                            // Toast.info('淘口令复制成功，打开淘宝客户端即可自动跳转领券页面', 5, undefined, false)
                            RNAlibcSdk.show({
                                    type: 'url',
                                    payload: TbParams({
                                        url: data.coupon_click_url
                                    })
                                }, (err, info) => {
                                    if (!err)
                                        Toast.success('支付成功！', 3, undefined, false);
                                    else {
                                        Clipboard.setString(data.tkl);
                                        Toast.info('淘口令复制成功，打开淘宝客户端即可自动跳转领券页面', 5, undefined, false)
                                    }
                                }
                            );
                        }}
                    >
                        <Text style={{color: '#fff', fontSize: 18}}>领券购买</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    youhui: {
        justifyContent: 'center',
        paddingLeft: 20,
        marginTop:10,
        width: width-30,
        height: (width-30)/4.6
    },
    footer: {
        height: 50,
    },
    list_box: {
        backgroundColor: '#fff',
        width: (width - 45) / 2,
        borderRadius: 5,
    },
    list_box_body: {
        paddingHorizontal: 5,
    },
});

const mapStateToProps = (state) => {
    const ItemState = state.Item;
    return {
        ItemState,
    };
};

const mapDispatchToProps = (dispatch) => {
    const ItemActions = bindActionCreators(item, dispatch);
    return {
        ItemActions,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
