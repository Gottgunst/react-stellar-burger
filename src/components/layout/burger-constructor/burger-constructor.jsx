import React from 'react';
// import ReactDOM from 'react-dom';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './burger-constructor.module.scss';
import { BurgerConstructorPropTypes } from './burger-constructor.types.js';

/* ####################
КЛАСС =================
##################### */
class BurgerConstructor extends React.Component {
  constructor(props) {
    super(props);
    this.className = props.className;
    this.compound = props.compound;
    // this.state = {};
  }

  // componentDidMount() {}
  // componentDidUpdate(prevProps, prevState){}
  // shouldComponentUpdate(nextProps, nextState){return false;}
  // componentWillUnmount() {}

  render() {
    const bun = this.compound.filter((el) => el.type === 'bun')[0];

    return (
      <div className={this.className + ' ' + styles.wrapper}>
        <ul className={styles.components}>
          <li className={styles.part}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
          <li className={styles.part}>
            <ul
              className={styles.components + ' ' + styles['components_inside']}
            >
              {this.compound.map((el, index) => {
                if (el.type !== 'bun')
                  return (
                    <li className={styles.component} key={index}>
                      <DragIcon type="primary" />
                      <ConstructorElement
                        text={el.name}
                        price={el.price}
                        thumbnail={el.image}
                      />
                    </li>
                  );
              })}
            </ul>
          </li>
          <li className={styles.part}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        </ul>
        <span className={styles.info}>
          <span className={styles.price}>
            610
            <CurrencyIcon type="primary" />
          </span>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </span>
      </div>
    );
  }
}
export default BurgerConstructor;

/* #####################
ТИПЫ и ПРОПСЫ ПО УМОЛЧАНИЮ 
##################### */
BurgerConstructor.propTypes = BurgerConstructorPropTypes;
// BurgerConstructor.defaultProps = {};
