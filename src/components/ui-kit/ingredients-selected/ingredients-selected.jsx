import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromOrder } from '../../../services/order/reducer';
import { decrement } from '../../../services/ingredients/reducer';

/* ####################
СТИЛИ =================
##################### */
import styles from './ingredients-selected.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
function IngredientsSelected() {
  const store = useSelector((state) => state.order);
  const dispatch = useDispatch();

  return (
    <>
      {store.items.length > 0 ? (
        store.items.map((el, index) => (
          <li className={styles.component} key={el._id + index}>
            <DragIcon type="primary" />
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
