import actionType from "../actionType";
import theme from "src/themes/theme";

// state
const initialState = {
  cursorHover: false,
  bgColor: theme.palette.background.default,
};

// fungsi reducer untuk mengambil atau merubah state
const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.setGlobalCursorHover:
      return {
        ...state,
        cursorHover: action.value,
      };

    case actionType.setGlobalBgColor:
      return {
        ...state,
        bgColor: action.value,
      };

    default:
      return {
        ...state,
      };
  }
};

export default globalReducer;
