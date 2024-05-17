import { Avatar } from "./Avatar";

export type User = {
  id: string | number;
  avatar: Avatar;
  name: string;
  last_name: string;
  email: string;
  role: string;
  last_login: string;
  staff_role: string;
  is_active: boolean;
  type: string;
  created: string;
  modified: string;
};
