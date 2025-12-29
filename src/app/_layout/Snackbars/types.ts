export enum Variant {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export interface SnackbarOptions {
  id?: string;
  label?: string;
  variant: Variant;
}
