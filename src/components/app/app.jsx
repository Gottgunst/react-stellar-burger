import styles from './app.module.scss';
import { data } from '../../utils/data';
import AppHeader from '../layout/app-header/app-header';
import BurgerConstructor from '../layout/burger-constructor/burger-constructor';
import BurgerIngredients from '../layout/burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader className={styles.header} />
      <BurgerIngredients className={styles.ingredients} ingredients={data} />
      <BurgerConstructor className={styles.constructor} compound={data} />
    </div>
  );
}

export default App;
