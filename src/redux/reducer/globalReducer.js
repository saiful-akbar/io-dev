import actionType from "../actionType";

// state
const initialState = {
  cursorHover: false,
};

// fungsi reducer untuk mengambil atau merubah state
const globalReducer = (state = initialState, action) => {
  switch (action.type) {
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
