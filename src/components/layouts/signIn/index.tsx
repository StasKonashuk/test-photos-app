import React, { ReactElement } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '../../common';
import { signInSchema } from '../../../validators';
import { useLoginMutation } from '../../../api';
import { useEnhancedNavigate } from '../../../hooks';
import { APP_ROUTES, NavigateState } from '../../../constants';

import './styles.scss';

type FormValues = {
  email: string;
  password: string;
};

export function SignInLayout(): ReactElement {
  const location = useLocation();

  const { scrollNavigate } = useEnhancedNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(signInSchema),
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (formData): Promise<void> => {
    try {
      const { email, password } = formData;

      const loginResult = await login({ email, password }).unwrap();

      if (loginResult) {
        const from = (location.state as NavigateState)?.from.pathname || APP_ROUTES.HOME_PAGE;

        scrollNavigate({ top: 0, left: 0, path: from, replace: true, behavior: 'smooth' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sign-in-wrapper">
      <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Sign In</h1>
        </div>
        <Input
          register={register}
          label="Email"
          name="email"
          type="email"
          errorMsg={errors.email?.message}
          id="email"
          placeholder="Email"
        />
        <Input
          register={register}
          label="Password"
          name="password"
          type="password"
          errorMsg={errors.password?.message}
          id="password"
          placeholder="Password"
        />
        <div>
          <Button
            disabled={!dirtyFields.email || !dirtyFields.password || isLoading}
            type="submit"
            className="submit-button"
            value="Sign In"
          />
        </div>
        <div>
          <Link className="sign-up-link" to={APP_ROUTES.SIGN_UP}>
            Create an account!
          </Link>
        </div>
      </form>
    </div>
  );
}
