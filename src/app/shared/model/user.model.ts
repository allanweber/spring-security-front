import { Authority } from './authority.model';
export class User {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  enabled: boolean;
  twoFactor: boolean;
  authorities: Authority[];
}
