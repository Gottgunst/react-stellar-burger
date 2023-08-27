import React from 'react';
import ReactDOM from 'react-dom';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */

import styles from './burger-constructor.module.scss';
import { BurgerConstructorPropTypes } from './burger-constructor.types.js';

/* ####################
КЛАСС =================
##################### */

class BurgerConstructor extends React.Component {
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
export default BurgerConstructor;


/* #####################
ТИПЫ и ПРОПСЫ ПО УМОЛЧАНИЮ 
##################### */
BurgerConstructor.propTypes = BurgerConstructorPropTypes;
BurgerConstructor.defaultProps = {}