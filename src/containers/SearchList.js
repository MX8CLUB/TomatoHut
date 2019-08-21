/**
 * 搜索
 * @author Jim
 * @date 2019/07/05
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
import * as searchList from "../actions/searchList";
import {connect} from "react-redux";

const {width, height} = Dimensions.get('window');
class SearchList extends Component {

    componentDidMount() {
        const {page, sort} = this.props.SearchListState;
        const {SearchListRequest, SearchListKeyword} = this.props.SearchListActions;
        SearchListKeyword(this.props.navigation.state.params.keyword);
        SearchListRequest(this.props.navigation.state.params.keyword, page, sort);
    }

    componentWillUnmount() {
        this.props.SearchListActions.SearchListUnmount();
    }

    /**
     * 获取搜索列表
     */
    getList(page) {
        const {pageLoading, keyword, sort} = this.props.SearchListState;
        const {SearchListRequest, SearchListKeyword} = this.props.SearchListActions;
        if(!keyword){
            Toast.info('请输入商品名称', 3, undefined, false);
            return;
        }
        // 判断是否加载完成
        if (pageLoading) return;
        SearchListRequest(keyword, page, sort);
        this.rc.finishRefresh();
    }

    render() {
        const {list, keyword, page, sort, pageLoading, pageFinish, pageError} = this.props.SearchListState;
        const {SearchListKeyword, SearchListSort, SearchListRequest} = this.props.SearchListActions;
        return (
            <View
                style={styles.container}
            >
                <StatusBar translucent={true} backgroundColor="transparent" />
                <View
                    style={styles.header}
                >
                    <TouchableOpacity
                        style={{width: 22, height: 22}}
                        onPress={() => Navigation.pop()}
                    >
                        <Icon name={'left'} color={'#fff'}/>
                    </TouchableOpacity>
                    <View
                        style={styles.search}
                    >

                        <View
                            style={styles.searchBar}
                        >
                            <Icon name={'search'}/>
                            <TextInput
                                style={{flex: 1, paddingVertical: 0,}}
                                underlineColorAndroid={'transparent'}
                                placeholder={'复制淘宝标题搜索 领券省钱'}
                                onChangeText={(keyword) => SearchListKeyword(keyword)}
                                value={keyword}
                                onSubmitEditing={() => this.getList(1)}
                            />
                            {
                                keyword ? <TouchableOpacity
                                    onPress={() => SearchListKeyword('')}
                                >
                                    <Icon name={'close-circle'} style={{paddingHorizontal: 5}}/>
                                </TouchableOpacity> : null
                            }
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 30,
                                    width: 50,
                                    borderBottomRightRadius: 15,
                                    borderTopRightRadius: 15,
                                    backgroundColor: '#E9C3C7',
                                }}
                                onPress={() => this.getList(1)}
                            >
                                <Text
                                    style={{fontSize: 14, color: '#E94F62'}}
                                >
                                    搜索
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Flex
                    direction='row'
                    style={{backgroundColor: '#fff', height: 40}}
                >
                    <TouchableOpacity
                        style={styles.sort_button}
                        onPress={() => {
                            SearchListSort(14);
                            SearchListRequest(keyword, 1, 14);
                        }}
                    >
                        <Text style={[styles.sort_button_text, {color: (sort===14)?'#E94F62':null}]}>综合</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.sort_button}
                        onPress={() => {
                            SearchListSort(11);
                            SearchListRequest(keyword, 1, 11);
                        }}
                    >
                        <Text style={[styles.sort_button_text, {color: (sort===11)?'#E94F62':null}]}>销量</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.sort_button}
                        onPress={() => {
                            if(sort===1){
                                SearchListSort(2);
                                SearchListRequest(keyword, 1, 2);
                            }else{
                                SearchListSort(1);
                                SearchListRequest(keyword, 1, 1);
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
    const SearchListState = state.SearchList;
    return {
        SearchListState,
    };
};

const mapDispatchToProps = (dispatch) => {
    const SearchListActions = bindActionCreators(searchList, dispatch);
    return {
        SearchListActions,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
