import actionType from '../actionType';

// state
const initialState = {
  settings: {
    themeMode: 'light',
    themeColor: 'default',
  },
  cursorHover: false,
  headerColor: 'dark',
};

// fungsi reducer untuk mengambil atau merubah state
const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.setGlobalSettings:
      return {
        ...state,
        settings: action.value,
      };

    case actionType.setGlobalCursorHover:
      return {
        ...state,
        cursorHover: action.value,
      };

    case actionType.setGlobalHeaderColor:
      return {
        ...state,
        headerColor: action.value,
      };

    default:
      return {
        ...state,
      };
  }
};

export default globalReducer;
