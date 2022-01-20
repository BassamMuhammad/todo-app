import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types";
import { RootState } from "../store";

type InitialStateType = {
  tasks: Task[];
};

const initialState: InitialStateType = {
  tasks: [],
};
export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    modifyTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { modifyTasks } = taskSlice.actions;
export const selectTasks = (state: RootState) => state.tasks.tasks;
export default taskSlice.reducer;
