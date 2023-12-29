import {
  useDispatch as origDispatch,
  useSelector as origSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import type { RootState, AppDispatch } from 'services/store';

// export const useDispatch = () => origDispatch<AppDispatch>();
export const useDispatch: () => AppDispatch = origDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = origSelector;
