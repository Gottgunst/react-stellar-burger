import PropTypes from 'prop-types';
import { ingredientPropType } from '../../../utils/prop-types';

export const IngredientSelectedPropTypes = {
  data: ingredientPropType,
  index: PropTypes.number,
};
