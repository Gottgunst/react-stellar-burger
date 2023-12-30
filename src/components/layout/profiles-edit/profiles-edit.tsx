import React, {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'hooks/useRedux';
import { PATH } from 'utils/data';
import { patchProfile } from 'services/user/action';
import { setPassword, setProfileForm } from 'services';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './profiles-edit.module.scss';
import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { GVoid, TFormProfile, TFormRegister, TPatchProfile } from 'types';

type TField = {
  disable: boolean;
  icon: keyof TICons;
};

type TInitialField = {
  name: TField;
  email: TField;
  password: TField;
  passwordType: 'password';
};
type TInput = HTMLInputElement;

/* ####################
|||||||||||||||||||||||
##################### */

export const ProfilesEdit: React.FC = () => {
  const dispatch = useDispatch();
  const profileForm = useSelector((state) => state.forms[PATH.PROFILE]);
  const { name, email, password } = profileForm;
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user);

  const onEdit: TField = {
    disable: false,
    icon: 'CloseIcon',
  };
  const onView: TField = {
    disable: true,
    icon: 'EditIcon',
  };
  const onInitial: TInitialField = {
    name: onView,
    email: onView,
    password: onView,
    passwordType: 'password',
  };
  const [params, setParams] = useState(onInitial);

  const onFormChange: ChangeEventHandler<TInput> = (e) => {
    dispatch(
      setProfileForm({
        form: PATH.PROFILE,
        name: e.target.name as keyof TFormProfile,
        data: e.target.value,
      }),
    );
  };

  const catchEnter: KeyboardEventHandler<TInput> = (e) => {
    const input = e.target;
    // Замена для логики onSubmit, чтобы можно было с поля снять фокус
    if (e.key === 'Enter') {
      onKeySubmit(e);
    }
    if (e.key === 'Escape') {
      endEdit(input as TInput);
    }
  };

  const startEdit: GVoid<TInput> = (input) => {
    const changeView =
      input.name === 'password'
        ? { [input.name]: onEdit, passwordType: 'text' }
        : { [input.name]: onEdit };

    setParams({ ...params, ...changeView } as TInitialField);

    setTimeout(() => {
      input.focus();
    }, 0.1);
  };

  const endEdit: GVoid<TInput | SyntheticEvent> = (input) => {
    let changeView = null;
    // запустим если пришёл ответ…

    // if (userStatus.success === true) {
    if (input.type === 'submit' || input.type === 'click') {
      changeView = onInitial;
    } else {
      changeView =
        (input as TInput).name === 'password'
          ? {
              [(input as TInput).name]: onView,
              passwordType: 'password',
            }
          : { [(input as TInput).name]: onView };
      (input as TInput).blur();
    }
    setParams({ ...params, ...changeView } as TInitialField);
    dispatch(setProfileForm(user as TFormProfile));
    // }
  };

  const onIconClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const input = (e.target as Element)
      .closest('div.input')!
      .querySelector('input') as TInput;
    const name = input.name as keyof TInitialField;

    if (name !== 'passwordType' && params[name].disable) {
      startEdit(input);
    } else {
      endEdit(input);
    }
  };

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (input) => {
    input.preventDefault();

    dispatch(patchProfile(profileForm));
    dispatch(setPassword(password));

    endEdit(input);
  };

  const onKeySubmit: KeyboardEventHandler<TInput> = (input) => {
    input.preventDefault();
    const key = (input.target as TInput).name as keyof Omit<
      TFormProfile,
      'token'
    >;

    if (profileForm[key] !== user![key])
      dispatch(patchProfile({ [key]: profileForm[key] } as TPatchProfile));

    if (key === 'password') {
      dispatch(setPassword(password));
    }

    endEdit(input.target as TInput);
  };

  useEffect(() => {
    dispatch(setProfileForm(user as TFormRegister));
  }, [userStatus.success]);

  return (
    <form className={styles.forms} onSubmit={onFormSubmit}>
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
};
