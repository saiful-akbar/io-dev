import actionType from "./actionType";

// state
const initialState = {
  transition: {
    duration: 0.7,
    ease: [0.6, 0.4, 0.2, 0.9],
  },
};

// fungsi reducer untuk mengambil atau merubah state
const animateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.setAnimateTransition:
      return {
        ...state,
        transition: action.value,
      };

    default:
      return {
        ...state,
      };
  }
};

export default animateReducer;
