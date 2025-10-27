export interface User {
  id?: number;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  password?: string;
}

export interface CreateUserPayload {
  name: string;
  job: string;
}
