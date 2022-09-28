"use strict";
exports.__esModule = true;
exports.SongManagement = void 0;
var SongManagement = /** @class */ (function () {
    function SongManagement() {
        this.listSong = [];
        this.result = "===== Danh sách Bài hát =====\n";
    }
    SongManagement.prototype.add = function (song) {
        this.listSong.push(song);
    };
    SongManagement.prototype.show = function () {
        if (this.listSong.length == 0) {
            console.log("\x1b[33m===== Danh sách Bài hát =====\x1b[0m");
            console.log("\x1b[31mKhông có Bài hát nào cả!!!\x1b[0m");
        }
        else {
            console.log("\x1b[33m===== Danh sách Bài hát =====\x1b[0m");
            for (var i = 0; i < this.listSong.length; i++) {
                console.log("STT:" + (i + 1) + " - " + "Bài hát:" + this.listSong[i].name + " - " + "Ca sĩ:" + this.listSong[i].singer + " - " + "Sáng tác:" + this.listSong[i].composer);
                this.result += "STT:" + (i + 1) + " - " + "Bài hát:" + this.listSong[i].name + " - " + "Ca sĩ:" + this.listSong[i].singer + " - " + "Sáng tác:" + this.listSong[i].composer + "\n";
            }
        }
        return this.result;
    };
    return SongManagement;
}());
exports.SongManagement = SongManagement;
