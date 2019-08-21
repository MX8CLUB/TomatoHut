/**
 * 请求开始
 * saga
 */
export function ItemRequest(id) {
    return {
        type: 'ItemRequest',
        id,
    }
}

/**
 * 请求结束
 * saga结束返回列表
 */
export function ItemRequestEnd(data) {
    return {
        type: 'ItemRequestEnd',
        data,
    }
}

/**
 * 页面加载错误
 */
export function ItemRequestError() {
    return {
        type: 'ItemRequestError',
    }
}

/**
 * 页面卸载
 */
export function ItemUnmount() {
    return {
        type: 'ItemUnmount'
    }
}
