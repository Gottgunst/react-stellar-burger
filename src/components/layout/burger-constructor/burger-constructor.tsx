import React from 'react';
import { useCallback } from 'react';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Bun, IngredientsSelected, Modal } from 'components/ui-kit';
import { useModal } from 'hooks/useModal';
import { useSelector, useDispatch } from 'hooks/useRedux';
import { sendOrder, resetQuantity, sortOrder } from 'services';
import { useDrop } from 'react-dnd';
import { PATH } from 'utils/data';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './burger-constructor.module.scss';
import { TClassName, TDragIndex, TUseDrop } from 'types';

/* ####################
|||||||||||||||||||||||
##################### */
export const BurgerConstructor: React.FC<TClassName> = ({ className }) => {
  const order = useSelector((store) => store.order);
  const { isModalOpen } = useSelector((store) => store.modal);
  const user = useSelector((store) => store.user.user);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { openModal } = useModal();

  const [{ canDrop, isOver }, drop] = useDrop<unknown, unknown, TUseDrop>(
    () => ({
      accept: 'box',
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
  );

  const isActive = canDrop && isOver;
  let stylesComponents = isActive
    ? [styles.components, styles['components_drop_ready']]
    : canDrop
      ? [styles.components, styles['components_drop_prepare']]
      : [styles.components];

  const moveCard = useCallback(
    ({ dragIndex, hoverIndex }: TDragIndex): void => {
      dispatch(sortOrder({ dragIndex, hoverIndex }));
    },
    [],
  );

  const completeOrder = (): void => {
    if (user) {
      openModal();
      navigate(`${PATH.FEED}/new`, {
        state: { key: 'new order', background: location },
      });
      dispatch(sendOrder());
      dispatch(resetQuantity());
    } else navigate(PATH.LOGIN);
  };

  return (
    <div className={className + ' ' + styles.wrapper}>
      <ul className={stylesComponents.join(' ')} ref={drop}>
        <li className={styles.part}>
          <Bun type="top" />
        </li>
        <li className={styles.part}>
          <ul className={styles.components + ' ' + styles['components_inside']}>
            {order.items.length > 0 ? (
              order.items.map((el, index) => (
                <IngredientsSelected
                  data={el}
                  index={index}
                  moveCard={moveCard}
                  key={el.key}
                />
              ))
            ) : (
              <div className="constructor-element"></div>
            )}
          </ul>
        </li>
        <li className={styles.part}>
          <Bun type="bottom" />
        </li>
      </ul>
      <span className={styles.info}>
        <span className={styles.price}>
          {order.price}
          <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={completeOrder}
        >
          Оформить заказ
        </Button>
        <Modal status={isModalOpen}>
          <Outlet />
        </Modal>
      </span>
    </div>
  );
};
