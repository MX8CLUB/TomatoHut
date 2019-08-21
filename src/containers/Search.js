/**
 * 搜索
 * @author Jim
 * @date 2019/07/05
 */
import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar} from 'react-native';
import {Flex, Icon, Toast, WhiteSpace, WingBlank} from "@ant-design/react-native";
import Navigation from "../utils/Navigation";
import {bindActionCreators} from "redux";
import * as search from "../actions/search";
import {connect} from "react-redux";
import Header from "../components/Header";

class Search extends Component {

    componentDidMount() {
        this.props.SearchActions.SearchHotKeyRequest();
    }

    componentWillUnmount() {
        this.props.SearchActions.SearchUnmount();
    }

    /**
     * 搜索
     */
    search(keyword) {
        if(keyword){
            Navigation.navigate('SearchList', {keyword})
        }else{
            this.props.SearchActions.SearchUnmount();
            Toast.info('请输入商品名称', 3, undefined, false);
        }
    }

    render() {
        const { keyword, hotKey } = this.props.SearchState;
        const {SearchKeyword} = this.props.SearchActions;
        return (
            <View
                style={styles.container}
            >
                <StatusBar translucent={true} backgroundColor="transparent" />
                <Header
                    title={'搜索'}
                />
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
                            placeholder={'宝贝关键词搜索 领券省钱'}
                            onChangeText={(keyword) => SearchKeyword(keyword)}
                            value={keyword}
                            onSubmitEditing={() => this.search(keyword)}
                        />
                        {
                            keyword ? <TouchableOpacity
                                onPress={() => SearchKeyword('')}
                            >
                                <Icon name={'close-circle'} style={{paddingHorizontal: 5}}/>
                            </TouchableOpacity> : null
                        }
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 36,
                                width: 60,
                                borderBottomRightRadius: 18,
                                borderTopRightRadius: 18,
                                backgroundColor: '#E9C3C7',
                            }}
                            onPress={() => this.search(keyword)}
                        >
                            <Text
                                style={{fontSize: 16, color: '#E94F62'}}
                            >
                                搜索
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <WhiteSpace/>
                <WingBlank>
                    {
                        hotKey.length !== 0?<View
                            style={styles.hotKey}
                        >
                            <Text style={{fontSize: 14, color: '#000'}}>猜你喜欢:</Text>
                            <WhiteSpace/>
                            <Flex
                                direction='row'
                                wrap='wrap'
                            >
                                {
                                    hotKey.map((item, index) => {
                                        if(index > 11) return;
                                        return (
                                            <TouchableOpacity
                                                style={{justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: '#f3f3f3', height: 25, marginHorizontal: 5, paddingHorizontal: 5, marginBottom: 10}}
                                                key={index}
                                                onPress={() => this.search(item.keyword)}
                                            >
                                                <Text style={{color: '#000'}}>{item.keyword}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </Flex>
                        </View>:null
                    }
                </WingBlank>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E94F62',
        height: 40 + StatusBar.currentHeight,
        paddingVertical: 5,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 5,
    },
    search: {
        flexDirection: 'row',
        backgroundColor: '#E94F62',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 36,
        paddingLeft: 10,
        borderRadius: 18,
    }
});

const mapStateToProps = (state) => {
    const SearchState = state.Search;
    return {
        SearchState,
    };
};

const mapDispatchToProps = (dispatch) => {
    const SearchActions = bindActionCreators(search, dispatch);
    return {
        SearchActions,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
