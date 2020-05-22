import { Authority } from '../../auth/model/authority.model';
export class User {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  enabled: boolean;
  authorities: Authority[];
}
