let startId: number = 1;

export class Song {
    private _id: number;
    private _name: string;
    private _singer: string;
    private _composer: string;

    constructor(name: string, singer: string, composer: string) {
        this._id = startId++;
        this._name = name;
        this._singer = singer;
        this._composer = composer;
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

    get composer(): string {
        return this._composer;
    }

    set composer(value: string) {
        this._composer = value;
    }

    get singer(): string {
        return this._singer;
    }

    set singer(value: string) {
        this._singer = value;
    }
}