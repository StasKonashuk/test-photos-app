import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '../../common';
import { APP_ROUTES, NavigateState } from '../../../constants';
import { signUpSchema } from '../../../validators';
import { useRegistrationMutation } from '../../../api';
import { useEnhancedNavigate } from '../../../hooks';
import { snackActions } from '../../../utils';

import './styles.scss';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

export function SignUpLayout(): ReactElement {
  const { scrollNavigate } = useEnhancedNavigate();
  const location = useLocation();

  const [registration, { isLoading }] = useRegistrationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (formData): Promise<void> => {
    try {
      const { email, password, name } = formData;

      await registration({ email, password, name }).unwrap();

      const from = (location.state as NavigateState)?.from.pathname || APP_ROUTES.SIGN_IN;
      scrollNavigate({ top: 0, left: 0, path: from, replace: true });

      snackActions.success('You have been registered');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sign-up-wrapper">
      <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Sign Up</h1>
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
          label="Name"
          name="name"
          type="text"
          errorMsg={errors.name?.message}
          id="name"
          placeholder="Name"
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
        <Input
          register={register}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          errorMsg={errors.confirmPassword?.message}
          id="confirmPassword"
          placeholder="Confirm Password"
        />
        <div>
          <Button
            value=" Sign Up"
            disabled={
              !dirtyFields.email ||
              !dirtyFields.password ||
              !dirtyFields.confirmPassword ||
              !dirtyFields.name ||
              isLoading
            }
            className="submit-button"
            type="submit"
          />
        </div>
        <div>
          <Link className="sign-in-link" to={APP_ROUTES.SIGN_IN}>
            Go back to Sign In!
          </Link>
        </div>
      </form>
    </div>
  );
}
