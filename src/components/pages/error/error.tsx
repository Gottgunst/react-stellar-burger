/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import { AppHeader } from '../../layout';
import styles from './error.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export const Error: React.FC = () => (
  <div className={styles.app}>
    <AppHeader className={styles.header} />

    <h1>404</h1>
  </div>
);
