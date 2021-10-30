import actionType from '../actionType';

// state
const initialState = {
  sharedLayout: false,
};

// fungsi reducer untuk mengambil atau merubah state
const workReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.setWorkSharedLayout:
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

export default workReducer;
