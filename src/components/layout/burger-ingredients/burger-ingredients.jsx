import React from 'react';
import ReactDOM from 'react-dom';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */

import styles from './burger-ingredients.module.scss';
import { BurgerIngredientsPropTypes } from './burger-ingredients.types.js';

/* ####################
КЛАСС =================
##################### */

class BurgerIngredients extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  // componentDidMount() {}
  // componentDidUpdate(prevProps, prevState){}
  // shouldComponentUpdate(nextProps, nextState){return false;}
  // componentWillUnmount() {}

  render(){
    return (
<div>test</div>
    );
  }
} 
export default BurgerIngredients;


/* #####################
ТИПЫ и ПРОПСЫ ПО УМОЛЧАНИЮ 
##################### */
BurgerIngredients.propTypes = BurgerIngredientsPropTypes;
BurgerIngredients.defaultProps = {}