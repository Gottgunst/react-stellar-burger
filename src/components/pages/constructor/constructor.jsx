import { useEffect } from 'react';
import {
  BurgerConstructor,
  BurgerIngredients,
  IngredientDetails,
} from '../../layout';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo, loadIngredients } from '../../../services';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet, useLocation } from 'react-router-dom';
import { PATH } from '../../../utils/data';
import Loading from '../../ui-kit/loading/loading';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './constructor.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function Constructor() {
  const location = useLocation();
  const { loading, focus } = useSelector((store) => store.ingredients);

  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  // console.log('background', background, location);

  const oneIngredientFlag =
    location.pathname.includes(PATH.INGREDIENTS) && !background;

  useEffect(() => {
    // Инициализация данных из API
    dispatch(loadIngredients());
    //очищаем фокус при перезагрузке страницы
    dispatch(getInfo(null));
  }, []);

  return loading ? (
    <Loading />
  ) : !oneIngredientFlag ? (
    <div className={styles.wrapper}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients className={styles.ingredients} />
        <BurgerConstructor className={styles.constructor} />
      </DndProvider>
    </div>
  ) : (
    <div className={styles['one-ingredient-wrapper']}>
      <Outlet />
    </div>
  );
}
