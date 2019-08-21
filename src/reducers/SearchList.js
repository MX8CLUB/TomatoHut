const initialState = {
    /**
     * 存放列表信息
     */
    list: [],
    /**
     * 关键词
     */
    keyword: '',
    /**
     * 加载页数
     */
    page: 1,
    /**
     * 页面加载
     */
    pageLoading: false,
    /**
     * 加载结束
     */
    pageFinish: false,
    /**
     * 加载错误
     */
    pageError: false,
    /**
     * 筛选方式
     */
    sort: 14,
};

export default function SearchList(state = initialState, action) {
    switch (action.type) {
        case 'SearchListKeyword':
            return {
                ...state,
                keyword: action.keyword,
            };
        case 'SearchListRequest':
            return {
                ...state,
                pageLoading: true,
                pageFinish: false,
                pageError: false
            };
        case 'SearchListRequestEnd':
            return {
                ...state,
                list: action.first?action.data.data:state.list.concat(action.data.data),
                page: action.data.min_id,
                pageLoading: false,
            };
        case 'SearchListRequestFinish':
            return {
                ...state,
                pageLoading: false,
                pageFinish: true,
            };
        case 'SearchListRequestError':
            return {
                ...state,
                pageLoading: false,
                pageFinish: true,
                pageError: true,
            };
        case 'SearchListSort':
            return {
                ...state,
                sort: action.sort
            };
        case 'SearchListUnmount':
            return initialState;
        default:
            return state;
    }
}
