/**
 * 搜索关键词
 */
export function ClassifyListKeyword(keyword) {
    return {
        type: 'ClassifyListKeyword',
        keyword
    }
}

/**
 * 请求开始
 * saga
 */
export function ClassifyListRequest(keyword, cid, page, sort) {
    return {
        type: 'ClassifyListRequest',
        keyword,
        cid,
        page,
        sort,
    }
}

/**
 * 请求结束
 * saga结束返回列表
 */
export function ClassifyListRequestEnd(data, first = false) {
    return {
        type: 'ClassifyListRequestEnd',
        data,
        first
    }
}

/**
 * 页面加载完成
 */
export function ClassifyListRequestFinish() {
    return {
        type: 'ClassifyListRequestFinish',
    }
}

/**
 * 页面加载错误
 */
export function ClassifyListRequestError() {
    return {
        type: 'ClassifyListRequestError',
    }
}

/**
 * 筛选方式
 */
export function ClassifyListSort(sort) {
    return {
        type: 'ClassifyListSort',
        sort
    }
}

/**
 * 页面卸载
 */
export function ClassifyListUnmount() {
    return {
        type: 'ClassifyListUnmount'
    }
}
