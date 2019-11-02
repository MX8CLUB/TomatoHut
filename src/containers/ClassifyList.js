/**
 * 超级分类列表
 * @author Jim
 * @date 2019/07/14
 * @update 2019/09/21
 */
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image as EImage} from 'react-native-elements';
import {Flex, Icon, Popover, Toast, WhiteSpace} from '@ant-design/react-native';
import Navigation from '../utils/Navigation';
import {Youhuiquan} from '../components/Youhuiquan';
import {bindActionCreators} from 'redux';
import * as classifyList from '../actions/classifyList';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Empty from '../components/Empty';
import ItemList from '../components/ItemList';

const {width, height} = Dimensions.get('window');
class ClassifyList extends Component {
  componentDidMount() {
    const {page, sort} = this.props.ClassifyListState;
    const {ClassifyListRequest} = this.props.ClassifyListActions;
    const {keyword, cid} = this.props.navigation.state.params;
    ClassifyListRequest(keyword, cid, page, sort);
  }

  componentWillUnmount() {
    this.props.ClassifyListActions.ClassifyListUnmount();
  }

  /**
   * 获取搜索列表
   */
  getList(page) {
    const {pageLoading, sort} = this.props.ClassifyListState;
    const {keyword, cid} = this.props.navigation.state.params;
    const {ClassifyListRequest} = this.props.ClassifyListActions;
    // 判断是否加载完成
    if (pageLoading) {
      return;
    }
    ClassifyListRequest(keyword, cid, page, sort);
  }

  render() {
    const {
      list,
      page,
      sort,
      pageLoading,
      pageFinish,
      pageError,
    } = this.props.ClassifyListState;
    const {
      ClassifyListSort,
      ClassifyListRequest,
    } = this.props.ClassifyListActions;
    const {keyword} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <Header title={keyword} />
        <Flex direction="row" style={{backgroundColor: '#fff', height: 40}}>
          <TouchableOpacity
            style={styles.sort_button}
            onPress={() => {
              ClassifyListSort(14);
              ClassifyListRequest(keyword, 1, 1, 14);
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
              ClassifyListSort(11);
              ClassifyListRequest(keyword, 1, 1, 11);
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
                ClassifyListSort(2);
                ClassifyListRequest(keyword, 1, 1, 2);
              } else {
                ClassifyListSort(1);
                ClassifyListRequest(keyword, 1, 1, 1);
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
        </Flex>
        <ItemList
          list={list}
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
  header: {
    flexDirection: 'row',
    backgroundColor: '#E94F62',
    alignItems: 'center',
    height: 40 + StatusBar.currentHeight,
    paddingVertical: 5,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 5,
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 10,
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

const mapStateToProps = state => {
  const ClassifyListState = state.ClassifyList;
  return {
    ClassifyListState,
  };
};

const mapDispatchToProps = dispatch => {
  const ClassifyListActions = bindActionCreators(classifyList, dispatch);
  return {
    ClassifyListActions,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClassifyList);
