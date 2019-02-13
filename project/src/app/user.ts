class Vacation {
    from: string;
    to: string;
    constructor() {
        this.from = '';
        this.to = '';
    }
}

export class User {
    id: number;
    firstName: string;
    lastName: string;
    birthday: Date;
    vacation: Vacation;
    file: string;
  education: string[];
    constructor() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.birthday = new Date();
        this.vacation = new Vacation();
        this.file = '';
    }
}
