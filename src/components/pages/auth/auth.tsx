import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { PATH } from 'utils/data';
import { useDispatch, useSelector } from 'hooks/useRedux';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './auth.module.scss';
import { formSubmit, resetError, setForm } from 'services';
import { TFormField } from 'types';

type TPageText = {
  title: string;
  placeholder: null | string;
  button: string;
  quText: string;
};

type TPage = {
  [PATH.LOGIN]: TPageText;
  [PATH.REGISTER]: TPageText;
  [PATH.FORGOT]: TPageText;
  [PATH.RESET]: TPageText;
};

/* ####################
|||||||||||||||||||||||
##################### */

export const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reDir, setReDir] = useState<boolean>(false);

  const form = location.pathname.slice(1) as keyof TPage;

  const { name, email, password, token } = useSelector(
    (state) => state.forms[form],
  );
  const userStatus = useSelector((state) => state.user);

  const isPage = {
    RESET: form === PATH.RESET,
    FORGOT: form === PATH.FORGOT,
    LOGIN: form === PATH.LOGIN,
    REGISTER: form === PATH.REGISTER,
  };

  const page: TPage = {
    [PATH.LOGIN]: {
      title: 'Вход',
      placeholder: null,
      button: 'Войти',
      quText: 'Вы — новый пользователь? ',
    },
    [PATH.REGISTER]: {
      title: 'Регистрация',
      placeholder: null,
      button: 'Зарегистрироваться',
      quText: 'Уже зарегистрированы? ',
    },
    [PATH.FORGOT]: {
      title: 'Восстановление пароля',
      placeholder: 'Укажите e-mail',
      button: 'Восстановить',
      quText: 'Вспомнили пароль? ',
    },
    [PATH.RESET]: {
      title: 'Восстановление пароля',
      placeholder: 'Введите новый пароль',
      button: 'Сохранить',
      quText: 'Вспомнили пароль? ',
    },
  };

  const onFormChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(
      setForm({
        form,
        name: e!.target.name as keyof TFormField,
        data: e!.target.value,
      }),
    );

    if (userStatus.error) dispatch(resetError());
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e!.preventDefault();
    dispatch(formSubmit(form));
    if (isPage.FORGOT) setReDir(true);
  };

  useEffect(() => {
    dispatch(resetError());

    if (isPage.RESET && !userStatus.resetMode)
      navigate(`/${PATH.LOGIN}`, { replace: true });
    if (isPage.FORGOT && userStatus.resetMode && reDir) {
      setReDir(false);
      navigate(`/${PATH.RESET}`, { state: { from: location } });
    }
  }, [location, userStatus.resetMode]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{page[form].title}</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        {isPage.REGISTER && (
          <Input
            placeholder="Имя"
            type={'text'}
            onChange={onFormChange}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            value={name!}
          />
        )}
        {!isPage.RESET && (
          <Input
            placeholder={page[form].placeholder || 'E-mail'}
            type={'email'}
            onChange={onFormChange}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            value={email!}
          />
        )}
        {!isPage.FORGOT && (
          <PasswordInput
            placeholder={page[form].placeholder || 'Пароль'}
            onChange={onFormChange}
            name={'password'}
            value={password!}
            // @ts-ignore
            error={false}
          />
        )}
        {isPage.RESET && (
          <Input
            placeholder="Введите код из письма"
            type={'text'}
            onChange={onFormChange}
            name={'token'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            value={token!}
          />
        )}
        <Button htmlType="submit" type="primary" size="large">
          {userStatus.error ? userStatus.error.message : page[form].button}
        </Button>
      </form>

      <span className={styles.comment}>
        {page[form].quText}
        <NavLink
          to={isPage.LOGIN ? '/register' : '/login'}
          className={styles.link}
        >
          {isPage.LOGIN ? 'Зарегистрироваться' : 'Войти'}
        </NavLink>
      </span>

      {isPage.LOGIN && (
        <span className={styles.comment}>
          Забыли пароль?{' '}
          <NavLink to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </NavLink>
        </span>
      )}
    </div>
  );
};
