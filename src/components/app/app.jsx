import { useState, useEffect } from 'react';
import Api from '../../utils/Api';
import { data as reserveData } from '../../utils/data';
import { AppHeader, BurgerConstructor, BurgerIngredients } from '../layout/';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './app.module.scss';

/* ####################
КОНФИГУРАЦИЯ API ======
##################### */
const burgerApi = new Api({
  baseUrl: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paths: {
    ingredients: '/ingredients',
  },
});

/* ####################
|||||||||||||||||||||||
##################### */
function App() {
  // cбор и хранение данных
  const [state, setState] = useState({
    productData: null,
    loading: true,
  });

  useEffect(() => {
    const getData = () => {
      setState({ ...state, loading: true });
      burgerApi
        .makeRequest('/ingredients')
        .then((res) => {
          setState({ productData: res.data, loading: false });
        })
        .catch((err) => {
          console.warn('STATUS', err.status, '#######', err);
          return reserveData;
        });
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
