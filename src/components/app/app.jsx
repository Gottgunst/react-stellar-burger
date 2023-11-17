import { useEffect } from 'react';
import { AppHeader } from '../layout/';
import { Outlet } from 'react-router-dom';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './app.module.scss';
import { useDispatch } from 'react-redux';
import { checkUserAuth } from '../../services/';

/* #################### 
|||||||||||||||||||||||
##################### */
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader className={styles.header} />

      <Outlet />
    </div>
  );
}

export default App;
