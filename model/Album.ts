import {Song} from "./Song";
import {User} from "./User";

let startId:number = 1;

export class Album {
    private _id: number;
    private _name: string;
    private _user: User;
    private _album: Song[] = [];

    constructor(name: string, user: User) {
        this._id = startId++;
        this._name = name;
        this._user = user;
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

    get album(): Song[] {
        return this._album;
    }

    set album(value: Song[]) {
        this._album = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }
}