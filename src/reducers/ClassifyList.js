const initialState = {
    /**
     * 存放列表信息
     */
    list: [],
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

export default function ClassifyList(state = initialState, action) {
    switch (action.type) {
        case 'ClassifyListRequest':
            return {
                ...state,
                pageLoading: true,
                pageFinish: false,
                pageError: false
            };
        case 'ClassifyListRequestEnd':
            return {
                ...state,
                list: action.first?action.data.data:state.list.concat(action.data.data),
                page: action.data.min_id,
                pageLoading: false,
            };
        case 'ClassifyListRequestFinish':
            return {
                ...state,
                pageLoading: false,
                pageFinish: true,
            };
        case 'ClassifyListRequestError':
            return {
                ...state,
                pageLoading: false,
                pageFinish: true,
                pageError: true,
            };
        case 'ClassifyListSort':
            return {
                ...state,
                sort: action.sort
            };
        case 'ClassifyListUnmount':
            return initialState;
        default:
            return state;
    }
}
