import React from 'react';
import { useRef } from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'hooks/useRedux';
import { removeFromOrder, decrement } from 'services';
import { useDrag, useDrop } from 'react-dnd';

/* ####################
СТИЛИ =================
##################### */
import styles from './ingredients-selected.module.scss';
import { IIngredient, TDragIndex, TDragSortId, TUseDrag } from 'types';

type TIngredientsSelectedProps = {
  data: IIngredient;
  index: number;
  moveCard: (props: TDragIndex) => void;
};

/* ####################
|||||||||||||||||||||||
##################### */
export const IngredientsSelected: React.FC<TIngredientsSelectedProps> = ({
  data,
  index,
  moveCard,
}) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLLIElement>(null);

  const [_, drop] = useDrop<TDragSortId, unknown, unknown>({
    accept: 'card',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard({ dragIndex, hoverIndex });
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag<TDragSortId, unknown, TUseDrag>({
    type: 'card',
    item: () => {
      return { id: data._id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drop(drag(ref));

  return (
    <li className={styles.component} style={{ opacity }} ref={ref}>
      <div className={styles.handle}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={() => {
          dispatch(removeFromOrder(index));
          dispatch(decrement(data));
        }}
      />
    </li>
  );
};
