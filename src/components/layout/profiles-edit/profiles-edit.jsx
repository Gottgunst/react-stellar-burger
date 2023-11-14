import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Form } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PATH } from '../../../utils/data';
import { patchProfile } from '../../../services/user/action';
import { setForm, setPassword, setProfileForm } from '../../../services';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './profiles-edit.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */

export function ProfilesEdit() {
  const dispatch = useDispatch();
  const profileForm = useSelector((state) => state.forms[PATH.PROFILE]);
  const { name, email, password } = profileForm;
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user);

  const onEdit = {
    disable: false,
    icon: 'CheckMarkIcon',
  };
  const onView = {
    disable: true,
    icon: 'EditIcon',
  };
  const [params, setParams] = useState({
    name: onView,
    email: onView,
    password: onView,
  });
  let applyFlag = false;

  const applyChanges = (input) => {
    applyFlag = true;
    if (profileForm[input.name] !== user[input.name])
      dispatch(patchProfile({ [input.name]: profileForm[input.name] }));

    // запустим если пришёл ответ…
    if (!userStatus.loading && userStatus.success) {
      if (input.name === 'password') {
        dispatch(setPassword(password));
        dispatch(
          setProfileForm({
            name: 'password',
            data: '•'.repeat(password.length),
          }),
        );
      }
    }
    // нужно условие иначе
    input.blur();
  };

  const onIconClick = (e) => {
    const input = e.target.closest('div.input').querySelector('input');

    if (params[input.name].disable) {
      setParams({ ...params, [input.name]: onEdit });

      if (input.name === 'password')
        dispatch(
          setProfileForm({
            name: 'password',
            data: user.password,
          }),
        );

      setTimeout(() => {
        input.focus();
      }, 0.1);
    } else {
      applyChanges(input);
    }
  };

  const onFormChange = (e) => {
    const inputName = e.target.name;
    const newData = e.target.value;
    dispatch(setProfileForm({ name: inputName, data: newData }));
  };

  const catchEnter = (e) => {
    const input = e.target;
    if (e.key === 'Enter') {
      applyChanges(input);
    }
    if (e.key === 'Escape') {
      e.target.blur(e);
    }
  };

  const catchBlur = (e) => {
    const input = e.target;
    setParams({ ...params, [input.name]: onView });
    if (!applyFlag)
      dispatch(
        setProfileForm({
          formData: { ...user, password: '•'.repeat(user.password.length) },
        }),
      );
    applyFlag = false;
  };

  return (
    <Form className={styles.forms}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onFormChange}
        icon={params.name.icon}
        value={name}
        name={'name'}
        error={false}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        disabled={params.name.disable}
        onKeyDown={catchEnter}
        onBlur={catchBlur}
      />
      <Input
        type={'email'}
        placeholder={'Логин'}
        onChange={onFormChange}
        icon={params.email.icon}
        value={email}
        name={'email'}
        error={false}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        disabled={params.email.disable}
        onKeyDown={catchEnter}
        onBlur={catchBlur}
      />
      <Input
        type={'text'}
        placeholder={'Пароль'}
        onChange={onFormChange}
        icon={params.password.icon}
        value={password}
        name={'password'}
        error={false}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        disabled={params.password.disable}
        onKeyDown={catchEnter}
        onBlur={catchBlur}
      />
    </Form>
  );
}
