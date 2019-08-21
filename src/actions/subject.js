/**
 * 请求开始
 * saga
 */
export function SubjectRequest(id) {
    return {
        type: 'SubjectRequest',
        id,
    }
}

/**
 * 请求结束
 * saga结束返回列表
 */
export function SubjectRequestEnd(data) {
    return {
        type: 'SubjectRequestEnd',
        data,
    }
}

/**
 * 页面加载错误
 */
export function SubjectRequestError() {
    return {
        type: 'SubjectRequestError',
    }
}

/**
 * 页面卸载
 */
export function SubjectUnmount() {
    return {
        type: 'SubjectUnmount'
    }
}
