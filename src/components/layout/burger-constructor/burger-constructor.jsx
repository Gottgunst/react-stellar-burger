import React from 'react';
// import ReactDOM from 'react-dom';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './burger-constructor.module.scss';
import { BurgerConstructorPropTypes } from './burger-constructor.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
function BurgerConstructor({ className, compound }) {
  // Временная булка
  const bun = compound.filter((el) => el.type === 'bun')[0];

  return (
    <div className={className + ' ' + styles.wrapper}>
      <ul className={styles.components}>
        <li className={styles.part}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
        <li className={styles.part}>
          <ul className={styles.components + ' ' + styles['components_inside']}>
            {compound.map((el) => {
              if (el.type !== 'bun')
                return (
                  <li className={styles.component} key={el._id}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={el.name}
                      price={el.price}
                      thumbnail={el.image}
                    />
                  </li>
                );
            })}
          </ul>
        </li>
        <li className={styles.part}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
      </ul>
      <span className={styles.info}>
        <span className={styles.price}>
          610
          <CurrencyIcon type="primary" />
        </span>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </span>
    </div>
  );
}
export default BurgerConstructor;

/* #####################
ТИПЫ ===================
##################### */
BurgerConstructor.propTypes = BurgerConstructorPropTypes;
