const initialState = {
    userData: [],
};

const rootReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_NEW_DATA':
      return {
        ...state,
        userData: action.data.userData,
      };
    default:
      return state;
  }
};

export default rootReducers;
