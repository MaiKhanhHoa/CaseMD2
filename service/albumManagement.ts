import {Album} from "../model/Album";

export class AlbumManagement {
    listAlbum: Album[] = [];

    add(album: Album) {
        this.listAlbum.push(album);
    }

    show() {
        if (this.listAlbum.length == 0) {
            console.log("\x1b[33m===== Danh sách Album =====\x1b[0m");
            console.log("\x1b[31mKhông có Album nào cả!!!\x1b[0m");
        } else {
            console.log("\x1b[33m===== Danh sách Album =====\x1b[0m");
            for (let i = 0; i < this.listAlbum.length; i++) {
                console.log("STT:" + (i + 1) + " - " + "Tên:" + this.listAlbum[i].name);
            }
        }
    }
}