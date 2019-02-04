class Vacation {
    from: string;
    to: string;
    constructor() {
        this.from = "";
        this.to = "";
    }
}

export class User {
    id: number;
    firstName: string;
    lastName: string;
    birthday: string;
    vacation: Vacation;
    photoUrl: string;
    
    constructor() {
        this.id = 0;
        this.firstName = "";
        this.lastName = "";
        this.birthday = "";
        this.vacation = new Vacation();
        this.photoUrl = "";
    }
}