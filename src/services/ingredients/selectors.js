import { createSelector } from '@reduxjs/toolkit';

export const activeGroup = createSelector(
  (store) => store.ingredients,
  (ingredients) => ingredients.group.find((tab) => tab.active),
);

export const isItemsMap = createSelector(
  (store) => store.ingredients,
  (ingredients) => ingredients.itemsMap.length !== 0,
);
