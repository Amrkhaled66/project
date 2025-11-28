interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
}

interface UserRegister extends User {
  confirmPassword: string;
}

export type { User, UserRegister };
