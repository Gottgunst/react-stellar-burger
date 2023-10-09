import { useContext, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../../ui-kit/ingredient/ingredient';
import IngredientDetails from '../../ui-kit/ingredient-details/ingredient-details';
import Modal from '../../ui-kit/modal/modal';
import { useModal } from '../../../hooks/useModal';
import { useSelector, useDispatch } from 'react-redux';
import { addToOrder } from '../../../services/order/reducer';
import { BurgersContext } from '../../../utils/context';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './burger-ingredients.module.scss';
import { BurgerIngredientsPropTypes } from './burger-ingredients.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
export function BurgerIngredients({ className }) {
  // const store = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const ingredients = useContext(BurgersContext);

  const tabList = [
    { name: 'Булки', type: 'bun' },
    { name: 'Соусы', type: 'sauce' },
    { name: 'Начинки', type: 'main' },
  ];
  const [state, setState] = useState('Булки');

  const [detailsId, setDetailsId] = useState('');
  // отбираем данные для модального окна
  const details = () => {
    return (
      ingredients.filter((item) => item._id === detailsId)[0] || ingredients[0]
    );
  };

  // временный пресет
  const preset = (name) => {
    if (
      name === 'Краторная булка N-200i' ||
      name === 'Соус традиционный галактический'
    )
      return 1;
  };

  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className={className + ' ' + styles.wrapper}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <ul className={styles.tabs}>
        {tabList.map((el, index) => (
          <li key={index}>
            <Tab value={el.name} active={state === el.name} onClick={setState}>
              {el.name}
            </Tab>
          </li>
        ))}
      </ul>
      <div className={styles['ingredients-wrapper']}>
        <ul className={styles['ingredients-type']}>
          {tabList.map((group, index) => (
            <li key={index}>
              <h2 className={styles.type}>{group.name}</h2>
              <ul className={styles.ingredient}>
                {ingredients.map((item) =>
                  group.type === item.type ? (
                    <li
                      key={item._id}
                      onClick={() => {
                        openModal();
                        setDetailsId(item._id);
                        dispatch(addToOrder({ item }));
                      }}
                    >
                      <Ingredient data={item} quantity={preset(item.name)} />
                    </li>
                  ) : null,
                )}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <Modal status={isModalOpen} closeModal={closeModal}>
        <IngredientDetails consist={details()} />
      </Modal>
    </div>
  );
}

/* #####################
ТИПЫ ===================
##################### */
BurgerIngredients.propTypes = BurgerIngredientsPropTypes;
