/**
 * 超级分类列表
 * @author Jim
 * @date 2019/07/14
 */
import React, {Component} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image, StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {Flex, Icon, Popover, Toast, WhiteSpace} from "@ant-design/react-native";
import Navigation from "../utils/Navigation";
import {Youhuiquan} from "../components/Youhuiquan";
import {SmartRefreshControl, StoreHouseHeader} from "react-native-smartrefreshlayout";
import {bindActionCreators} from "redux";
import * as classifyList from "../actions/classifyList";
import {connect} from "react-redux";
import Header from "../components/Header";

const {width, height} = Dimensions.get('window');
class ClassifyList extends Component {

    componentDidMount() {
        const {page, sort} = this.props.ClassifyListState;
        const {ClassifyListRequest} = this.props.ClassifyListActions;
        const {keyword, cid} = this.props.navigation.state.params;
        ClassifyListRequest(keyword, cid, page, sort);
    }

    componentWillUnmount() {
        this.props.ClassifyListActions.ClassifyListUnmount();
    }

    /**
     * 获取搜索列表
     */
    getList(page) {
        const {pageLoading, sort} = this.props.ClassifyListState;
        const {keyword, cid} = this.props.navigation.state.params;
        const {ClassifyListRequest} = this.props.ClassifyListActions;
        // 判断是否加载完成
        if (pageLoading) return;
        ClassifyListRequest(keyword, cid, page, sort);
        this.rc.finishRefresh();
    }

    render() {
        const {list, page, sort, pageLoading, pageFinish, pageError} = this.props.ClassifyListState;
        const {ClassifyListSort, ClassifyListRequest} = this.props.ClassifyListActions;
        const {keyword} = this.props.navigation.state.params;
        return (
            <View
                style={styles.container}
            >
                <StatusBar translucent={true} backgroundColor="transparent" />
                <Header
                    title={keyword}
                />
                <Flex
                    direction='row'
                    style={{backgroundColor: '#fff', height: 40}}
                >
                    <TouchableOpacity
                        style={styles.sort_button}
                        onPress={() => {
                            ClassifyListSort(14);
                            ClassifyListRequest(keyword, 1, 14);
                        }}
                    >
                        <Text style={[styles.sort_button_text, {color: (sort===14)?'#E94F62':null}]}>综合</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.sort_button}
                        onPress={() => {
                            ClassifyListSort(11);
                            ClassifyListRequest(keyword, 1, 11);
                        }}
                    >
                        <Text style={[styles.sort_button_text, {color: (sort===11)?'#E94F62':null}]}>销量</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.sort_button}
                        onPress={() => {
                            if(sort===1){
                                ClassifyListSort(2);
                                ClassifyListRequest(keyword, 1, 2);
                            }else{
                                ClassifyListSort(1);
                                ClassifyListRequest(keyword, 1, 1);
                            }
                        }}
                    >
                        <Text style={[styles.sort_button_text, {color: (sort===1||sort===2)?'#E94F62':null}]}>
                            价格
                            {sort===1?<Icon size={'xxs'} name={'up'}/>:sort===2?<Icon size={'xxs'} name={'down'}/>:null}
                        </Text>
                    </TouchableOpacity>
                </Flex>
                <FlatList
                    style={{zIndex: -1,}}
                    columnWrapperStyle={{paddingHorizontal: 15}}
                    data={list}
                    onScroll={(e) => {
                        let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
                        let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
                        let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
                        if (offsetY + oriageScrollHeight + 82 >= contentSizeHeight) {
                            // 滑动到底部
                            if(pageFinish||pageError) return;
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
                    keyExtractor={item => item.itemid}
                    numColumns={2}
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
                        if (pageFinish) {
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
                        } else if (pageLoading) {
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
    header: {
        flexDirection: 'row',
        backgroundColor: '#E94F62',
        alignItems: 'center',
        height: 40 + StatusBar.currentHeight,
        paddingVertical: 5,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 5,
    },
    search: {
        flex: 1,
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
    sort_button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sort_button_text: {
        color: '#000',
        fontSize: 16
    },
    list_box: {
        backgroundColor: '#fff',
        width: (width - 45) / 2,
        borderRadius: 5,
    },
    list_box_body: {
        paddingHorizontal: 5,
    }
});

const mapStateToProps = (state) => {
    const ClassifyListState = state.ClassifyList;
    return {
        ClassifyListState,
    };
};

const mapDispatchToProps = (dispatch) => {
    const ClassifyListActions = bindActionCreators(classifyList, dispatch);
    return {
        ClassifyListActions,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassifyList);
