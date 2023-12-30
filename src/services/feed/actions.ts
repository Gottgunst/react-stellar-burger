import { createAction } from '@reduxjs/toolkit';
import { TFeedIngredient, TItemsMap, TResponseFeed } from 'types';

export const connect = createAction<string, 'FEED_CONNECT'>('FEED_CONNECT');
export const disconnect = createAction('FEED_DISCONNECT');
export const wsConnecting = createAction('FEED_WS_CONNECTING');
export const wsOpen = createAction('FEED_WS_OPEN');
export const wsClose = createAction('FEED_WS_CLOSE');
export const wsMessage = createAction<TResponseFeed, 'FEED_WS_MESSAGE'>(
  'FEED_WS_MESSAGE',
);
export const wsError = createAction<string, 'FEED_WS_ERROR'>('FEED_WS_ERROR');

export const calcCost = (
  ingredients: string[],
  itemsMap: TItemsMap,
): { ingredients: TFeedIngredient[]; cost: number } | null => {
  let cost = 0;
  let newArray: TFeedIngredient[] = [];
  let hasBun = false;
  let hasUnknownIngredient = false;

  ingredients.forEach((id) => {
    //все ингредиенты должны быть из itemsMap
    if (itemsMap[id]) {
      // должна быть булка
      if (itemsMap[id].type === 'bun') {
        hasBun = true;
      }

      //ловим повторные ингредиенты
      const again = newArray.findIndex((el) => el.id === id);
      if (again > -1) {
        //убираем двойные булки
        if (itemsMap[id].type !== 'bun') {
          newArray[again].q += 1;
          cost += itemsMap[id].price;
        }
      } else {
        newArray = [...newArray, { id, q: 1 }];
        cost += itemsMap[id].price;
      }
    } else hasUnknownIngredient = true;
  });

  return hasBun && !hasUnknownIngredient
    ? { ingredients: newArray.reverse(), cost }
    : null;
};

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
