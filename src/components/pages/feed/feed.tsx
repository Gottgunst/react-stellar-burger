import { useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks/useRedux';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Loading } from '../../ui-kit';
import { OrderList, Statistic } from '../../layout';
import { loadIngredients, setFocus } from 'services';
import { PATH } from 'utils/data';
import { loadOneOrder } from 'services';
import { useModal } from 'hooks/useModal';
/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './feed.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export const Feed: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { id } = useParams();
  const { isModalOpen, loading } = useSelector((store) => store.modal);
  const { orders } = useSelector((store) => store['feed']);
  const background: boolean = location.state && location.state.background;
  const oneOrderFlag =
    location.pathname.includes(`/${PATH.FEED}/`) && !background;

  useEffect(() => {
    if (!oneOrderFlag) {
      dispatch(loadIngredients());

      //если перезагрузили а модальник открыт
      if (!isModalOpen && background && id) {
        if (orders === null) dispatch(loadOneOrder(id as unknown as number));
        openModal();
        dispatch(setFocus(orders[id]));
      }
    } else {
      // иначе грузим через API
      dispatch(loadOneOrder(id as unknown as number));
    }
  }, []);

  return loading ? (
    <Loading />
  ) : !oneOrderFlag ? (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        <h1 className={styles.title}>Лента заказов</h1>
        <OrderList type="feed" />
      </div>
      <Statistic className={styles.stat} />
    </div>
  ) : (
    <div className={styles['focus-order-wrapper']}>
      <Outlet />
    </div>
  );
};
