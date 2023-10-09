import {
  deleteTaskById,
  getProjectTasks,
  addTask as addTaskApi,
} from '../../utils/todoist-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

// export const addTask = createAsyncThunk(
//   'tasks/addTask',
//   async (payload) => {
//     return await addTaskApi(payload);
//   }
// )

// export const deleteTask = createAsyncThunk(
//   "tasks/deleteTask",
//   async (payload) => {
//     return await deleteTaskById(payload);
// });

// export const loadTasks = createAsyncThunk(
//   "tasks/loadTasks",
//   async (thunkAPI) => {
//     try
//     {
//       return await getProjectTasks();
//     }
//     catch (error)
//     {
//       thunkAPI.rejectWithValue(error.message)
//     }
// });
