import { JSX } from 'react/jsx-dev-runtime';
import toast from 'react-hot-toast/headless';

import { SnackbarOptions } from './types';

type Renderable = JSX.Element | string | null;

type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;

type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;

export const snackbar = {
  promise: <T = any>(
    promise: Promise<T>,
    content: {
      loading: Renderable;
      success: ValueOrFunction<Renderable, T>;

      error: ValueOrFunction<Renderable, any>;
    },
    o?: {
      loading: Partial<SnackbarOptions>;
      success: Partial<SnackbarOptions>;
      error: Partial<SnackbarOptions>;
    },
  ) =>
    toast.promise(promise, content, {
      loading: { ...o?.loading },
      success: { ...o?.success },
      error: { ...o?.error },
    }),
};
