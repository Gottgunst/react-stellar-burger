import { useState, useEffect, useReducer } from 'react';
import { orderReducer } from '../../utils/reducer';
import { burgerApi, reserveData } from '../../utils/data';
import { AppHeader, BurgerConstructor, BurgerIngredients } from '../layout/';
import { BurgersContext, OrderContext } from '../../utils/context';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './app.module.scss';

/* #################### 
|||||||||||||||||||||||
##################### */
function App() {
  // cбор и хранение данных
  const [state, setState] = useState({
    productData: null,
    loading: true,
  });

  // КОНФИГ ЗАКАЗА
  const orderObj = {
    bun: {},
    items: [],
    price: 0,
    success: false,
    name: null,
    id: null,
  };
  const burgerOrder = useReducer(orderReducer, orderObj);

  // Инициализация данных из API
  useEffect(() => {
    // объявили и вызвали
    (() => {
      setState({ ...state, loading: true });
      burgerApi
        .makeRequest('/ingredients')
        .then((res) => {
          // Устанавливаем данные из базы
          setState({ productData: res.data, loading: false });

          // Подготовка заказа
          const [o, dispatch] = burgerOrder;
          // находим первую булку
          const firstBun = res.data.find((e) => e.type === 'bun');
          // устанавливаем булку по умолчанию
          dispatch({ act: 'add', income: firstBun });
        })
        .catch((err) => {
          console.warn('STATUS', err.status, '#######', err);
          return reserveData;
        });
    })();
  }, []);

  // Проверка на состояние запроса к АПИ и демонстрация нужной информации
  const data = state.loading ? reserveData : state.productData;

  return (
    <BurgersContext.Provider value={data}>
      <OrderContext.Provider value={burgerOrder}>
        <div className={styles.app}>
          <AppHeader className={styles.header} />
          <BurgerIngredients className={styles.ingredients} />
          <BurgerConstructor className={styles.constructor} />
        </div>
      </OrderContext.Provider>
    </BurgersContext.Provider>
  );
}

export default App;
