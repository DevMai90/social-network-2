const initialState = {
  jobs: [],
  jon: null,
  loading: true,
  error: {}
};

export default function(state = initialdState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}
