import { useState, useEffect, useReducer } from 'react';
import { orderReducer } from '../../utils/reducer';
import { burgerApi, reserveData } from '../../utils/data';
import { AppHeader, BurgerConstructor, BurgerIngredients } from '../layout/';
import { BurgersContext } from '../../utils/context';
import { useSelector, useDispatch } from 'react-redux';
import { addToOrder } from '../../services/order/reducer';
/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './app.module.scss';

/* #################### 
|||||||||||||||||||||||
##################### */
function App() {
  const store = useSelector((state) => state.order);
  const dispatch = useDispatch();

  // cбор и хранение данных
  const [stateIngredients, setStateIngredients] = useState({
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

  // Инициализация данных из API
  useEffect(() => {
    // объявили и вызвали
    (() => {
      setStateIngredients({ ...stateIngredients, loading: true });
      burgerApi
        .makeRequest('/ingredients')
        .then((res) => {
          // Устанавливаем данные из базы
          setStateIngredients({ productData: res.data, loading: false });

          // находим первую булку
          const firstBun = res.data.find((e) => e.type === 'bun');
          // устанавливаем булку по умолчанию
          dispatch(addToOrder({ item: firstBun }));
        })
        .catch((err) => {
          console.warn('STATUS', err.status, '#######', err);
          return reserveData;
        });
    })();
  }, []);

  // Проверка на состояние запроса к АПИ и демонстрация нужной информации
  const allIngredients = stateIngredients.loading
    ? reserveData
    : stateIngredients.productData;

  return (
    <div className={styles.app}>
      <AppHeader className={styles.header} />
      <BurgersContext.Provider value={allIngredients}>
        <BurgerIngredients className={styles.ingredients} />
        <BurgerConstructor className={styles.constructor} />
      </BurgersContext.Provider>
    </div>
  );
}

export default App;
