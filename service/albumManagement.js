"use strict";
exports.__esModule = true;
exports.AlbumManagement = void 0;
var AlbumManagement = /** @class */ (function () {
    function AlbumManagement() {
        this.listAlbum = [];
    }
    AlbumManagement.prototype.add = function (album) {
        this.listAlbum.push(album);
    };
    AlbumManagement.prototype.show = function () {
        if (this.listAlbum.length == 0) {
            console.log("\x1b[33m===== Danh sách Album =====\x1b[0m");
            console.log("\x1b[31mKhông có Album nào cả!!!\x1b[0m");
        }
        else {
            console.log("\x1b[33m===== Danh sách Album =====\x1b[0m");
            for (var i = 0; i < this.listAlbum.length; i++) {
                console.log("STT:" + (i + 1) + " - " + "Tên:" + this.listAlbum[i].name);
            }
        }
    };
    return AlbumManagement;
}());
exports.AlbumManagement = AlbumManagement;
