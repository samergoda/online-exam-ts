declare type User = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  token: string;
  isVerified: boolean;
} & DatabaseFields;

declare type UserLoginResponse = {
  message: string;
  token: string;
  user: User;
};

declare type UserSignupResponse = {
  message: string;
  token: string;
  user: User;
};

type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
};
type ResetPasswordFormData = {
  oldPassword: string;
  password: string;
  rePassword: string;
};

type ForgotPasswordFormData = {
  email: string;
};

type VerifyResetCodeFormData = {
  resetCode: string;
};
