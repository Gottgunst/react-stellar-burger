import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import { BunPropTypes } from './bun.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
export function Bun({ type = 'top' }) {
  const order = useSelector((store) => store.order);

  const topPosition = type === 'top';
  return (
    <>
      {order.bun._id ? (
        <ConstructorElement
          type={type}
          isLocked={true}
          text={order.bun.name + (topPosition ? ' (верх)' : ' (низ)')}
          price={topPosition ? order.bun.price : null}
          thumbnail={order.bun.image}
        />
      ) : (
        <div
          className={`constructor-element constructor-element_pos_${type}`}
        ></div>
      )}
    </>
  );
}

/* #####################
ТИПЫ ===================
##################### */
Bun.propTypes = BunPropTypes;
