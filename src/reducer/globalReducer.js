import actionType from './actionType';

// state
const initialState = {
  appName: 'IO Dev',
  appVersion: 'v1.0.0',
  setting: {
    themeMode: 'light',
    color: 'default',
  },
  header: {
    color: 'dark',
    show: true,
  },
  cursorHover: false,
};

// fungsi reducer untuk mengambil atau merubah state
const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.setGlobalSetting:
      return {
        ...state,
        setting: action.value,
      };

    case actionType.setGlobalHeader:
      return {
        ...state,
        header: action.value,
      };

    case actionType.setGlobalCursorHover:
      return {
        ...state,
        cursorHover: action.value,
      };

    default:
      return {
        ...state,
      };
  }
};

export default globalReducer;
