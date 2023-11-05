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

/* ####################
|||||||||||||||||||||||
##################### */

export function ProfilesEdit() {
  const value = 'sad';

  const onIconClick = (evt) => {
    console.log(evt);
  };

  return (
    <Form className={styles.forms}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        // onChange={(e) => setValue(e.target.value)}
        icon={'EditIcon'}
        value={value}
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
        value={value}
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
        value={value}
        name={'password'}
        icon="EditIcon"
      />
    </Form>
  );
}
