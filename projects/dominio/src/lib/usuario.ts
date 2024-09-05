export class Usuario {
    username?: string;
    password?: string;

    usernameIsValid() {
        return this.username && this.username?.length > 4;
    }

    passwordIsValid() {
        return this.password && this.password?.length > 6 && !this.password.includes(this.username || '');
    }
}
