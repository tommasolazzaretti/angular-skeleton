import {IAsyncItem} from './i-async-item';

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company: {
    name: string;
  };
}

export type AsyncUserList = IAsyncItem<IUser>[];
