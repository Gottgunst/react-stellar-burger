import { IAsyncState } from '.';

export interface IIncomeIngredient {
  _id: string;
  name: string;
  type: TIngredientsType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}
export interface IIngredient extends IIncomeIngredient {
  quantity: number;
  key?: string;
}

/*################
## Ingredients Slice ##
#################*/

export interface IIngredientsSlice extends IAsyncState {
  itemsMap: TItemsMap;
  group: {
    name: string;
    type: TIngredientsType;
    active: boolean;
  }[];
}
export type TItemsMap = { [id: string]: IIngredient };
export type TIngredientsType = 'bun' | 'sauce' | 'main';
