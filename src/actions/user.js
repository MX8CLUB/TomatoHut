/**
 * 登录请求
 */
export function UserRequest(info) {
  return {
    type: 'UserRequest',
    info,
  };
}

/**
 * 手机登录
 */
export function UserPhoneLogin(phone, code) {
  return {
    type: 'UserPhoneLogin',
    phone,
    code,
  };
}

/**
 * 登录成功
 */
export function UserRequestSuccess(data) {
  return {
    type: 'UserRequestSuccess',
    data,
  };
}

/**
 * 设置State
 */
export function UserSet(isLogin, data) {
  return {
    type: 'UserSet',
    isLogin,
    data,
  };
}

/**
 * User卸载
 */
export function UserUnmount() {
  return {
    type: 'UserUnmount',
  };
}
