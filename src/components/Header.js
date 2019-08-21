/**
 * 头部组件
 */
import React from "react";
import {Text, TouchableOpacity, StyleSheet, View, StatusBar} from "react-native";
import Navigation from "../utils/Navigation";
import {Icon} from "@ant-design/react-native";

const Header = ({
    title,
    headerLeft,
                }) => {
    return (
        <View
            style={styles.header}
        >
            {
                headerLeft?headerLeft:
                    <TouchableOpacity
                        style={{width: 22, height: 22}}
                        onPress={() => Navigation.pop()}
                    >
                        <Icon name={'left'} color={'#fff'} />
                    </TouchableOpacity>
            }
            <Text
                style={{fontSize: 16, color: '#fff'}}
            >
                {title}
            </Text>
            <View style={{width: 22, height: 22}}/>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E94F62',
        height: 40 + StatusBar.currentHeight,
        paddingTop: StatusBar.currentHeight+5,
        paddingBottom: 5,
        paddingHorizontal: 5,
    },
});

export default Header;
