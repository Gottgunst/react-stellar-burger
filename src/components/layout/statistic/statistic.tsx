import { useSelector } from 'hooks/useRedux';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './statistic.module.scss';
import { TClassName } from 'types';

/* ####################
|||||||||||||||||||||||
##################### */
export const Statistic: React.FC<TClassName> = ({ className }) => {
  const { total, totalToday, orders } = useSelector((store) => store.feed);
  return (
    <div className={styles.wrapper + ' ' + className}>
      <div className={styles.table}>
        <div>
          <h4 className={styles.title}>Готовы:</h4>
          <ul className={styles['orders-list']}>
            {Object.keys(orders)
              .sort((a, b) => parseInt(b) - parseInt(a))
              .map((number, index) => {
                const order = orders[number];
                return (
                  index < 30 &&
                  order.status === 'done' && (
                    <li
                      className={styles.orders + ' ' + styles['orders_done']}
                      key={order.number + 'done'}
                    >
                      {order.number}
                    </li>
                  )
                );
              })}
          </ul>
        </div>
        <div>
          <h4 className={styles.title}>В работе:</h4>
          <ul className={styles['orders-list']}>
            {Object.keys(orders)
              .sort((a, b) => parseInt(b) - parseInt(a))
              .map((number, index) => {
                const order = orders[number];
                return (
                  index < 30 &&
                  order.status !== 'done' && (
                    <li
                      className={styles.orders}
                      key={order.number + 'progress'}
                    >
                      {order.number}
                    </li>
                  )
                );
              })}
          </ul>
        </div>
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>Выполнено за все время:</h4>
        <div className={styles.digit}>{total}</div>
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>Выполнено за сегодня:</h4>
        <div className={styles.digit}>{totalToday}</div>
      </div>
    </div>
  );
};
