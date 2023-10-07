import { useContext } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderContext } from '../../../utils/context';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import { BunPropTypes } from './bun.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
function Bun(type) {
  const [orderState] = useContext(OrderContext);
  const topPosition = type === 'top';
  return (
    <>
      {orderState.bun._id ? (
        <ConstructorElement
          type={type}
          isLocked={true}
          text={orderState.bun.name + (topPosition ? ' (верх)' : ' (низ)')}
          price={topPosition ? orderState.bun.price : null}
          thumbnail={orderState.bun.image}
        />
      ) : (
        <div
          className={`constructor-element constructor-element_pos_${type}`}
        ></div>
      )}
    </>
  );
}

export default Bun;

/* #####################
ТИПЫ ===================
##################### */
Bun.propTypes = BunPropTypes;
