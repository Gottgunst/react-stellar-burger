import React from 'react';
// import ReactDOM from 'react-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../../ui-kit/ingredient/ingredient';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './burger-ingredients.module.scss';
import { BurgerIngredientsPropTypes } from './burger-ingredients.types.js';

/* ####################
КЛАСС =================
##################### */
class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.className = props.className;
    this.ingredients = props.ingredients;
    this.tabList = [
      { name: 'Булки', type: 'bun' },
      { name: 'Соусы', type: 'sauce' },
      { name: 'Начинки', type: 'main' },
    ];
  }
  state = { current: 'Булки' };
  // componentDidMount() {}
  // componentDidUpdate(prevProps, prevState){}
  // shouldComponentUpdate(nextProps, nextState){return false;}
  // componentWillUnmount() {}

  changeTab = (evt) => {
    this.setState({
      current: evt,
    });
  };

  preset = (name) => {
    if (
      name === 'Краторная булка N-200i' ||
      name === 'Соус традиционный галактический'
    )
      return 1;
  };

  render() {
    return (
      <div className={this.className + ' ' + styles.wrapper}>
        <h1 className={styles.title}>Соберите бургер</h1>
        <ul className={styles.tabs}>
          {this.tabList.map((el, index) => (
            <li key={index}>
              <Tab
                value={el.name}
                active={this.state.current === el.name}
                onClick={this.changeTab}
              >
                {el.name}
              </Tab>
            </li>
          ))}
        </ul>
        <div className={styles['ingredients-wrapper']}>
          <ul className={styles['ingredients-type']}>
            {this.tabList.map((group, index) => (
              <li key={index}>
                <h2 className={styles.type}>{group.name}</h2>
                <ul className={styles.ingredient}>
                  {this.ingredients.map((item, index) => {
                    if (group.type === item.type)
                      return (
                        <li key={index}>
                          <Ingredient
                            data={item}
                            quantity={this.preset(item.name)}
                          />
                        </li>
                      );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default BurgerIngredients;

/* #####################
ТИПЫ и ПРОПСЫ ПО УМОЛЧАНИЮ 
##################### */
BurgerIngredients.propTypes = BurgerIngredientsPropTypes;
// BurgerIngredients.defaultProps = {};
