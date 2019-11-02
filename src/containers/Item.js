/**
 * 商品详情页
 * @author Jim
 * @date 2019/07/06
 */
import React, {PureComponent} from 'react';
import {
  FlatList,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  Linking,
  Clipboard,
  View,
  ActivityIndicator,
  Image,
  ToastAndroid,
} from 'react-native';
import {
  Carousel,
  Flex,
  Icon,
  Portal,
  Toast,
  WhiteSpace,
  WingBlank,
} from '@ant-design/react-native';
import Navigation from '../utils/Navigation';
import Hr from '../components/Hr';
// 百川
import RNAlibcSdk from 'react-native-alibaichuan';
import {Youhuiquan} from '../components/Youhuiquan';
import TbParams from '../utils/TbParams';
import EImage from '../components/EImage';
import Loading from '../components/Loading';
import Request from '../utils/Request';

const {width, height} = Dimensions.get('window');
export default class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * 存放信息
       */
      data: {
        zhetaoke: {},
        haodanku: {},
      },
      /**
       * 页面加载
       */
      pageLoading: true,
      /**
       * 加载错误
       */
      pageError: false,
    };
  }

  componentDidMount() {
    this.getDetail();
  }

  /**
   * 获取详情
   */
  getDetail() {
    const {itemid} = this.props.navigation.state.params;
    Request.post('/Haodanku/item_detail/', {
      params: `/itemid/${itemid}`,
    })
      .then(res => {
        if (res.code === 1) {
          this.setState({
            data: res.data,
            pageLoading: false,
          });
        } else {
          ToastAndroid.show('网络错误！', ToastAndroid.SHORT);
          this.setState({
            pageLoading: false,
            pageError: true,
          });
        }
      })
      .catch(err => {
        ToastAndroid.show('网络错误！', ToastAndroid.SHORT);
        this.setState({
          pageLoading: false,
          pageError: true,
        });
      });
  }

  /**
   * 时间戳转日期
   * @returns {*}
   */
  time(timestamp) {
    let date = new Date(parseInt(timestamp + '000'));
    return (
      date.getFullYear() +
      '.' +
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      '.' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    );
  }

  render() {
    const {data, pageLoading} = this.state;
    if (pageLoading) {
      return <Loading />;
    }
    if (data) {
      return (
        <View style={{flex: 1}}>
          <ScrollView style={styles.container} removeClippedSubviews={true}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <Carousel>
              {data.zhetaoke.small_images ? (
                data.zhetaoke.small_images
                  .split('|')
                  .map((item, index) => (
                    <EImage
                      key={index}
                      style={{width: width, height: width}}
                      source={{uri: item}}
                      PlaceholderContent={<ActivityIndicator color="#fff" />}
                    />
                  ))
              ) : data ? (
                <EImage
                  style={{width: width, height: width}}
                  source={{uri: data.zhetaoke.pict_url}}
                  PlaceholderContent={<ActivityIndicator color="#fff" />}
                />
              ) : null}
            </Carousel>
            <Flex
              direction="row"
              justify="between"
              style={{backgroundColor: '#fff', paddingHorizontal: 15}}>
              <Text style={{height: 40, lineHeight: 40, color: '#E94F62'}}>
                <Text style={{fontSize: 12}}>券后</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  ￥{data.zhetaoke.quanhou_jiage}
                </Text>
                <Text style={{fontSize: 12, color: '#ccc'}}>
                  {' '}
                  价格￥{data.zhetaoke.size}
                </Text>
              </Text>
              <Flex direction="row" align="end">
                <Text style={{fontSize: 12, color: '#ccc'}}>
                  {data.zhetaoke.sellCount}件已售
                </Text>
              </Flex>
            </Flex>
            <View
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 15,
                paddingBottom: 10,
              }}>
              <Text>
                {data.zhetaoke.user_type == '1' ? (
                  <Image
                    style={{tintColor: '#E94F62', width: 16, height: 16}}
                    source={require('../images/tmall.png')}
                  />
                ) : (
                  <Image
                    style={{tintColor: '#E94F62', width: 16, height: 16}}
                    source={require('../images/taobao.png')}
                  />
                )}
                {data.zhetaoke.tao_title}
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  RNAlibcSdk.show(
                    {
                      type: 'url',
                      payload: TbParams({
                        url: data.gaoyong.coupon_click_url,
                      }),
                    },
                    (err, info) => {
                      if (!err) {
                        Toast.success('支付成功！', 2, undefined, false);
                      } else {
                        Clipboard.setString(data.tkl);
                        Toast.info(
                          '淘口令复制成功，打开淘宝客户端即可自动跳转领券页面',
                          5,
                          undefined,
                          false,
                        );
                      }
                    },
                  );
                }}>
                <ImageBackground
                  style={styles.youhui}
                  source={require('../images/youhui.png')}>
                  <Text style={{fontSize: 18, color: '#fff'}}>
                    优惠券{' '}
                    <Text style={{fontSize: 24}}>
                      ￥{data.haodanku.couponmoney}
                    </Text>
                  </Text>
                  <Text style={{fontSize: 14, color: '#fff'}}>
                    使用期限:{this.time(data.haodanku.start_time)} -{' '}
                    {this.time(data.haodanku.end_time)}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <WhiteSpace />
            <View
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}>
              <Text style={{fontSize: 14}}>
                <Image
                  style={{width: 24, height: 24}}
                  resizeMode={'contain'}
                  source={require('../images/tuijian.png')}
                />
                {data.haodanku.itemdesc}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                paddingTop: StatusBar.currentHeight,
              }}>
              <WingBlank>
                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                    padding: 5,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  activeOpacity={1}
                  onPress={() => Navigation.pop()}>
                  <Icon name={'left'} size={20} />
                </TouchableOpacity>
              </WingBlank>
            </View>
            <WhiteSpace />
            <View>
              {data.zhetaoke.pcDescContent || data.haodanku.taobao_image ? (
                <Hr title="商品详情" />
              ) : null}
              {data.zhetaoke.pcDescContent
                ? data.zhetaoke.pcDescContent.split('|').map((item, index) => {
                    return (
                      <EImage key={index} source={{uri: 'https:' + item}} />
                    );
                  })
                : data.haodanku.taobao_image
                ? data.haodanku.taobao_image.split(',').map((item, index) => {
                    return <EImage key={index} source={{uri: item}} />;
                  })
                : null}
            </View>
            <FlatList
              columnWrapperStyle={{paddingHorizontal: 15}}
              ListHeaderComponent={<Hr title="猜你喜欢" />}
              data={data.similar}
              keyExtractor={item => item.itemid}
              numColumns={2}
              ItemSeparatorComponent={WhiteSpace}
              renderItem={({item, index}) => {
                let marginRight = index % 2 === 0 ? 15 : null;
                let marginTop = index === 0 || index === 1 ? 10 : null;
                return (
                  <TouchableOpacity
                    style={[styles.list_box, {marginRight, marginTop}]}
                    onPress={() =>
                      Navigation.replace('Item', {itemid: item.itemid})
                    }
                    activeOpacity={1}>
                    <EImage
                      style={{
                        height: (width - 45) / 2,
                        width: (width - 45) / 2,
                      }}
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
            />
            <WhiteSpace />
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#E94F62',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              activeOpacity={1}
              onPress={() => {
                // Clipboard.setString(data.tkl);
                // Toast.info(
                //   '淘口令复制成功，打开淘宝客户端即可自动跳转领券页面',
                //   5,
                //   undefined,
                //   false,
                // );
                RNAlibcSdk.show(
                  {
                    type: 'url',
                    payload: TbParams({
                      url: data.gaoyong.coupon_click_url,
                    }),
                  },
                  (err, info) => {
                    if (!err) {
                      Toast.success('支付成功！', 3, undefined, false);
                    } else {
                      Clipboard.setString(data.tkl);
                      Toast.info(
                        '淘口令复制成功，打开淘宝客户端即可自动跳转领券页面',
                        5,
                        undefined,
                        false,
                      );
                    }
                  },
                );
              }}>
              <Text style={{color: '#fff', fontSize: 14}}>领券购买省</Text>
              <Text style={{color: '#fff', fontSize: 14}}>
                ￥{data.haodanku.couponmoney}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  youhui: {
    justifyContent: 'center',
    paddingLeft: 20,
    marginTop: 10,
    width: width - 30,
    height: (width - 30) / 4.6,
  },
  footer: {
    height: 50,
  },
  list_box: {
    backgroundColor: '#fff',
    width: (width - 45) / 2,
    borderRadius: 5,
  },
  list_box_body: {
    paddingHorizontal: 5,
  },
});
