import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { PATH } from '../../../utils/data';
import { patchProfile } from '../../../services/user/action';
import { setPassword, setProfileForm } from '../../../services';

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
    icon: 'CloseIcon',
  };
  const onView = {
    disable: true,
    icon: 'EditIcon',
  };
  const onInitial = {
    name: onView,
    email: onView,
    password: onView,
    passwordType: 'password',
  };
  const [params, setParams] = useState(onInitial);

  const onFormChange = (e) => {
    const inputName = e.target.name;
    const newData = e.target.value;
    dispatch(setProfileForm({ name: inputName, data: newData }));
  };

  const catchEnter = (e) => {
    const input = e.target;
    if (e.key === 'Enter') {
      onSubmit(e);
    }
    if (e.key === 'Escape') {
      endEdit(input);
    }
  };

  const startEdit = (input) => {
    const changeView =
      input.name === 'password'
        ? { [input.name]: onEdit, passwordType: 'text' }
        : { [input.name]: onEdit };

    setParams({ ...params, ...changeView });

    setTimeout(() => {
      input.focus();
    }, 0.1);
  };

  const endEdit = (input) => {
    let changeView = null;
    // запустим если пришёл ответ…

    // if (userStatus.success === true) {
    if (input.type === 'submit' || input.type === 'click') {
      changeView = onInitial;
    } else {
      changeView =
        input.name === 'password'
          ? { [input.name]: onView, passwordType: 'password' }
          : { [input.name]: onView };
      input.blur();
    }
    setParams({ ...params, ...changeView });
    dispatch(
      setProfileForm({
        formData: user,
      }),
    );
    // }
  };

  const onIconClick = (e) => {
    const input = e.target.closest('div.input').querySelector('input');

    if (params[input.name].disable) {
      startEdit(input);
    } else {
      endEdit(input);
    }
  };

  const onSubmit = (input) => {
    input.preventDefault();

    if (input.type === 'submit') {
      dispatch(patchProfile(profileForm));
      dispatch(setPassword(password));

      endEdit(input);
    } else {
      const key = input.target.name;

      if (profileForm[key] !== user[key])
        dispatch(patchProfile({ [key]: profileForm[key] }));

      if (key === 'password') {
        dispatch(setPassword(password));
      }

      endEdit(input.target);
    }
  };

  useEffect(() => {
    dispatch(
      setProfileForm({
        formData: user,
      }),
    );
  }, [userStatus.success]);

  return (
    <form className={styles.forms} onSubmit={onSubmit}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onFormChange}
        icon={params.name.icon}
        value={name}
        name={'name'}
        // error={false}
        onIconClick={onIconClick}
        // errorText={'Ошибка'}
        size={'default'}
        disabled={params.name.disable}
        onKeyDown={catchEnter}
      />
      <Input
        type={'email'}
        placeholder={'Логин'}
        onChange={onFormChange}
        icon={params.email.icon}
        value={email}
        name={'email'}
        // error={false}
        onIconClick={onIconClick}
        // errorText={'Ошибка'}
        size={'default'}
        disabled={params.email.disable}
        onKeyDown={catchEnter}
      />
      <Input
        type={params.passwordType}
        placeholder={'Пароль'}
        onChange={onFormChange}
        icon={params.password.icon}
        value={password}
        name={'password'}
        // error={false}
        onIconClick={onIconClick}
        // errorText={'Ошибка'}
        size={'default'}
        disabled={params.password.disable}
        onKeyDown={catchEnter}
      />
      {[
        params.name.disable,
        params.email.disable,
        params.password.disable,
      ].some((el) => el === false) && (
        <div className={styles.buttons}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={endEdit}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}
