import { createSelector } from '@reduxjs/toolkit';

export const activeGroup = createSelector(
  (store) => store.ingredients,
  (ingredients) => ingredients.group.find((tab) => tab.active),
);
