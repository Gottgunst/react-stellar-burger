// import React from 'react';
// import ReactDOM from 'react-dom';
import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Form } from 'react-router-dom';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './profiles-edit.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { PATH } from '../../../utils/data';

/* ####################
|||||||||||||||||||||||
##################### */

export function ProfilesEdit() {
  const dispatch = useDispatch();

  const onIconClick = (evt) => {
    console.log(evt);
  };

  const { name, email, password } = useSelector(
    (state) => state.forms[PATH.PROFILE],
  );
  return (
    <Form className={styles.forms}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        // onChange={(e) => setValue(e.target.value)}
        icon={'EditIcon'}
        value={name}
        name={'Name'}
        error={false}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        disabled
      />
      <Input
        type={'text'}
        placeholder={'Логин'}
        // onChange={(e) => setValue(e.target.value)}
        icon="EditIcon"
        value={email}
        name={'Name'}
        error={false}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        disabled
      />
      <PasswordInput
        placeholder="Пароль"
        // onChange={onChange}
        value={password}
        name={'password'}
        icon="EditIcon"
      />
    </Form>
  );
}
