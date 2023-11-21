export { connect as myFeedConnect } from './my-feed/actions';

export { connect as feedConnect } from './feed/actions';

export { addToOrder, removeFromOrder, sortOrder } from './order/reducer';
export { sendOrder } from './order/actions';

export {
  changeTab,
  increment,
  decrement,
  resetQuantity,
} from './ingredients/reducer';
export { loadIngredients } from './ingredients/actions';

export {
  setAuthChecked,
  setUser,
  setPassword,
  resetError,
} from './user/reducer';
export {
  checkUserAuth,
  getUser,
  login,
  logout,
  passwordForgot,
  passwordReset,
} from './user/action';

export { setForm, setProfileForm } from './forms/reducer';
export { formSubmit } from './forms/actions';

export { setModal, setFocus } from './modal/reducer';
export { loadOneOrder } from './modal/actions';
