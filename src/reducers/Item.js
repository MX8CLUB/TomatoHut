const initialState = {
    /**
     * 存放信息
     */
    data: [],
    /**
     * 页面加载
     */
    pageLoading: false,
    /**
     * 加载错误
     */
    pageError: false,
};

export default function Item(state = initialState, action) {
    switch (action.type) {
        case 'ItemRequest':
            return {
                ...state,
                pageLoading: true,
                pageError: false
            };
        case 'ItemRequestEnd':
            return {
                ...state,
                data: action.data,
                pageLoading: false,
            };
        case 'ItemRequestFinish':
            return {
                ...state,
                pageLoading: false,
            };
        case 'ItemRequestError':
            return {
                ...state,
                pageLoading: false,
                pageError: true,
            };
        case 'ItemUnmount':
            return initialState;
        default:
            return state;
    }
}
