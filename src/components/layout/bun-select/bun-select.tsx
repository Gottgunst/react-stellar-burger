import React from 'react';
import { useSelector, useDispatch } from 'hooks/useRedux';
import { useDrop } from 'react-dnd';
import { addToOrder, increment } from 'services';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './bun-select.module.scss';
import { IIngredient, TClassName, TUseDrop } from 'types';

/* ####################
|||||||||||||||||||||||
##################### */
export const BunSelect: React.FC<TClassName> = ({ className }) => {
  const ingredients = useSelector((store) => store.ingredients);

  const bunVars = Object.keys(ingredients.itemsMap).filter((id) => {
    const item = ingredients.itemsMap[id];
    if (item.type === 'bun') return true;
  });

  const dispatch = useDispatch();

  const [{ canDrop, isOver }, drop] = useDrop<IIngredient, unknown, TUseDrop>(
    () => ({
      accept: 'box',
      canDrop(item) {
        if (item.type !== 'bun') return false;
        return true;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
  );

  const isActive = canDrop && isOver;
  let stylesComponents = isActive
    ? [styles.buns, styles['buns_drop_ready']]
    : canDrop
      ? [styles.buns, styles['buns_drop_prepare']]
      : [styles.buns];

  return (
    <div className={className + ' ' + styles.wrapper}>
      <h2 className={styles.title}>Выберите булочку:</h2>
      <ul className={stylesComponents.join(' ')} ref={drop}>
        {bunVars.map((id) => {
          const bun = ingredients.itemsMap[id];
          return (
            <li
              key={bun._id}
              onClick={() => {
                dispatch(addToOrder(bun));
                dispatch(increment(bun));
              }}
              className={styles.bun}
            >
              <img src={bun.image} alt={bun.name} className={styles.image} />
              <p className={styles.name}>{bun.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
