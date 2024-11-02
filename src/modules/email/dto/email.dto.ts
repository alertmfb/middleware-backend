export class PasswordReset {
  email: string;
  otp: string;
}

export class NotifyPasswordChanged {
  email: string;
}

export class NotifySignIn {
  ipAddress: string;
  email: string;
}
