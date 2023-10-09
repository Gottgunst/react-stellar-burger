import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import { BunPropTypes } from './bun.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
function Bun({ type = 'top' }) {
  const store = useSelector((state) => state.order);

  const topPosition = type === 'top';
  return (
    <>
      {store.bun._id ? (
        <ConstructorElement
          type={type}
          isLocked={true}
          text={store.bun.name + (topPosition ? ' (верх)' : ' (низ)')}
          price={topPosition ? store.bun.price : null}
          thumbnail={store.bun.image}
        />
      ) : (
        <div
          className={`constructor-element constructor-element_pos_${type}`}
        ></div>
      )}
    </>
  );
}

export default Bun;

/* #####################
ТИПЫ ===================
##################### */
Bun.propTypes = BunPropTypes;
