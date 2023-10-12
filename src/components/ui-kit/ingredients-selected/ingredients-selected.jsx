import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromOrder, decrement } from '../../../services';

/* ####################
СТИЛИ =================
##################### */
import styles from './ingredients-selected.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
function IngredientsSelected() {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

  return (
    <>
      {order.items.length > 0 ? (
        order.items.map((el, index) => (
          <li className={styles.component} key={el._id + index}>
            <div className={styles.handle}>
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              text={el.name}
              price={el.price}
              thumbnail={el.image}
              handleClose={() => {
                dispatch(removeFromOrder({ index }));
                dispatch(decrement({ item: el }));
              }}
            />
          </li>
        ))
      ) : (
        <div className="constructor-element"></div>
      )}
    </>
  );
}

export default IngredientsSelected;
