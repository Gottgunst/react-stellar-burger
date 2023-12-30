import React from 'react';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './button-menu.module.scss';
type TButtonMenuProps = { active: boolean; children: React.ReactElement };

/* ####################
|||||||||||||||||||||||
##################### */
export const ButtonMenu: React.FC<TButtonMenuProps> = ({
  active = false,
  children,
}) => {
  const styleList = active
    ? styles['item'] + ' ' + styles['item_active']
    : styles['item'];

  return (
    <a href="/#" className={styleList}>
      {children}
    </a>
  );
};
