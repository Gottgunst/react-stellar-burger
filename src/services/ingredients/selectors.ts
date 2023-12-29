import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'services/store';
import { IIngredientsSlice } from 'types';

export const activeGroup = createSelector(
  (store: RootState) => store.ingredients,
  (ingredients: IIngredientsSlice) =>
    ingredients.group.find((tab) => tab.active),
);

export const isItemsMap = createSelector(
  (store: RootState) => store.ingredients,
  (ingredients: IIngredientsSlice) =>
    (ingredients.itemsMap.length as unknown as number) !== 0,
);
