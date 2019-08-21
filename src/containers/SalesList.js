/**
 * 分类列表
 * @author Jim
 * @date 2019/07/13
 */
import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SmartRefreshControl, StoreHouseHeader} from "react-native-smartrefreshlayout";
import Navigation from "../utils/Navigation";
import {Youhuiquan} from "../components/Youhuiquan";
import {Flex, Icon, WhiteSpace} from "@ant-design/react-native";
import Request from '../utils/Request';

const {width, height} = Dimensions.get('window');
export default class SalesList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            finish: false,
            error: false,
            data: [],
            page: 1,
        };
        this.getList(1);
    }

    /**
     * 获取列表数据
     */
    getList(page){
        if(this.state.loading) return;
        this.setState({
            loading: true,
            finish: false,
            error: false,
        });
        const {cat_id} = this.props;
        Request.post('https://go.tomatohut.cn/api/Haodanku/sales_list', {
            sale_type: 1,
            cid: cat_id,
            min_id: page,
        })
            .then(res => {
                if(res.code && res.min_id){
                    this.setState({
                        data: page===1?res.data:[...this.state.data, ...res.data],
                        loading: false,
                        page: res.min_id
                    })
                }else{
                    this.setState({
                        loading: false,
                        finish: true
                    })
                }
                this.rc.finishRefresh();
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    finish: true,
                    error: true,
                });
                this.rc.finishRefresh();
            });
    }

    render() {
        const {page, data, finish, loading, error} = this.state;
        return (
            <View
                style={styles.container}
            >
                <FlatList
                    style={{zIndex: -1}}
                    data={data}
                    columnWrapperStyle={{paddingHorizontal: 15}}
                    onScroll={(e) => {
                        let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
                        let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
                        let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
                        if (offsetY + oriageScrollHeight + 82 >= contentSizeHeight) {
                            // 滑动到底部
                            if(finish||error) return;
                            this.getList(page);
                        }
                    }}
                    refreshControl={
                        <SmartRefreshControl
                            ref={ref => this.rc = ref}
                            renderHeader={<StoreHouseHeader text={'Loading...'}/>}
                            onRefresh={() => this.getList(1)}
                        />
                    }
                    numColumns={2}
                    keyExtractor={item => item.itemid}
                    renderItem={({item, index}) => {
                        let marginRight = index % 2 === 0 ? 15 : null;
                        let marginTop = (index === 0 || index === 1) ? 10 : null;
                        return (
                            <TouchableOpacity
                                style={[styles.list_box, {marginRight, marginTop}]}
                                onPress={() => Navigation.navigate('Item', {itemid: item.itemid})}
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
                    ItemSeparatorComponent={WhiteSpace}
                    ListFooterComponent={() => {
                        if (finish) {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 40,
                                    backgroundColor: '#f3f3f3'
                                }}>
                                    <Text>加载完成...</Text>
                                </View>
                            )
                        } else if (loading) {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 40,
                                    backgroundColor: '#f3f3f3'
                                }}>
                                    <ActivityIndicator size='small'/>
                                    <Text>加载中...</Text>
                                </View>
                            )
                        } else {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 40,
                                    backgroundColor: '#f3f3f3'
                                }}>

                                </View>
                            );
                        }
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    list_box: {
        backgroundColor: '#fff',
        width: (width - 45) / 2,
        borderRadius: 5,
    },
    list_box_body: {
        paddingHorizontal: 5,
    },
    sort_button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sort_button_text: {
        color: '#000',
        fontSize: 16
    },
});
