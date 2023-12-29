import React, { UIEventHandler, useEffect } from 'react';
import { useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal, Ingredient } from 'components/ui-kit';
import { useModal } from 'hooks/useModal';
import { useSelector, useDispatch } from 'hooks/useRedux';
import { changeTab } from 'services';
import { activeGroup } from 'services/ingredients/selectors';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PATH } from 'utils/data';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './burger-ingredients.module.scss';
import { TClassName, TIngredientsType } from 'types';
type TScroll = {
  bun: React.RefObject<HTMLHeadingElement>;
  sauce: React.RefObject<HTMLHeadingElement>;
  main: React.RefObject<HTMLHeadingElement>;

  jumpToFlag: boolean;
  paddingTop: number;
  border: number;

  to(group: TIngredientsType): void;
  watch: UIEventHandler<HTMLDivElement>;
};

/* ####################
|||||||||||||||||||||||
##################### */
export const BurgerIngredients: React.FC<TClassName> = ({ className }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isModalOpen = useSelector((store) => store.modal.isModalOpen);
  const ingredients = useSelector((store) => store.ingredients);
  const activeTab = useSelector(activeGroup);

  const { openModal } = useModal();

  useEffect(() => {
    // если при загрузке мы видим ссылку на ингредиент,
    // но модальное окно закрыто, то отправляем на отдельную страницу ингредиента.
    if (location.pathname.includes(PATH.INGREDIENTS) && !isModalOpen)
      navigate(location.pathname, { replace: true });
  }, []);

  const scroll: TScroll = {
    bun: useRef(null),
    sauce: useRef(null),
    main: useRef(null),

    jumpToFlag: false,
    paddingTop: 283.59375,
    border: 130,

    to(group) {
      scroll.jumpToFlag = true;
      scroll[group].current!.scrollIntoView({
        behavior: 'smooth',
      });
      // ожидаем конца скролла и возвращаем флаг на место
      setTimeout(() => (scroll.jumpToFlag = false), 1500);
    },
    watch(e) {
      const { border, sauce, main, jumpToFlag, paddingTop } = scroll;

      const saucePos = sauce.current!.getBoundingClientRect().y - paddingTop;
      const mainPos = main.current!.getBoundingClientRect().y - paddingTop;
      const targetGroup =
        saucePos < border ? (mainPos < border ? 'main' : 'sauce') : 'bun';

      // если есть флаг, то авто-скролл не мучаем,
      if (!jumpToFlag && activeTab!.type !== targetGroup)
        dispatch(changeTab(targetGroup));
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
                dispatch(changeTab(el.type));
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
                          state: { key: item._id, background: location },
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
      <Modal status={isModalOpen}>
        <Outlet />
      </Modal>
    </div>
  );
};
