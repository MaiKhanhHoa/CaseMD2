let startId: number = 1;

export class User {
    private _id: number;
    private _name: string;
    private _password: string;
    private _status: boolean;

    constructor(name: string, password: string, status: boolean) {
        this._id = startId++;
        this._name = name;
        this._password = password;
        this._status = status;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get status(): boolean {
        return this._status;
    }

    set status(value: boolean) {
        this._status = value;
    }
}