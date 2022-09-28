"use strict";
exports.__esModule = true;
exports.Album = void 0;
var startId = 1;
var Album = /** @class */ (function () {
    function Album(name, user) {
        this._album = [];
        this._id = startId++;
        this._name = name;
        this._user = user;
    }
    Object.defineProperty(Album.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "album", {
        get: function () {
            return this._album;
        },
        set: function (value) {
            this._album = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            this._user = value;
        },
        enumerable: false,
        configurable: true
    });
    return Album;
}());
exports.Album = Album;
