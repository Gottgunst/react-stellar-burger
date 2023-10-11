import { useEffect } from 'react';
import { AppHeader, BurgerConstructor, BurgerIngredients } from '../layout/';
import { useDispatch } from 'react-redux';
import { loadIngredients } from '../../services/ingredients/actions';
/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './app.module.scss';

/* #################### 
|||||||||||||||||||||||
##################### */
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Инициализация данных из API
    dispatch(loadIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader className={styles.header} />
      <BurgerIngredients className={styles.ingredients} />
      <BurgerConstructor className={styles.constructor} />
    </div>
  );
}

export default App;
