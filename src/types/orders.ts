import { orderStatus } from 'utils/data';
import { GIn, IAsyncState, IIngredient, TItemsMap } from '.';
import { TWSStatusValue } from './types';
import { TResponse } from './user';

export type TOrderStatus = typeof orderStatus;
export type TOrderStatusKeys = keyof TOrderStatus;

export type TIncomeOneOrder = {
  orders: IIncomeOrder<string>[];
  itemsMap: TItemsMap;
};

export type TNewOrder = {
  name: string;
  order: IIncomeOrder<IIngredient>;
  success: boolean;
};

export interface IIncomeOrder<T> {
  _id: string;
  name: string;
  ingredients: T[];
  status: TOrderStatusKeys;
  number: number;
  createdAt: string;
  updatedAt: string;
  price?: number;
  owner?: {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
  };
}

export interface IOrder extends IIncomeOrder<TFeedIngredient> {
  cost: number;
}

export interface IOrderSlice extends IAsyncState {
  bun: IIngredient | null;
  items: IIngredient[];
  price: number;
  packedItems: string[];
  orderId: GIn<number>;
  name: GIn<string>;
}

export interface IOrdersFeedSlice extends IAsyncState {
  status: TWSStatusValue;
  connectingError: string;
  orders: TOrdersMap;
  total: number;
  totalToday: number;
}
export type TOrdersMap = { [number: string]: IOrder };

export type TFeedIngredient = { id: string; q: number };
export type TFeedType = 'feed' | 'myFeed';

export type TResponseFeed = TResponse & {
  total: number;
  totalToday: number;
  orders: IIncomeOrder<string>[];
  itemsMap: TItemsMap;
};

export type TFeedOrders = Pick<TResponseFeed, 'orders' | 'itemsMap'>;
