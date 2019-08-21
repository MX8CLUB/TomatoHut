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

export default function Subject(state = initialState, action) {
    switch (action.type) {
        case 'SubjectRequest':
            return {
                ...state,
                pageLoading: true,
                pageError: false
            };
        case 'SubjectRequestEnd':
            return {
                ...state,
                data: action.data,
                pageLoading: false,
            };
        case 'SubjectRequestFinish':
            return {
                ...state,
                pageLoading: false,
            };
        case 'SubjectRequestError':
            return {
                ...state,
                pageLoading: false,
                pageError: true,
            };
        case 'SubjectUnmount':
            return initialState;
        default:
            return state;
    }
}
