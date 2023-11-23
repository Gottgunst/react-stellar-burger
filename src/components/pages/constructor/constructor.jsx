import { useEffect } from 'react';
import { BurgerConstructor, BurgerIngredients, BunSelect } from '../../layout';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients } from '../../../services';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../../../utils/data';
import { Loading } from '../../ui-kit';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './constructor.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function Constructor() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.ingredients);
  const { isModalOpen } = useSelector((store) => store.modal);
  const order = useSelector((store) => store.order);
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  const oneIngredientFlag =
    location.pathname.includes(`${PATH.INGREDIENTS}/`) && !background;
  const newOrderFlag =
    location.pathname.includes(`${PATH.FEED}/new`) && background;

  useEffect(() => {
    // Инициализация данных из API
    dispatch(loadIngredients());

    // если перезагрузили страницу при модальном окне нового заказа
    // перенаправляем на главную страницу
    if (!isModalOpen && newOrderFlag) {
      navigate('/', { replace: true });
    }
  }, []);

  return loading ? (
    <Loading />
  ) : !oneIngredientFlag ? (
    <div className={styles.wrapper}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients className={styles.ingredients} />

        {!order.bun ? (
          <BunSelect className={styles.constructor} />
        ) : (
          <BurgerConstructor className={styles.constructor} />
        )}
      </DndProvider>
    </div>
  ) : (
    <div className={styles['one-ingredient-wrapper']}>
      <Outlet />
    </div>
  );
}
