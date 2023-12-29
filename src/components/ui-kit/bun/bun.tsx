import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'hooks/useRedux';
import React from 'react';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
type TBunProps = {
  type: 'top' | 'bottom' | undefined;
};

/* ####################
|||||||||||||||||||||||
##################### */
export const Bun: React.FC<TBunProps> = ({ type = 'top' }) => {
  const order = useSelector((store) => store.order);
  const topPosition = type === 'top';

  return (
    <>
      {order.bun ? (
        <ConstructorElement
          type={type}
          isLocked={true}
          text={order.bun.name + (topPosition ? ' (верх)' : ' (низ)')}
          price={topPosition ? order.bun.price : 0}
          thumbnail={order.bun.image}
        />
      ) : (
        <div
          className={`constructor-element constructor-element_pos_${type}`}
        ></div>
      )}
    </>
  );
};
