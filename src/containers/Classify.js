/**
 * 超级分类
 * @author Jim
 * @date 2019/07/14
 * @update 2019/09/23
 */
import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon, Portal, Toast} from '@ant-design/react-native';
import Request from '../utils/Request';
import Header from '../components/Header';
import Hr from '../components/Hr';
import Navigation from '../utils/Navigation';
import Loading from '../components/Loading';

const {width, height} = Dimensions.get('window');
export default class Classify extends Component {
  /**
   * 标题栏配置
   */
  static navigationOptions = ({navigation}) => ({
    title: '超级分类',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name={'appstore'} color={tintColor} />
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sort: null,
      rightData: [],
      error: false,
      loading: true,
      end: false,
    };
    this.getList();
  }

  /**
   * 获取列表
   */
  getList() {
    Request.get('/Haodanku/super_classify')
      .then(res => {
        this.setState({
          data: res.general_classify,
          sort: 0,
          rightData: res.general_classify[0].data,
          loading: false,
          end: true,
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          end: true,
          error: true,
        });
      });
  }

  render() {
    const {data, sort, rightData, loading, end, error} = this.state;
    if (!loading) {
      return (
        <View style={{flex: 1}}>
          <Header title="超级分类" headerLeft={<View />} />
          <View style={styles.container}>
            <FlatList
              style={{
                flexGrow: 0,
                flexShrink: 0,
                width: 100,
                backgroundColor: '#f3f3f3',
              }}
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                let activeStyle = null;
                if (index === sort) {
                  activeStyle = {
                    borderLeftColor: '#E94F62',
                    backgroundColor: '#fff',
                  };
                }
                return (
                  <TouchableOpacity
                    key={item.main_name}
                    style={[styles.leftNav, activeStyle]}
                    activeOpacity={1}
                    onPress={() => {
                      this.sv.scrollTo({y: 0, animated: false});
                      this.setState({
                        sort: index,
                        rightData: data[index].data,
                      });
                    }}>
                    <Text style={{color: '#000'}}>{item.main_name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
            <ScrollView style={{flex: 1}} ref={ref => (this.sv = ref)}>
              {rightData.map((item, index) => {
                return (
                  <View key={item.next_name}>
                    <Hr title={item.next_name} />
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                      {item.info.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={item.son_name}
                            style={{padding: 10, alignItems: 'center'}}
                            activeOpacity={1}
                            onPress={() =>
                              Navigation.navigate('ClassifyList', {
                                keyword: item.son_name,
                                cid: data[sort].cid,
                              })
                            }>
                            <Image
                              style={{
                                width: (width - 165) / 3,
                                height: (width - 165) / 3,
                              }}
                              source={{uri: item.imgurl}}
                            />
                            <Text style={{color: '#000'}}>{item.son_name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return <Loading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  leftNav: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#fff',
    backgroundColor: '#f3f3f3',
  },
});
