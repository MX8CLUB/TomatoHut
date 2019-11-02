/**
 * 商品筛选（九块九，30封顶等）
 * @author Jim
 * @date 2019/09/25
 * @update 2019/09/25
 */
import React, {PureComponent} from 'react';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import {Flex, Icon} from '@ant-design/react-native';
import ItemList from '../components/ItemList';
import Request from '../utils/Request';
import Loading from '../components/Loading';

const classify = [
  {title: '全部', cid: 0},
  {title: '女装', cid: 1},
  {title: '男装', cid: 2},
  {title: '内衣', cid: 3},
  {title: '美妆', cid: 4},
  {title: '配饰', cid: 5},
  {title: '鞋品', cid: 6},
  {title: '箱包', cid: 7},
  {title: '儿童', cid: 8},
  {title: '母婴', cid: 9},
  {title: '居家', cid: 10},
  {title: '美食', cid: 11},
  {title: '数码', cid: 12},
  {title: '家电', cid: 13},
  {title: '车品', cid: 15},
  {title: '文体', cid: 16},
  {title: '宠物', cid: 17},
  {title: '其他', cid: 14},
];

export default class Special extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      type: this.props.navigation.state.params.type,
      title: this.props.navigation.state.params.title,
      page: 1,
      sort: 14,
      cid: 0,
      pageLoading: false,
      pageFinish: false,
      pageError: false,
    };
    this.getList(1, this.state.sort, this.state.cid);
  }
  /**
   * 获取列表数据
   */
  getList(page, sort, cid) {
    if (this.state.pageLoading) {
      return;
    }
    if (page === 1) {
      this.setState({
        data: [],
        pageLoading: true,
        page: 1,
      });
    }
    this.setState({
      pageLoading: true,
      pageFinish: false,
      pageError: false,
      sort,
      cid,
    });
    const {type} = this.state;
    Request.post('/Haodanku/column/', {
      params: `/type/${type}/back/20/min_id/${page}/item_type/1/sort/${sort}/cid/${cid}`,
    })
      .then(res => {
        if (res.code && res.min_id) {
          this.setState({
            data: page === 1 ? res.data : [...this.state.data, ...res.data],
            pageLoading: false,
            page: res.min_id,
          });
        } else {
          this.setState({
            pageLoading: false,
            pageFinish: true,
          });
        }
      })
      .catch(err => {
        this.setState({
          pageLoading: false,
          pageFinish: true,
          pageError: true,
        });
      });
  }

  render() {
    const {
      data,
      title,
      page,
      sort,
      cid,
      pageLoading,
      pageFinish,
      pageError,
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <Header title={title} />
        <View>
          <FlatList
            style={{backgroundColor: '#fff', height: 50}}
            keyExtractor={item => item.title + item.cid}
            data={classify}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  style={[
                    {
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      borderBottomWidth: 2,
                      borderBottomColor: '#fff',
                    },
                    item.cid === this.state.cid && {
                      borderBottomColor: '#E94F62',
                    },
                  ]}
                  onPress={() => this.getList(1, sort, item.cid)}>
                  <Text
                    style={item.cid === this.state.cid && {color: '#E94F62'}}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <View
            style={{flexDirection: 'row', backgroundColor: '#fff', height: 40}}>
            <TouchableOpacity
              style={styles.sort_button}
              onPress={() => {
                this.getList(1, 14, cid);
              }}>
              <Text
                style={[
                  styles.sort_button_text,
                  {color: sort === 14 ? '#E94F62' : null},
                ]}>
                综合
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sort_button}
              onPress={() => {
                this.getList(1, 11, cid);
              }}>
              <Text
                style={[
                  styles.sort_button_text,
                  {color: sort === 11 ? '#E94F62' : null},
                ]}>
                销量
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sort_button}
              onPress={() => {
                if (sort === 1) {
                  this.getList(1, 2, cid);
                } else {
                  this.getList(1, 1, cid);
                }
              }}>
              <Text
                style={[
                  styles.sort_button_text,
                  {color: sort === 1 || sort === 2 ? '#E94F62' : null},
                ]}>
                价格
                {sort === 1 ? (
                  <Icon size={'xxs'} name={'up'} />
                ) : sort === 2 ? (
                  <Icon size={'xxs'} name={'down'} />
                ) : null}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ItemList
          list={data}
          page={page}
          pageError={pageError}
          pageLoading={pageLoading}
          pageFinish={pageFinish}
          getList={page => this.getList(page)}
          onRefresh={() => this.getList(1, sort, cid)}
          onScroll={() => this.getList(page, sort, cid)}
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
  sort_button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sort_button_text: {
    color: '#000',
    fontSize: 16,
  },
});
