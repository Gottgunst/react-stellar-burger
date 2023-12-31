import { useSelector } from 'hooks/useRedux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';
import { PATH, orderStatus } from 'utils/data';
import moment from 'moment';
import 'moment/locale/ru';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './order-card.module.scss';
import { IOrder } from 'types';
import { Loading } from '../loading/loading';

type TOrderCardProps = {
  order: IOrder;
};

/* ####################
|||||||||||||||||||||||
##################### */
export const OrderCard: React.FC<TOrderCardProps> = ({ order }) => {
  const location = useLocation();
  const isProfilePage = location.pathname.includes(PATH.PROFILE);
  const ingredients = useSelector((store) => store.ingredients.itemsMap);
  const { loading } = useSelector((store) => store.ingredients);

  const time = moment(order.createdAt).locale('ru').calendar();

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.line}>
        <p className={styles.digit}>#{order.number}</p>
        <span>{time}</span>
      </div>
      <h3 className={styles.title}>
        {order.name}
        {isProfilePage && (
          <div className={styles.status}>{orderStatus[order?.status]}</div>
        )}
      </h3>
      <div className={styles.line}>
        <ul className={styles.list}>
          {order?.ingredients?.map(
            (item, index) =>
              index < 6 && (
                <li
                  className={styles.ingredient}
                  key={index}
                  style={{ zIndex: 6 - index }}
                >
                  {index === 5 && order.ingredients.length > 6 ? (
                    <div className={styles.shadow}>
                      +{order.ingredients.length - 5}
                    </div>
                  ) : null}

                  <img
                    className={styles.image}
                    alt={ingredients[item.id]?.name}
                    src={ingredients[item.id]?.image}
                  />
                </li>
              ),
          )}
        </ul>

        <span className={styles.digit}>
          {order?.cost}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
};
