import { POINT, burgerApi } from '../../utils/data';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { checkExpired } from '../check';

export const connect = createAction('FEED_CONNECT');
export const disconnect = createAction('FEED_DISCONNECT');
export const wsConnecting = createAction('FEED_WS_CONNECTING');
export const wsOpen = createAction('FEED_WS_OPEN');
export const wsClose = createAction('FEED_WS_CLOSE');
export const wsMessage = createAction('FEED_WS_MESSAGE');
export const wsError = createAction('FEED_WS_ERROR');

export const loadOneOrder = createAsyncThunk(
  'feed/loadOneOrder',
  async (number, thunkApi) => {
    const point = `${POINT.ORDERS}/${number}`;
    return burgerApi
      .makeRequest(point)
      .then((res) => checkExpired(res, point, loadOneOrder(number), thunkApi));
  },
);

// ################
// ################
// ################
// ################
// ################

// import { LiveTableActionType } from '../../utils/live-table';

// const insertData = (table, action) => {
//   return [
//     ...table.slice(0, action.data.pos),
//     ...action.data.rows,
//     ...table.slice(action.data.pos),
//   ];
// };

// const deleteData = (table, action) => {
//   return table.filter(({ id }) => !action.data.includes(id));
// };

// const updateData = (table, action) => {
//   return table.map((row) => {
//     const index = action.data.findIndex(
//       (updatedRow) => updatedRow.id === row.id,
//     );
//     if (index !== -1) {
//       return action.data[index];
//     }
//     return row;
//   });
// };

// const moveData = (prevTable, action) => {
//   const table = [...prevTable];
//   action.data.forEach((move) => {
//     table.splice(move.to, 0, table.splice(move.from, 1)[0]);
//   });
//   return table;
// };

// export const liveTableUpdate = (prevTable, actions) => {
//   let table = prevTable;
//   actions.forEach((action) => {
//     switch (action.type) {
//       case LiveTableActionType.DATA:
//         table = action.data;
//         break;
//       case LiveTableActionType.INSERT:
//         table = insertData(table, action);
//         break;
//       case LiveTableActionType.DELETE:
//         table = deleteData(table, action);
//         break;
//       case LiveTableActionType.UPDATE:
//         table = updateData(table, action);
//         break;
//       case LiveTableActionType.MOVE:
//         table = moveData(table, action);
//         break;
//       default:
//         break;
//     }
//   });

//   return table;
// };