/**
 * 搜索关键词
 */
export function SearchListKeyword(keyword) {
    return {
        type: 'SearchListKeyword',
        keyword
    }
}

/**
 * 请求开始
 * saga
 */
export function SearchListRequest(keyword, page, sort) {
    return {
        type: 'SearchListRequest',
        keyword,
        page,
        sort,
    }
}

/**
 * 请求结束
 * saga结束返回列表
 */
export function SearchListRequestEnd(data, first = false) {
    return {
        type: 'SearchListRequestEnd',
        data,
        first
    }
}

/**
 * 页面加载完成
 */
export function SearchListRequestFinish() {
    return {
        type: 'SearchListRequestFinish',
    }
}

/**
 * 页面加载错误
 */
export function SearchListRequestError() {
    return {
        type: 'SearchListRequestError',
    }
}

/**
 * 筛选方式
 */
export function SearchListSort(sort) {
    return {
        type: 'SearchListSort',
        sort
    }
}

/**
 * 页面卸载
 */
export function SearchListUnmount() {
    return {
        type: 'SearchListUnmount'
    }
}
