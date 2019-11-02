/**
 * 商品列表
 * @author Jim
 * @date 2019/09/25
 * @update 2019/09/25
 */
import React, {PureComponent} from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Header from './Header';
import {Flex, Icon, WhiteSpace} from '@ant-design/react-native';
import Navigation from '../utils/Navigation';
import {Image as EImage} from 'react-native-elements';
import {Youhuiquan} from './Youhuiquan';
import Empty from './Empty';
import Loading from './Loading';

const {width, height} = Dimensions.get('window');
export default class ItemList extends PureComponent {
  render() {
    const {
      list,
      page,
      pageError,
      pageLoading,
      pageFinish,
      getList,
    } = this.props;
    console.log(pageLoading && page === 1 && !pageFinish);
    if (pageLoading && page === 1 && !pageFinish) {
      return <Loading />;
    }
    if (list.length === 0) {
      return <Empty />;
    }
    return (
      <FlatList
        ref={ref => (this.fl = ref)}
        style={{flex: 1, zIndex: -1}}
        columnWrapperStyle={{paddingHorizontal: 15}}
        data={list}
        onScroll={e => {
          let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
          let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
          let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
          if (offsetY + oriageScrollHeight + 82 >= contentSizeHeight) {
            // 滑动到底部
            if (pageFinish || pageError) {
              return;
            }
            this.props.onScroll();
          }
        }}
        refreshing={pageLoading && page === 1}
        onRefresh={() => {
          this.props.onRefresh();
        }}
        keyExtractor={item => item.itemid}
        numColumns={2}
        renderItem={({item, index}) => {
          let marginRight = index % 2 === 0 ? 15 : null;
          let marginTop = index === 0 || index === 1 ? 10 : null;
          return (
            <TouchableOpacity
              style={[styles.list_box, {marginRight, marginTop}]}
              onPress={() => Navigation.navigate('Item', {itemid: item.itemid})}
              activeOpacity={1}>
              <EImage
                style={{height: (width - 45) / 2, width: (width - 45) / 2}}
                source={{uri: item.itempic + '_310x310.jpg'}}
                PlaceholderContent={<ActivityIndicator color="#fff" />}
              />
              <View style={styles.list_box_body}>
                <Text style={{marginVertical: 5}} numberOfLines={2}>
                  {item.itemtitle}
                </Text>
                <Text>{item.shopname}</Text>
                <Youhuiquan
                  now={item.itemendprice}
                  old={item.itemprice}
                  quan={item.couponmoney}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: '#ccc',
                    marginVertical: 10,
                  }}>
                  {item.itemsale}件已售
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={WhiteSpace}
        ListFooterComponent={() => {
          if (pageFinish) {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  backgroundColor: '#f3f3f3',
                }}>
                <Text>加载完成...</Text>
              </View>
            );
          } else if (pageLoading && page !== 1) {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  backgroundColor: '#f3f3f3',
                }}>
                <ActivityIndicator size="small" />
                <Text>加载中...</Text>
              </View>
            );
          } else {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  backgroundColor: '#f3f3f3',
                }}
              />
            );
          }
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  list_box: {
    backgroundColor: '#fff',
    width: (width - 45) / 2,
    borderRadius: 5,
  },
  list_box_body: {
    paddingHorizontal: 5,
  },
});
