/**
 * @title 空组件
 * @author Jim
 * @date 2019/05/19
 * @param title  标题
 * @param image  图片
 * @param imageStyle  图片样式
 * @param titleStyle  标题样式
 */
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const Empty = ({title, image, imageStyle, resizeMode, titleStyle}) => {
  return (
    <View style={styles.container}>
      <Image
        source={image || require('../images/empty.png')}
        style={[styles.image, imageStyle]}
        resizeMode={resizeMode || 'cover'}
      />
      <Text style={[styles.title, titleStyle]}>{title || '暂时没有数据哦！'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100,
  },
  image: {
    height: 200,
    width: 200,
  },
  title: {
    color: '#000',
  },
});

export default Empty;
