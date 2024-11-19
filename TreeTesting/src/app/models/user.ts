export class User {
    id: number = 0;
    email: string = "";
    username: string = "";

    static createNewUserEmpty() {
        return new User();
    }

    static createNewUser(email: string, username: string) {
        var toReturn = new User;
        toReturn.email = email;
        toReturn.username = username;
        
        return toReturn;
    }

    constructor() {}
}
