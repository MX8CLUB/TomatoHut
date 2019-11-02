const initialState = {
  /**
   * 存放信息
   */
  data: {},
  /**
   * 是否登录
   */
  isLogin: false,
};

export default function User(state = initialState, action) {
  switch (action.type) {
    case 'UserRequestSuccess':
      return {
        isLogin: true,
        data: action.data,
      };
    case 'UserSet':
      return {
        isLogin: action.isLogin,
        data: {
          ...state.data,
          ...action.data,
        },
      };
    case 'UserUnmount':
      return initialState;
    default:
      return state;
  }
}
