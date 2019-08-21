/**
 * @title 分割线
 * @author Jim
 * @date 2019/07/14
 * @param title  标题
 */
import React from 'react';
import {View, Text} from 'react-native';

const Hr = ({
    title
}) => {
    return (
        <View
            style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20,}}
        >
            <View style={{flex:1 ,backgroundColor: '#B6B6B6', height: 1, marginLeft: 50}}/>
            <Text style={{color: '#000', fontSize: 16, marginHorizontal: 10}}>{title}</Text>
            <View style={{flex:1 ,backgroundColor: '#B6B6B6', height: 1, marginRight: 50}}/>
        </View>
    )
};

export default Hr;
