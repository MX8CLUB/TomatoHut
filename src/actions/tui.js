/**
 * 获取幻灯
 * @constructor
 */
export function TuiCarouselRequest() {
    return {
        type: 'TuiCarouselRequest'
    }
}

/**
 * 获取幻灯结束
 * @constructor
 */
export function TuiCarouselRequestEnd(list) {
    return {
        type: 'TuiCarouselRequestEnd',
        list
    }
}

/**
 * 获取热销榜单
 * @constructor
 */
export function TuiSalesRequest() {
    return {
        type: 'TuiSalesRequest'
    }
}

/**
 * 获取热销榜单结束
 * @constructor
 */
export function TuiSalesRequestEnd(list) {
    return {
        type: 'TuiSalesRequestEnd',
        list
    }
}

/**
 * 获取今日值得买
 * @constructor
 */
export function TuiDeserveRequest() {
    return {
        type: 'TuiDeserveRequest'
    }
}

/**
 * 获取今日值得买结束
 * @constructor
 */
export function TuiDeserveRequestEnd(list) {
    return {
        type: 'TuiDeserveRequestEnd',
        list
    }
}


/**
 * 获取今日上新
 * @constructor
 */
export function TuiColumnRequest(page) {
    return {
        type: 'TuiColumnRequest',
        page
    }
}

/**
 * 获取今日上新结束
 * @constructor
 */
export function TuiColumnRequestEnd(data, first = false) {
    return {
        type: 'TuiColumnRequestEnd',
        data,
        first
    }
}

/**
 * 今日上新加载完成
 * @constructor
 */
export function TuiColumnFinish() {
    return {
        type: 'TuiColumnFinish',
    }
}

/**
 * 今日上新加载错误
 * @constructor
 */
export function TuiColumnError(error) {
    return {
        type: 'TuiColumnError',
        error
    }
}

/**
 * 页面卸载
 */
export function TuiUnmount() {
    return {
        type: 'TuiUnmount'
    }
}
