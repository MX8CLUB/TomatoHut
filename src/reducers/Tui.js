const initialState = {
    /**
     * 幻灯片信息
     */
    carousel: [],
    /**
     * 热销榜单列表
     */
    salesList: [],
    /**
     * 今日值得买列表
     */
    deserveList: [],
    /**
     * 今日上新列表
     */
    columnList: [],
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
};

export default function Tui(state = initialState, action) {
    switch (action.type) {
        case 'TuiCarouselRequestEnd':
            return {
                ...state,
                carousel: action.list,
            };
        case 'TuiSalesRequestEnd':
            return {
                ...state,
                salesList: action.list,
            };
        case 'TuiDeserveRequestEnd':
            return {
                ...state,
                deserveList: action.list
            };
        case 'TuiColumnRequest':
            return {
                ...state,
                pageLoading: true,
                pageFinish: false,
                pageError: false,
            };
        case 'TuiColumnRequestEnd':
            return {
                ...state,
                columnList: action.first?action.data.data:state.columnList.concat(action.data.data),
                page: action.data.min_id,
                pageLoading: false,
            };
        case 'TuiColumnFinish':
            return {
                ...state,
                pageLoading: false,
                pageFinish: true,
                pageError: false,
            };
        case 'TuiColumnError':
            return {
                ...state,
                pageLoading: false,
                pageFinish: true,
                pageError: true,
            };
        case 'TuiUnmount':
            return initialState;
        default:
            return state;
    }
}
