import { orderReducerPropType } from './prop-types';

export function orderReducer(state, { act, income }) {
  let newArr = [...state.items];

  switch (act) {
    case 'add':
      if (income.type === 'bun') {
        return {
          ...state,
          bun: income,
          price: sumPrice([...newArr, income]),
        };
      } else {
        newArr = [...state.items, income];
      }
      break;
    case 'remove':
      newArr = state.items.filter((item, index) => index !== income);
      break;
    case 'complete':
      return {
        ...state,
        id: income.order.number,
        name: income.name,
        success: income.success,
      };
    default:
      throw new Error(`Неверное имя act: ${act}`);
  }

  return {
    ...state,
    price: sumPrice([...newArr, state.bun]),
    items: newArr,
  };
}

/* #####################
ТИПЫ ===================
##################### */
orderReducer.propTypes = orderReducerPropType;

//
function sumPrice(arr) {
  return arr.map((e) => e.price).reduce((sum, num) => sum + num, 0);
}
