import { createSlice } from "@reduxjs/toolkit";

const bandsSlice = createSlice({
  name: "bands",
  initialState: {
    entities: [],
  },
  reducers: {
    // create reducer methods
    bandsAdded(state, action) {
      state.entities.push(action.payload);
    },
  },
});

// export the action creators
export const { bandsAdded } = bandsSlice.actions;

export default bandsSlice.reducer;
