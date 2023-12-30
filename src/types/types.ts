import { MouseEventHandler } from 'react';
import { PATH, WebsocketStatus } from '../utils/data';
import { TRejectValue } from './api';

/*############
## Generics ##
#############*/

export type GValueOf<T> = T[keyof T];
export type GIn<T> = T | null | undefined;
export type GVoid<P = {}> = (props: P) => void;
export type GSelf<P = {}> = (res: P) => P;

/*############
### Types ###
#############*/

export type TClassName = { className: string | Function };
export type TIsActive = { isActive: boolean };

export type TPath = typeof PATH;
export type TPathValue = GValueOf<TPath>;

export type TWSStatus = typeof WebsocketStatus;
export type TWSStatusValue = GValueOf<TWSStatus>;

export type TMidAction = { type: string; payload: any };

export type TMouseEvent = MouseEventHandler<HTMLDivElement | HTMLButtonElement>;

/*############
### Interfaces ###
#############*/

export interface IAsyncState {
  loading: boolean;
  error: GIn<TRejectValue>;
  success?: boolean;
}
