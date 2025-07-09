const reducer = (state, action) => {
  switch (action.type) {
    case "ADD-TODO":
      return [
        ...state,
        {
          id: state.length,
          title: action.payload.title,
          tasks: [],
        },
      ];
  }
};

export default reducer;
