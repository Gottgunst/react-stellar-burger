import { AppHeader } from '../layout/';
import { Outlet } from 'react-router-dom';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './app.module.scss';

/* #################### 
|||||||||||||||||||||||
##################### */
function App() {
  return (
    <div className={styles.app}>
      <AppHeader className={styles.header} />

      <Outlet />
    </div>
  );
}

export default App;
