interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
}

interface UserRegister extends User {
  confirmPassword: string;
}

export type { User, UserRegister };
