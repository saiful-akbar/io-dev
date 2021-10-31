import actionType from "../actionType";

// state
const initialState = {
  sharedLayout: false,
};

// fungsi reducer untuk mengambil atau merubah state
const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.setProjectSharedLayout:
      return {
        ...state,
        sharedLayout: action.value,
      };

    default:
      return {
        ...state,
      };
  }
};

export default projectReducer;
