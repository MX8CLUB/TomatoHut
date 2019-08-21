import React from 'react';
import {Image, Text} from "react-native";
import {Flex} from "@ant-design/react-native";

export const Youhuiquan = ({
    now,
    old,
    quan
                           }) => {
    return (
        <Flex direction='row' align='center'>
            <Text numberOfLines={1} style={{flex: 1, color: 'red'}}>￥{now}<Text style={{fontSize: 12, color: '#ccc', textDecorationLine: 'line-through'}}>￥{old}</Text></Text>
            <Flex direction='row' align='end'>
                <Text style={{backgroundColor: '#E94F62', fontSize: 12, color: '#fff', height: 18, paddingHorizontal: 5}}>￥{quan}</Text>
                <Image style={{height: 18, width: 10}} resizeMode={'stretch'} source={require("../images/youhuiquan.png")}/>
            </Flex>
        </Flex>
    )
};