import { IIngredient } from './ingredient';
import { IAsyncState, IOrder } from '.';

export interface IModalSlice extends IAsyncState {
  isModalOpen: boolean;
  focus: IIngredient | IOrder | null;
  oneOrder: IOrder | null;
}
