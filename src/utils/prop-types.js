import PropTypes from 'prop-types';

export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

export const ApiPropType = PropTypes.shape({
  baseUrl: PropTypes.string,
  headers: PropTypes.object,
  paths: PropTypes.object,
});

export const orderReducerPropType = PropTypes.shape({
  state: PropTypes.object,
  action: PropTypes.object,
});
