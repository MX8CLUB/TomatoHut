/**
 * 推荐栏目
 * @author Jim
 * @date 2019/07/03
 * @update 2019/09/21
 */
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image as EImage} from 'react-native-elements';
import {
  Carousel,
  Flex,
  Icon,
  WhiteSpace,
  WingBlank,
} from '@ant-design/react-native';
import {Youhuiquan} from '../components/Youhuiquan';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tui from '../actions/tui';
import Navigation from '../utils/Navigation';

const {height, width} = Dimensions.get('window');

class Tui extends Component {
  componentDidMount() {
    this.onRefresh();
  }

  /**
   * 刷新
   */
  onRefresh() {
    const {
      TuiCarouselRequest,
      // TuiSalesRequest,
      TuiDeserveRequest,
      TuiColumnRequest,
    } = this.props.TuiActions;
    TuiCarouselRequest();
    // TuiSalesRequest();
    TuiDeserveRequest();
    TuiColumnRequest(1);
  }

  render() {
    const {
      carousel,
      salesList,
      deserveList,
      columnList,
      page,
      pageFinish,
      pageLoading,
      pageError,
    } = this.props.TuiState;
    const {TuiColumnRequest} = this.props.TuiActions;
    return (
      <FlatList
        ListHeaderComponent={
          <View>
            {carousel && carousel.length !== 0 ? (
              <Carousel
                autoplay
                selectedIndex={carousel.length - 1}
                infinite
                bounces={false}>
                {carousel.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={1}
                    onPress={() => Navigation.navigate('Subject', {item})}>
                    <EImage
                      style={{width: width, height: (245 / 600) * width}}
                      source={{
                        uri:
                          'http://img.haodanku.com/' + item.app_image + '-600',
                      }}
                      PlaceholderContent={<ActivityIndicator color="#fff" />}
                    />
                  </TouchableOpacity>
                ))}
              </Carousel>
            ) : null}
            <View style={styles.button_list}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  Navigation.navigate('Special', {title: '9块9', type: 2})
                }
                style={styles.button_box}>
                <Image
                  style={styles.button_image}
                  source={require('../images/index/7.png')}
                />
                <Text style={styles.button_text}>9块9</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  Navigation.navigate('Special', {title: '淘抢购', type: 5})
                }
                style={styles.button_box}>
                <Image
                  style={styles.button_image}
                  source={require('../images/index/5.png')}
                />
                <Text style={styles.button_text}>淘抢购</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  Navigation.navigate('Special', {title: '淘抢购', type: 8})
                }
                style={styles.button_box}>
                <Image
                  style={styles.button_image}
                  source={require('../images/index/8.png')}
                />
                <Text style={styles.button_text}>品牌特卖</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  Navigation.navigate('Special', {title: '天猫超市', type: 11})
                }
                style={styles.button_box}>
                <Image
                  style={styles.button_image}
                  source={require('../images/index/1.png')}
                />
                <Text style={styles.button_text}>天猫超市</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  Navigation.navigate('Classify')
                }
                style={styles.button_box}>
                <Image
                  style={styles.button_image}
                  source={require('../images/index/10.png')}
                />
                <Text style={styles.button_text}>超级分类</Text>
              </TouchableOpacity>
            </View>
            <WhiteSpace />
            <WhiteSpace />
            <WingBlank>
              <View style={styles.sales_list}>
                <Flex justify="start">
                  <Flex.Item>
                    <Text
                      style={{fontSize: 18, color: '#000', fontWeight: 'bold'}}>
                      今日值得买
                    </Text>
                  </Flex.Item>
                </Flex>
              </View>
              <WhiteSpace />
              <FlatList
                data={deserveList}
                keyExtractor={item => item.itemid}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={styles.sales_list_box}
                      activeOpacity={1}
                      onPress={() =>
                        Navigation.navigate('Item', {itemid: item.itemid})
                      }>
                      <EImage
                        style={{height: 150, width: 150}}
                        source={{uri: item.itempic + '_310x310.jpg'}}
                        PlaceholderContent={<ActivityIndicator color="#fff" />}
                      />
                      <View style={{paddingHorizontal: 5}}>
                        <Text style={{marginVertical: 5}} numberOfLines={1}>
                          {item.itemshorttitle}
                        </Text>
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
              />
            </WingBlank>
            <WhiteSpace />
            <WingBlank>
              <View style={styles.sales_list}>
                <Flex justify="start">
                  <Text
                    style={{fontSize: 18, color: '#000', fontWeight: 'bold'}}>
                    今日上新
                  </Text>
                </Flex>
              </View>
            </WingBlank>
            <WhiteSpace />
          </View>
        }
        onScroll={e => {
          let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
          let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
          let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
          if (offsetY + oriageScrollHeight + 82 >= contentSizeHeight) {
            // 滑动到底部
            if (pageFinish || pageError) {
              return;
            }
            TuiColumnRequest(page);
          }
        }}
        refreshing={pageLoading && page === 1}
        onRefresh={() => this.onRefresh()}
        data={columnList}
        keyExtractor={item => item.itemid}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ItemSeparatorComponent={WhiteSpace}
        columnWrapperStyle={{paddingHorizontal: 15}}
        renderItem={({item, index}) => {
          let marginRight = index % 2 === 0 ? 15 : null;
          return (
            <TouchableOpacity
              style={[styles.column_list_box, {marginRight}]}
              activeOpacity={1}
              onPress={() =>
                Navigation.navigate('Item', {itemid: item.itemid})
              }>
              <EImage
                style={{height: (width - 45) / 2, width: (width - 45) / 2}}
                source={{uri: item.itempic + '_310x310.jpg'}}
                PlaceholderContent={<ActivityIndicator color="#fff" />}
              />
              <View style={styles.column_list_box_body}>
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
          } else if (pageLoading) {
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
          } else if (pageError) {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  backgroundColor: '#f3f3f3',
                }}>
                <Text>网络错误...</Text>
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
  sales_list: {},
  sales_list_box: {
    marginRight: 10,
    backgroundColor: '#fff',
    width: 150,
    // paddingHorizontal: 5,
  },
  column_list_box: {
    backgroundColor: '#fff',
    width: (width - 50) / 2,
    // borderRadius: 5,
  },
  column_list_box_body: {
    paddingHorizontal: 5,
  },
  button_list: {
    backgroundColor: '#fff',
    marginVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button_box: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  button_image: {
    width: (width - 5 * 30) / 5,
    height: (width - 5 * 30) / 5,
  },
  button_text: {
    fontSize: 12,
  },
});

const mapStateToProps = state => {
  const TuiState = state.Tui;
  return {
    TuiState,
  };
};

const mapDispatchToProps = dispatch => {
  const TuiActions = bindActionCreators(tui, dispatch);
  return {
    TuiActions,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tui);
