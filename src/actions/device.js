/**
 * 设置设备信息
 */
export function DeviceSet(info) {
  return {
    type: 'DeviceSet',
    info,
  };
}

/**
 * 清除设备信息
 */
export function DeviceUnmount() {
  return {
    type: 'DeviceUnmount',
  };
}
