import { useDrag } from 'react-dnd';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'hooks/useRedux';
import { addToOrder, increment } from 'services';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './ingredient.module.scss';
import { IIngredient, TUseDrag } from 'types';

type TIngredientProps = {
  data: IIngredient;
};

/* ####################
|||||||||||||||||||||||
##################### */

export const Ingredient: React.FC<TIngredientProps> = ({ data }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag<IIngredient, unknown, TUseDrag>(
    () => ({
      type: 'box',
      item: data,
      canDrag: (monitor) => {
        // if (data.type === 'bun') {
        //   let t = ingredients.items.find((e) => e._id === data._id);
        //   return t.quantity === 0 ? true : false;
        // }
        return true;
      },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          dispatch(increment(item));
          dispatch(addToOrder(item));
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        canDrag: monitor.canDrag(),
      }),
    }),
  );

  const opacity = isDragging ? 0.1 : 1;

  return (
    <div className={styles.wrapper} ref={drag} style={{ opacity }}>
      {data.quantity > 0 && (
        <Counter count={data.quantity} size="default" extraClass="m-1" />
      )}
      <img src={data.image} alt={data.name} className={styles.image} />
      <span className={styles.price}>
        {data.price}
        <CurrencyIcon type="primary" />
      </span>
      <p className={styles.name}>{data.name}</p>
    </div>
  );
};
