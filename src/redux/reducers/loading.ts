import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoading: false,
}; 

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialAuthState,
  reducers: {
    reload(state) {
        state.isLoading = true;
        setTimeout(() => {
            state.isLoading = false;
        }, 50);
    },
    beginLoading(state) {
      state.isLoading = true;
    },
    finishLoading(state) {
      state.isLoading = false;
    }
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;
