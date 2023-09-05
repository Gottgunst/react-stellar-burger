import { useState, useEffect } from 'react';
import Api from '../../utils/Api';
import { data as reserveData } from '../../utils/data';
import { AppHeader, BurgerConstructor, BurgerIngredients } from '../layout/';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './app.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
function App() {
  // настройка API
  const burgerApi = new Api({
    baseUrl: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    paths: {
      ing: '/ingredients',
    },
  });

  const [state, setState] = useState({
    productData: null,
    loading: true,
  });

  useEffect(() => {
    const getData = async () => {
      setState({ ...state, loading: true });
      const response = await burgerApi
        .workData({ key: 'ing' })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.warn('STATUS', err.status, '#######', err);
          return reserveData;
        });
      setState({ productData: response, loading: false });
    };
    getData();
  }, []);

  // Проверка на состояние запроса к АПИ и демонстрация нужной информации
  let data = state.loading ? reserveData : state.productData;

  return (
    <div className={styles.app}>
      <AppHeader className={styles.header} />
      <BurgerIngredients className={styles.ingredients} ingredients={data} />
      <BurgerConstructor className={styles.constructor} compound={data} />
    </div>
  );
}

export default App;
