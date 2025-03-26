export class AuthException extends Error {
    name: string = this.constructor.name;
    stack: string = "Authentification error\n" + this.stack;
}   