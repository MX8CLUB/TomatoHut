const initialState = {
    /**
     * 存放列表信息
     */
    data: [],
    /**
     * 下次请求页面
     */
    page: 1,
    /**
     * 是否下拉刷新
     */
    refreshing: false,
};

export default function Main(state = initialState, action) {
    switch (action.type) {
        case 'MainRequestSuccess':
            return {
                ...state,
                data: state.data.concat(action.data),
            };
        case 'MainSetPage':
            return {
                ...state,
                page: action.page
            };
        case 'MainSetRefreshing':
            return {
                ...state,
                refreshing: action.refreshing
            };
        case 'MainUnmount':
            return {
                ...state,
                data: [],
                page: 1,
            };
        default:
            return state;
    }
}