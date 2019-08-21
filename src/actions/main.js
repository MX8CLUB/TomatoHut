/**
 * 开始请求数据
 * @param page 页数
 * @returns {{page: number, type: string}}
 * @constructor
 */
export function MainRequest(page = 1) {
    return {
        type: 'MainRequest',
        page
    };
}

/**
 * 设置当前页
 * @param page 页数
 * @returns {{page: *, type: string}}
 * @constructor
 */
export function MainSetPage(page) {
    return {
        type: 'MainSetPage',
        page
    }
}

/**
 * 请求数据成功返回数据
 * @param data
 * @returns {{data: *, type: string}}
 * @constructor
 */
export function MainRequestSuccess(data) {
    return {
        type: 'MainRequestSuccess',
        data
    }
}

/**
 * 页面关闭清除数据
 * @returns {{type: string}}
 * @constructor
 */
export function MainUnmount() {
    return {
        type: 'MainUnmount',
    }
}

/**
 * 设置下拉刷新
 * @returns {{type: string}}
 * @constructor
 */
export function MainSetRefreshing(refreshing) {
    return {
        type: 'MainSetRefreshing',
        refreshing
    }
}