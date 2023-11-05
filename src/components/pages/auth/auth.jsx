import React from 'react';
// import { useState, useRef } from 'react';
// import ReactDOM from 'react-dom';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Form, NavLink, useLocation } from 'react-router-dom';
import { FORGOT, LOGIN, REGISTER, RESET } from '../../..';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './auth.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function Auth() {
  const location = useLocation();
  const key = location.pathname.slice(1);

  // const [value, setValue] = useState('value');
  // const inputRef = useRef(null);
  // const onIconClick = () => {
  //   setTimeout(() => inputRef.current.focus(), 0);
  //   alert('Icon Click Callback');
  // };

  const page = new Map([
    [
      LOGIN,
      {
        title: 'Вход',
        placeholder: null,
        button: 'Войти',
        quText: 'Вы — новый пользователь? ',
      },
    ],
    [
      REGISTER,
      {
        title: 'Регистрация',
        placeholder: null,
        button: 'Зарегистрироваться',
        quText: 'Уже зарегистрированы? ',
      },
    ],
    [
      FORGOT,
      {
        title: 'Восстановление пароля',
        placeholder: 'Укажите e-mail',
        button: 'Восстановить',
        quText: 'Вспомнили пароль? ',
      },
    ],
    [
      RESET,
      {
        title: 'Восстановление пароля',
        placeholder: 'Введите новый пароль',
        button: 'Сохранить',
        quText: 'Вспомнили пароль? ',
      },
    ],
  ]);

  const isLOGIN = key === LOGIN;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{page.get(key).title}</h1>
      <Form className={styles.form}>
        {key === REGISTER && (
          <Input
            placeholder="Имя"
            type={'text'}
            // onChange={(e) => setValue(e.target.value)}
            name={'Name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            value=""
          />
        )}
        {key !== RESET && (
          <Input
            placeholder={page.get(key).placeholder || 'E-mail'}
            type={'email'}
            // onChange={(e) => setValue(e.target.value)}
            name={'Email'}
            error={false}
            // ref={inputRef}
            // onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            value=""
          />
        )}
        {key !== FORGOT && (
          <PasswordInput
            placeholder={page.get(key).placeholder || 'Пароль'}
            // onChange={onChange}
            name={'password'}
            value=""
          />
        )}
        {key === RESET && (
          <Input
            placeholder="Введите код из письма"
            type={'text'}
            // onChange={(e) => setValue(e.target.value)}
            name={'Code'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            value=""
          />
        )}
        <Button htmlType="button" type="primary" size="large">
          {page.get(key).button}
        </Button>
      </Form>

      <span className={styles.comment}>
        {page.get(key).quText}
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
