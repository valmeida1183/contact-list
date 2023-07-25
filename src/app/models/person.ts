import { Contact } from './contacts';

export interface Person {
  id?: string;
  name: string;
  contacts?: Contact[];
}
