import { useSelector } from 'hooks/useRedux';
import { Navigate, useLocation } from 'react-router-dom';
import { PATH } from '../../utils/data';
import { Loading } from '../ui-kit';
import React from 'react';

/* ####################
====== ТИПИЗАЦИЯ ======
##################### */
type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.ReactElement;
};

/* ####################
|||||||||||||||||||||||
##################### */
export const Protected: React.FC<TProtectedProps> = ({
  onlyUnAuth = false,
  component,
}) => {
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Loading />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={`/${PATH.LOGIN}`} state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth: React.FC<Pick<TProtectedProps, 'component'>> = ({
  component,
}) => <Protected onlyUnAuth={true} component={component} />;
