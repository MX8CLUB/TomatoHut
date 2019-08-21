const initialState = {
    /**
     * 猜你喜欢关键词
     */
    hotKey: [],
    /**
     * 搜索关键词
     */
    keyword: '',
};

export default function Search(state = initialState, action) {
    switch (action.type) {
        case 'SearchHotKeyRequestEnd':
            return {
                ...state,
                hotKey: action.hotKey
            };
        case 'SearchKeyword':
            return {
                ...state,
                keyword: action.keyword
            };
        case 'SearchUnmount':
            return initialState;
        default:
            return state;
    }
}
