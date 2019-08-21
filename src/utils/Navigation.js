/**
 * 跳转组件
 */
import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

/**
 * 添加Ref引用
 * @param navigatorRef
 */
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

/**
 * navigate跳转
 * @param routeName 路由名字
 * @param params 参数
 */
function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

/**
 * 替换页面
 */
function replace(routeName, params) {
    _navigator.dispatch(
        StackActions.replace({
            routeName,
            params,
        })
    );
}

/**
 * 返回上一页
 */
function pop() {
    _navigator.dispatch(
        StackActions.pop()
    );
}

/**
 * 返回顶部页面
 */
function popToTop() {
    _navigator.dispatch(
        StackActions.popToTop()
    );
}

// add other navigation functions that you need and export them

export default {
    navigate,
    pop,
    popToTop,
    replace,
    setTopLevelNavigator,
};
