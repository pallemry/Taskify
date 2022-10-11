export interface CheckedError {
  message: string;
  isActive: boolean;
}

export interface PasswordCheckedErrors {
  [id: string]: CheckedError;
}