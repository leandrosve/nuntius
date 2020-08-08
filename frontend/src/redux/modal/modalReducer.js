const initialState = {
  contentType: null,
  contentProps: {},
  open: false,
};

function modal(state = initialState, action) {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        modalType: action.modalType,
        contentType: action.contentType,
        contentProps: action.contentProps,
        open: true,
      };
    case "HIDE_MODAL":
      return initialState;
    default:
      return state;
  }
}

export default modal;
