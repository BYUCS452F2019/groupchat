import { SignInRequest } from './sign-in-request';

export interface SignUpRequest extends SignInRequest {
  email: string;
  firstName: string;
  lastName: string;
  joinDate: string;
  pictureUrl: string;
}