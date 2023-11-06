import React from 'react';
// import ReactDOM from 'react-dom';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Form, NavLink, useLocation } from 'react-router-dom';
import { PATH } from '../../../utils/data';
import { useDispatch, useSelector } from 'react-redux';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './auth.module.scss';
import { formSubmit, setForm } from '../../../services';

/* ####################
|||||||||||||||||||||||
##################### */
export function Auth() {
  const location = useLocation();
  const form = location.pathname.slice(1);
  const isLOGIN = form === PATH.LOGIN;
  const dispatch = useDispatch();

  const page = new Map([
    [
      PATH.LOGIN,
      {
        title: 'Вход',
        placeholder: null,
        button: 'Войти',
        quText: 'Вы — новый пользователь? ',
      },
    ],
    [
      PATH.REGISTER,
      {
        title: 'Регистрация',
        placeholder: null,
        button: 'Зарегистрироваться',
        quText: 'Уже зарегистрированы? ',
      },
    ],
    [
      PATH.FORGOT,
      {
        title: 'Восстановление пароля',
        placeholder: 'Укажите e-mail',
        button: 'Восстановить',
        quText: 'Вспомнили пароль? ',
      },
    ],
    [
      PATH.RESET,
      {
        title: 'Восстановление пароля',
        placeholder: 'Введите новый пароль',
        button: 'Сохранить',
        quText: 'Вспомнили пароль? ',
      },
    ],
  ]);

  const { name, email, password, code } = useSelector(
    (state) => state.forms[form],
  );

  const onFormChange = (e) => {
    const name = e.target.name;
    const data = e.target.value;
    dispatch(setForm({ form, name, data }));
  };
  const onSubmit = (e) => {
    dispatch(formSubmit({ form }));
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{page.get(form).title}</h1>
      <Form className={styles.form} onSubmit={onSubmit}>
        {form === PATH.REGISTER && (
          <Input
            placeholder="Имя"
            type={'text'}
            onChange={onFormChange}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            value={name}
          />
        )}
        {form !== PATH.RESET && (
          <Input
            placeholder={page.get(form).placeholder || 'E-mail'}
            type={'email'}
            onChange={onFormChange}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            value={email}
          />
        )}
        {form !== PATH.FORGOT && (
          <PasswordInput
            placeholder={page.get(form).placeholder || 'Пароль'}
            onChange={onFormChange}
            name={'password'}
            value={password}
            error={false}
          />
        )}
        {form === PATH.RESET && (
          <Input
            placeholder="Введите код из письма"
            type={'text'}
            onChange={onFormChange}
            name={'code'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            value={code}
          />
        )}
        <Button htmlType="submit" type="primary" size="large">
          {page.get(form).button}
        </Button>
      </Form>

      <span className={styles.comment}>
        {page.get(form).quText}
        <NavLink to={isLOGIN ? '/register' : '/login'} className={styles.link}>
          {isLOGIN ? 'Зарегистрироваться' : 'Войти'}
        </NavLink>
      </span>

      {isLOGIN && (
        <span className={styles.comment}>
          Забыли пароль?{' '}
          <NavLink to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </NavLink>
        </span>
      )}
    </div>
  );
}
