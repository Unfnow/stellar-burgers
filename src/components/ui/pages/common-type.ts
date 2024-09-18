import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

export type PageUIProps = {
  errorText: string | undefined;
  email: string;
  setEmail: (e: string) => void;
  handleSubmit: (e: SyntheticEvent) => void;
};
