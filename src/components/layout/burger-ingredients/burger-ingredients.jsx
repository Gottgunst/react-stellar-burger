import React, { useEffect } from 'react';
import { useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal, Ingredient } from '../../ui-kit/';
import { useModal } from '../../../hooks/useModal';
import { useSelector, useDispatch } from 'react-redux';
import { changeTab, setFocus } from '../../../services';
import { activeGroup } from '../../../services/ingredients/selectors';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../../../utils/data';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './burger-ingredients.module.scss';
import { BurgerIngredientsPropTypes } from './burger-ingredients.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
export function BurgerIngredients({ className }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isModalOpen = useSelector((store) => store.modal.isModalOpen);
  const ingredients = useSelector((store) => store.ingredients);
  const activeTab = useSelector(activeGroup);

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    dispatch(setFocus(null));
    // если при загрузке мы видим ссылку на ингредиент,
    // но модальное окно закрыто, то отправляем на отдельную страницу ингредиента.
    if (location.pathname.includes(PATH.INGREDIENTS) && !isModalOpen)
      navigate(location.pathname, { replace: true });
  }, []);

  const scroll = {
    bun: useRef(null),
    sauce: useRef(null),
    main: useRef(null),
    jumpToFlag: false,
    paddingTop: 283.59375,
    border: 130,
    to: (group) => {
      scroll.jumpToFlag = true;

      scroll[group].current.scrollIntoView({
        behavior: 'smooth',
      });
      // ожидаем конца скролла и возвращаем флаг на место
      setTimeout(() => (scroll.jumpToFlag = false), 1500);
    },
    watch: (e) => {
      const { border, sauce, main, jumpFlag, paddingTop } = scroll;

      const saucePos = sauce.current.getBoundingClientRect().y - paddingTop;
      const mainPos = main.current.getBoundingClientRect().y - paddingTop;
      const targetGroup =
        saucePos < border ? (mainPos < border ? 'main' : 'sauce') : 'bun';

      // если есть флаг, то авто-скролл не мучаем,
      if (!jumpFlag && activeTab.type !== targetGroup)
        dispatch(changeTab({ type: targetGroup }));
    },
  };

  return (
    <div className={className + ' ' + styles.wrapper}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <ul className={styles.tabs}>
        {ingredients.group.map((el, index) => (
          <li key={index}>
            <Tab
              value={el.name}
              active={el.active}
              onClick={() => {
                dispatch(changeTab(el));
                scroll.to(el.type);
              }}
            >
              {el.name}
            </Tab>
          </li>
        ))}
      </ul>
      <div className={styles['ingredients-wrapper']} onScroll={scroll.watch}>
        <ul className={styles['ingredients-type']}>
          {ingredients.group.map((group, index) => (
            <li key={index}>
              <h2 className={styles.type} ref={scroll[group.type]} data-group>
                {group.name}
              </h2>
              <ul className={styles.ingredient}>
                {Object.keys(ingredients.itemsMap).map((id) => {
                  const item = ingredients.itemsMap[id];
                  return group.type === item.type ? (
                    <li
                      key={item._id}
                      onClick={() => {
                        openModal();
                        navigate(`${PATH.INGREDIENTS}/${item._id}`, {
                          state: { background: location },
                          key: item._id,
                        });
                      }}
                    >
                      <Ingredient data={item} />
                    </li>
                  ) : null;
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <Modal status={isModalOpen} closeModal={closeModal}>
        <Outlet />
      </Modal>
    </div>
  );
}

/* #####################
ТИПЫ ===================
##################### */
BurgerIngredients.propTypes = BurgerIngredientsPropTypes;
