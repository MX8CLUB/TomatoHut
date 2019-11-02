const initialState = {};

export default function Device(state = initialState, action) {
  switch (action.type) {
    case 'DeviceSet':
      return {
        ...state,
        ...action.info,
      };
    case 'DeviceUnmount':
      return initialState;
    default:
      return state;
  }
}
