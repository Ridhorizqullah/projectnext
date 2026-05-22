export type AuthFormState = {
  status?: string;
  errors?: {
    [key: string]: string[] | undefined;
    email?: string[];
    password?: string[];
    name?: string[];
    role?: string[];
    avatar_url?: string[];
    _form?: string[];
  };
};


export type Profile = {
  id?: string;
  name?: string;
  avatar_url?: string;
  role?: string;
};

