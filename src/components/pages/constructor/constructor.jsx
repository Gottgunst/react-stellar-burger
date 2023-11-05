import { useEffect } from 'react';
import { BurgerConstructor, BurgerIngredients } from '../../layout';
import { useDispatch } from 'react-redux';
import { loadIngredients } from '../../../services';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './constructor.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function Constructor() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Инициализация данных из API
    dispatch(loadIngredients());
  }, []);

  return (
    <div className={styles.wrapper}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients className={styles.ingredients} />
        <BurgerConstructor className={styles.constructor} />
      </DndProvider>
    </div>
  );
}
