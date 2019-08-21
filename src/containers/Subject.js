/**
 * 专题列表
 * @author Jim
 * @date 2019/07/12
 */
import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, FlatList, TouchableOpacity, Dimensions, Image, View, StatusBar} from 'react-native';
import {Flex, Icon, Toast, WhiteSpace, WingBlank} from "@ant-design/react-native";
import Navigation from "../utils/Navigation";
import {bindActionCreators} from "redux";
import * as subject from "../actions/subject";
import {connect} from "react-redux";
import Header from "../components/Header";
import {Youhuiquan} from "../components/Youhuiquan";

const {width, height} = Dimensions.get('window');
class Subject extends Component {

    componentDidMount() {
        const {id} = this.props.navigation.state.params.item;
        this.props.SubjectActions.SubjectRequest(id);
    }

    componentWillUnmount() {
        this.props.SubjectActions.SubjectUnmount();
    }

    render() {
        const {data} = this.props.SubjectState;
        const {name, copy_text, show_text, app_image} = this.props.navigation.state.params.item;
        return (
            <View
                style={styles.container}
            >
                <StatusBar translucent={true} backgroundColor="transparent" />
                <Header
                    title={name}
                />
                <Image
                    style={{width: width, height: 245 / 600 * width}}
                    source={{uri: 'http://img.haodanku.com/' + app_image + '-600'}}
                />
                <FlatList
                    data={data}
                    keyExtractor={item => item.itemid}
                    numColumns={2}
                    ItemSeparatorComponent={WhiteSpace}
                    columnWrapperStyle={{paddingHorizontal: 15}}
                    ListHeaderComponent={() => (
                        <Text
                            style={{
                                paddingVertical: 5,
                                fontSize: 14,
                                lineHeight: 20,
                                textAlign: 'center',
                                color: '#000'
                            }}
                        >
                            {copy_text}
                        </Text>
                    )}
                    renderItem={({item, index}) => {
                        let marginRight = index % 2 === 0 ? 15 : null;
                        return (
                            <TouchableOpacity
                                style={[styles.list_box, {marginRight}]}
                                activeOpacity={1}
                                onPress={() => Navigation.navigate('Item', {itemid: item.itemid})}
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
    }
});

const mapStateToProps = (state) => {
    const SubjectState = state.Subject;
    return {
        SubjectState,
    };
};

const mapDispatchToProps = (dispatch) => {
    const SubjectActions = bindActionCreators(subject, dispatch);
    return {
        SubjectActions,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subject);
