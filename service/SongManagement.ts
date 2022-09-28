import {Song} from "../model/Song";

export class SongManagement {
    listSong: Song[] = [];
    result: string = "===== Danh sách Bài hát =====\n";

    add(song: Song) {
        this.listSong.push(song);
    }

    show(): string {
        if (this.listSong.length == 0) {
            console.log("\x1b[33m===== Danh sách Bài hát =====\x1b[0m");
            console.log("\x1b[31mKhông có Bài hát nào cả!!!\x1b[0m");
        } else {
            console.log("\x1b[33m===== Danh sách Bài hát =====\x1b[0m");
            for (let i = 0; i < this.listSong.length; i++) {
                console.log("STT:" + (i + 1) + " - " + "Bài hát:" + this.listSong[i].name + " - " + "Ca sĩ:" + this.listSong[i].singer + " - " + "Sáng tác:" + this.listSong[i].composer);
                this.result += "STT:" + (i + 1) + " - " + "Bài hát:" + this.listSong[i].name + " - " + "Ca sĩ:" + this.listSong[i].singer + " - " + "Sáng tác:" + this.listSong[i].composer + "\n";
            }
        }
        return this.result;
    }
}