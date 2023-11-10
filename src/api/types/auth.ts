import { UserState } from '../../redux/slices';

export interface UserCredentialData extends Omit<UserState, 'isAuthenticated' | 'accessToken'> {
  tokenData: {
    accessToken: string;
  };
}

export interface RegistrationRequest extends Pick<UserState, 'email' | 'name'> {
  password: string;
}

export interface LoginRequest extends Pick<UserState, 'email'> {
  password: string;
}
