/**
 * 分类列表
 * @author Jim
 * @date 2019/07/13
 * @update 2019/09/21
 */
import React, {PureComponent} from 'react';
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
import Navigation from '../utils/Navigation';
import {Youhuiquan} from '../components/Youhuiquan';
import {Flex, Icon, WhiteSpace} from '@ant-design/react-native';
import Request from '../utils/Request';
import ItemList from '../components/ItemList';

const {width, height} = Dimensions.get('window');
export default class SalesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      finish: false,
      error: false,
      data: [],
      page: 1,
    };
    this.getList(1);
  }

  /**
   * 获取列表数据
   */
  getList(page) {
    if (this.state.pageLoading) {
      return;
    }
    this.setState({
      pageLoading: true,
      pageFinish: false,
      pageError: false,
    });
    const {cat_id} = this.props;
    Request.post('/Haodanku/sales_list', {
      sale_type: 1,
      cid: cat_id,
      min_id: page,
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
    const {page, data, pageFinish, pageLoading, pageError} = this.state;
    return (
      <View style={styles.container}>
        <ItemList
          list={data}
          page={page}
          pageError={pageError}
          pageLoading={pageLoading}
          pageFinish={pageFinish}
          getList={page => this.getList(page)}
          onRefresh={() => this.getList(1)}
          onScroll={() => this.getList(page)}
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
});
