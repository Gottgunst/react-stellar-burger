import { useContext } from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderContext } from '../../../utils/context';

/* ####################
СТИЛИ =================
##################### */
import styles from './ingredients-selected.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
function IngredientsSelected() {
  const [orderState, dispatch] = useContext(OrderContext);

  return (
    <>
      {orderState.items.length > 0 ? (
        orderState.items.map((el, index) => (
          <li className={styles.component} key={el._id + index}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={el.name}
              price={el.price}
              thumbnail={el.image}
              handleClose={() => {
                dispatch({ act: 'remove', income: index });
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
