import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialStateType = {
  userId: string | null;
};

const initialState: InitialStateType = {
  userId: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
  },
});

export const { changeUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.userId;
export default userSlice.reducer;
