export class User {
    public _id: string;
    public name: string;
    public username: string;
    public email: string;
    public totalVictories: number;
    public totalScore: number;
    public token: string;
    public password: string;
    public confirmPassword: string;
    public avatar: string;

    public constructor(id: string, name: string, username: string, email: string, totalVictories: number, totalScore: number, token: string, password: string, confirmPassword: string, avatar: string){
        this._id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.totalVictories = totalVictories;
        this.totalScore = totalScore;
        this.token = token;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.avatar = avatar;
    }
}

