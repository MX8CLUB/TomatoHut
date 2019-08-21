/**
 * 客服
 * @author Jim
 * @date 2019/07/03
 */
import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Clipboard, StyleSheet} from 'react-native';
import {Icon, WingBlank, WhiteSpace, Toast} from "@ant-design/react-native";
import Navigation from "../utils/Navigation";
import Header from "../components/Header";


export default class Kefu extends Component{
    render() {
        return (
            <View
                style={styles.container}
            >
                <View style={{position: 'absolute', height: 150, width: '100%', backgroundColor: '#E94F62'}}/>
                <Header
                    title={'专属客服'}
                />
                <WingBlank>
                    <View
                        style={styles.body}
                    >
                        <Image
                            style={{tintColor: '#E94F62', height: 48, width: 48}}
                            source={require("../images/kefu.png")}
                        />
                        <Text
                            style={{flex: 1, color: '#000', marginLeft: 20, fontSize: 14, lineHeight: 20,}}
                        >
                            使用番茄小屋APP的过程中，您可以添加专属客服，咨询使用问题，番茄小屋专属客服将为您服务
                        </Text>
                    </View>
                </WingBlank>
                <WhiteSpace/>
                <WingBlank>
                    <View
                        style={styles.wechat}
                    >
                        <Image
                            style={{tintColor: '#fff', height: 32, width: 32}}
                            source={require("../images/wechat.png")}
                        />
                        <Text
                            style={{flex: 1, color: '#fff', marginLeft: 20}}
                        >
                            微信:lcc1314624
                        </Text>
                        <TouchableOpacity
                            style={{borderRadius: 20, borderWidth: 1, borderColor: '#fff', paddingHorizontal: 10, paddingVertical: 2}}
                            onPress={() => {
                                Clipboard.setString('lcc1314624');
                                Toast.info("复制成功", 1, undefined, false);
                            }}
                        >
                            <Text style={{color: '#fff'}}>立即复制</Text>
                        </TouchableOpacity>
                    </View>
                </WingBlank>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 150,
        borderRadius: 20,
        paddingHorizontal: 20,
    },
    wechat: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1ED0B8',
        height: 50,
        borderRadius: 20,
        paddingHorizontal: 20,
    }
});
