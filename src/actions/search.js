/**
 * 获取关键词
 * @constructor
 */
export function SearchHotKeyRequest() {
    return {
        type: 'SearchHotKeyRequest'
    }
}

/**
 * 获取关键词结束
 * @constructor
 */
export function SearchHotKeyRequestEnd(hotKey) {
    return {
        type: 'SearchHotKeyRequestEnd',
        hotKey
    }
}

/**
 * 设置关键词
 * @constructor
 */
export function SearchKeyword(keyword) {
    return {
        type: 'SearchKeyword',
        keyword
    }
}

/**
 * 页面卸载
 * @constructor
 */
export function SearchUnmount() {
    return {
        type: 'SearchUnmount'
    }
}
