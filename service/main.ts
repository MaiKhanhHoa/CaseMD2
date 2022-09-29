import {User} from "../model/User";
import {UserManagement} from "./UserManagement";
import {SongManagement} from "./SongManagement";
import {Song} from "../model/Song";
import {Album} from "../model/Album";
import {AlbumManagement} from "./albumManagement";
import * as fs from 'fs';

let input = require('readline-sync');
let idUser: number = null;
let allAlbum: Album[] = [];
let userManagement: UserManagement = new UserManagement();
let songManagement: SongManagement = new SongManagement();
let albumManagement: AlbumManagement = new AlbumManagement();

function adminMenu() {
    let menu: string = `
    \x1b[33m===== Admin Menu =====\x1b[0m
    1. Quản lý Người dùng
    2. Quản lý Bài hát
    0. Đăng xuất
    `
    let choice: string = null;
    while (choice != "0") {
        console.log(menu);
        choice = input.question("Nhap lua chon: ");
        switch (choice) {
            case "1":
                let menu1: string = `
                \x1b[33m===== Quản lý Người dùng =====\x1b[0m
                1. Hiện thị danh sách
                2. Khóa Người dùng
                3. Mở khóa Người dùng
                0. Thoát
                `
                let choice1: string = null;
                while (choice1 != "0") {
                    console.log(menu1);
                    choice1 = input.question("Nhap lua chon: ");
                    switch (choice1) {
                        case "1":
                            showListUser();
                            break;
                        case "2":
                            let index: number = null;
                            while (index != 0) {
                                showListUser();
                                console.log("\x1b[31mNhập STT Người dùng để Khóa\x1b[0m");
                                console.log("\x1b[31mBấm 0 hoặc Enter để Thoát\x1b[0m");
                                index = +input.question("Nhap lua chon: ");
                                if (index > 0 && index <= userManagement.listUser.length) {
                                    for (let i = 0; i < userManagement.listUser.length; i++) {
                                        if (i == index - 1) {
                                            userManagement.listUser[i].status = false;
                                            console.log("\x1b[31mTài khoản đã bị khóa!!!\x1b[0m");
                                        }
                                    }
                                } else if (index == 0) {
                                    break;
                                } else {
                                    console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                                }
                            }
                            break;
                        case "3":
                            let index1: number = null;
                            while (index1 != 0) {
                                showListUser();
                                console.log("\x1b[34mNhập STT Người dùng để Mở khóa\x1b[0m");
                                console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
                                index1 = +input.question("Nhap lua chon: ");
                                if (index1 > 0 && index1 <= userManagement.listUser.length) {
                                    for (let i = 0; i < userManagement.listUser.length; i++) {
                                        if (i == index1 - 1) {
                                            userManagement.listUser[i].status = true;
                                            console.log("\x1b[34mTài khoản đã được mở khóa!!!\x1b[0m");
                                        }
                                    }
                                } else if (index1 == 0) {
                                    break;
                                } else {
                                    console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                                }
                            }
                            break;
                        case "0":
                            break;
                        default:
                            console.log("\x1b[31mChọn sai rồi!!! Nhập lại đê!!!\x1b[0m");
                            break;
                    }
                }
                break;
            case "2":
                let menu2: string = `
                \x1b[33m===== Quản lý Bài hát =====\x1b[0m
                1. Thêm Bài hát mới
                2. Hiện thị danh sách Bài hát
                3. Xóa Bài hát
                4. Sửa thông tin Bài hát
                0. Thoát
                `
                let choice2: string = null;
                while (choice2 != "0") {
                    console.log(menu2);
                    choice2 = input.question("Nhap lua chon: ");
                    switch (choice2) {
                        case "1":
                            addSong();
                            break;
                        case "2":
                            showListSong();
                            break;
                        case "3":
                            deleteSong();
                            break;
                        case "4":
                            editSong();
                            break;
                        case "0":
                            break;
                        default:
                            console.log("\x1b[31mChọn sai rồi!!! Nhập lại đê!!!\x1b[0m");
                            break;
                    }
                }
                break;
            case "0":
                break;
            default:
                console.log("\x1b[31mChọn sai rồi!!! Nhập lại đê!!!\x1b[0m");
                break;
        }
    }
}

function userMenu() {
    let menu: string = `
    \x1b[33m===== User Menu =====\x1b[0m
    1. Tạo Album mới
    2. Hiện thị danh sách Album
    3. Xóa Album
    4. Sửa Tên Album
    5. Hiện thị và Chỉnh sửa một Album
    6. Tìm Album bằng Tên
    0. Đăng xuất
    `
    let choice: string = null;
    while (choice != "0") {
        console.log(menu);
        choice = input.question("Nhap lua chon: ");
        switch (choice) {
            case "1":
                addAlbum();
                break;
            case "2":
                showListAlbum();
                break;
            case "3":
                deleteAlbum();
                break;
            case "4":
                editAlbum();
                break;
            case "5":
                showAndEditAlbum();
                break;
            case "6":
                findAlbumByName();
                break;
            case "0":
                albumManagement.listAlbum = [];
                break;
            default:
                console.log("\x1b[31mChọn sai rồi!!! Nhập lại đê!!!\x1b[0m");
                break;
        }
    }
}

function showListUser() {
    let data: string = userManagement.show();
    fs.writeFileSync('./data.txt', data);
    userManagement.result = "===== Danh sách Người dùng =====\n";
}

function showAndEditAlbum() {
    let index: number = null;
    while (index != 0) {
        showListAlbum();
        console.log("\x1b[34mNhập STT Album để Hiện thị và Chỉnh sửa\x1b[0m");
        console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
        index = +input.question("Nhap lua chon: ");
        if (index > 0 && index <= albumManagement.listAlbum.length) {
            let currentAlbum: Album = albumManagement.listAlbum[index - 1];
            console.log(`\x1b[33m===== Album ${currentAlbum.name} =====\x1b[0m`);
            if (currentAlbum.album.length == 0) {
                console.log("\x1b[31mAlbum trống\x1b[0m\n");
            } else {
                for (let i = 0; i < currentAlbum.album.length; i++) {
                    console.log("STT:" + (i + 1) + " - " + "Bài hát:" + currentAlbum.album[i].name + " - " + "Ca sĩ:" + currentAlbum.album[i].singer);
                }
            }
            let menu: string = `
                \x1b[34m===== Chỉnh sửa Album ${currentAlbum.name} không??? =====\x1b[0m
                1. Có
                2. Không
                `
            let choice: string = null;
            while (choice != "2") {
                console.log(menu);
                choice = input.question("Nhap lua chon: ");
                if (choice == "1") {
                    let menu1: string = `
                    \x1b[33m===== Chỉnh sửa Album ${currentAlbum.name} =====\x1b[0m
                    1. Tìm Bài hát trong Album
                    2. Xóa Bài hát khỏi Album
                    3. Sửa Tên Bài hát trong Album
                    4. Thêm Bài hát vào Album
                    5. Hiện thị Danh sách Bài hát
                    0. Thoát
                    `
                    let choice1: string = null;
                    while (choice1 != "0") {
                        console.log(menu1);
                        choice1 = input.question("Nhap lua chon: ");
                        switch (choice1) {
                            case "1":
                                let name: string = input.question("Nhap Ten Bai hat can tim: ");
                                let newListSong: Song[] = [];
                                for (let i = 0; i < currentAlbum.album.length; i++) {
                                    if (currentAlbum.album[i].name.includes(name)) {
                                        newListSong.push(currentAlbum.album[i]);
                                    }
                                }
                                if (newListSong.length == 0) {
                                    console.log("\x1b[34m===== Kết quả =====\x1b[0m");
                                    console.log("\x1b[31mKhông có Tên Bài hát nào như vậy!!!\x1b[0m");
                                } else {
                                    console.log("\x1b[34m===== Kết quả =====\x1b[0m");
                                    for (let i = 0; i < newListSong.length; i++) {
                                        console.log("Tên Bài hát:" + newListSong[i].name + " - " + "Ca sĩ:" + newListSong[i].singer + " - " + "Nhạc sĩ:" + newListSong[i].composer);
                                    }
                                }
                                break;
                            case "2":
                                console.log(`\x1b[33m===== Album ${currentAlbum.name} =====\x1b[0m`);
                                let index: number = null;
                                while (index != 0) {
                                    console.log("\x1b[33m===== Danh sách Bài hát =====\x1b[0m");
                                    if (currentAlbum.album.length == 0) {
                                        console.log("\x1b[31mKhông có Bài hát nào!!!\x1b[0m");
                                    } else {
                                        for (let i = 0; i < currentAlbum.album.length; i++) {
                                            console.log("STT:" + (i + 1) + " - " + "Bài hát:" + currentAlbum.album[i].name + " - " + "Ca sĩ:" + currentAlbum.album[i].singer);
                                        }
                                    }
                                    console.log("----------------------")
                                    console.log("\x1b[31mNhập STT Bài hát để Xóa\x1b[0m");
                                    console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
                                    index = +input.question("Nhap lua chon: ");
                                    if (index > 0 && index <= currentAlbum.album.length) {
                                        let menu: string = `
                                        \x1b[31m===== Xóa Bài hát STT:${index} ??? =====\x1b[0m
                                        1. Có
                                        2. Không
                                        `
                                        let choice: string = null;
                                        while (choice != "2") {
                                            console.log(menu);
                                            choice = input.question("Nhap lua chon: ");
                                            if (choice == "1") {
                                                currentAlbum.album.splice(index - 1, 1);
                                                break;
                                            } else if (choice == "2") {
                                                break;
                                            } else {
                                                console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                                            }
                                        }
                                    } else if (index == 0) {
                                        break;
                                    } else {
                                        console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                                    }
                                }
                                break;
                            case "3":
                                console.log(`\x1b[33m===== Album ${currentAlbum.name} =====\x1b[0m`);
                                let index2: number = null;
                                while (index2 != 0) {
                                    for (let i = 0; i < currentAlbum.album.length; i++) {
                                        console.log("STT:" + (i + 1) + " - " + "Bài hát:" + currentAlbum.album[i].name + " - " + "Ca sĩ:" + currentAlbum.album[i].singer);
                                    }
                                    console.log("\x1b[34mNhập STT Bài hát để Sửa Tên\x1b[0m");
                                    console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
                                    index2 = +input.question("Nhap lua chon: ");
                                    if (index2 > 0 && index2 <= currentAlbum.album.length) {
                                        let name: string = "";
                                        let check: boolean;
                                        do {
                                            name = input.question("Nhap Ten moi cua Bai hat: ");
                                            if (name == "") {
                                                console.log("\x1b[31mKhông được để trống Tên Bài hat!!!\x1b[0m");
                                            } else {
                                                for (let i = 0; i < currentAlbum.album.length; i++) {
                                                    if (name == currentAlbum.album[i].name) {
                                                        console.log("\x1b[31mTên Bài hát này đã tồn tại!!!\x1b[0m");
                                                        check = true;
                                                        name = "";
                                                        break;
                                                    } else {
                                                        check = false;
                                                    }
                                                }
                                                if (!check) {
                                                    for (let i = 0; i < currentAlbum.album.length; i++) {
                                                        if (i == index2 - 1) {
                                                            currentAlbum.album[i].name = name;
                                                            console.log("STT:" + (i + 1) + " - " + "Tên:" + currentAlbum.album[i].name);
                                                        }
                                                    }
                                                }
                                            }
                                        } while (name == "");
                                    } else if (index2 == 0) {
                                        break;
                                    } else {
                                        console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                                    }
                                }
                                break;
                            case "4":
                                let index3: number = null;
                                while (index3 != 0) {
                                    showListSong();
                                    console.log("\x1b[34mNhập STT Bài hát để Thêm vào Album\x1b[0m");
                                    console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
                                    index3 = +input.question("Nhap lua chon: ");
                                    if (index3 > 0 && index3 <= songManagement.listSong.length) {
                                        let check: boolean;
                                        for (let i = 0; i < currentAlbum.album.length; i++) {
                                            if (currentAlbum.album[i].name == songManagement.listSong[index3 - 1].name) {
                                                check = true;
                                                console.log("\x1b[31mAlbum đã có Bài hát này!!!\x1b[0m");
                                                break;
                                            } else {
                                                check = false;
                                            }
                                        }
                                        if (!check) {
                                            console.log("\x1b[34mBài hát đã được Thêm vào Album\x1b[0m");
                                            currentAlbum.album.push(songManagement.listSong[index3 - 1]);
                                        }
                                    } else if (index3 == 0) {
                                        break;
                                    } else {
                                        console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                                    }
                                }
                                break;
                            case "5":
                                console.log(`\x1b[33m===== Album ${currentAlbum.name} =====\x1b[0m`);
                                for (let i = 0; i < currentAlbum.album.length; i++) {
                                    console.log("STT:" + (i + 1) + " - " + "Bài hát:" + currentAlbum.album[i].name + " - " + "Ca sĩ:" + currentAlbum.album[i].singer);
                                }
                                break;
                            case "0":
                                break;
                            default:
                                console.log("\x1b[31mChọn sai rồi!!! Nhập lại đê!!!\x1b[0m");
                                break;
                        }
                    }
                } else if (choice == "2") {
                    break;
                } else {
                    console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                }
            }
        } else if (index == 0) {
            break;
        } else {
            console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
        }
    }
}

function addSong() {
    let name: string = "";
    let check: boolean;
    do {
        name = input.question("Nhap Ten Bai hat: ");
        if (name == "") {
            console.log("\x1b[31mKhông được để trống Tên Bài hát!!!\x1b[0m");
        } else {
            for (let i = 0; i < songManagement.listSong.length; i++) {
                if (name == songManagement.listSong[i].name) {
                    check = true
                    console.log("\x1b[31mTên này đã tồn tại!!!\x1b[0m");
                    name = "";
                    break;
                } else {
                    check = false;
                }
            }
            if (!check) {
                let singer: string = input.question("Nhap Ten Ca si: ");
                let composer: string = input.question("Nhap Ten Nguoi sang tac: ");
                let song: Song = new Song(name, singer, composer);
                songManagement.add(song);
            }
        }
    }
    while (name == "");
}

function showListSong() {
    let data: string = songManagement.show();
    fs.writeFileSync('./data.txt', data);
    songManagement.result = "===== Danh sách Bài hát =====\n";
}

function deleteSong() {
    let index: number = null;
    while (index != 0) {
        showListSong();
        console.log("\x1b[31mNhập STT Bài hát để Xóa\x1b[0m");
        console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
        index = +input.question("Nhap lua chon: ");
        if (index > 0 && index <= songManagement.listSong.length) {
            let menu: string = `
            \x1b[31m===== Xóa Bài hát STT:${index} ??? =====\x1b[0m
            1. Có
            2. Không
            `
            let choice: string = null;
            while (choice != "2") {
                console.log(menu);
                choice = input.question("Nhap lua chon: ");
                if (choice == "1") {
                    songManagement.listSong.splice(index - 1, 1);
                    break;
                } else if (choice == "2") {
                    break;
                } else {
                    console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                }
            }
        } else if (index == 0) {
            break;
        } else {
            console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
        }
    }
}

function editSong() {
    let index: number = null;
    while (index != 0) {
        showListSong();
        console.log("\x1b[34mNhập STT Bài hát để Sửa\x1b[0m");
        console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
        index = +input.question("Nhap lua chon: ");
        if (index > 0 && index <= songManagement.listSong.length) {
            let menu: string = `
            \x1b[33m===== Sửa thông tin Bài hát STT:${index} =====\x1b[0m
            1. Sửa Tên Bài hát
            2. Sửa Tên Ca sĩ
            3. Sửa Tên Người sáng tác
            0. Thoát
            `
            let choice: string = null;
            while (choice != "0") {
                console.log(menu);
                choice = input.question("Nhap lua chon: ");
                switch (choice) {
                    case "1":
                        let name: string = "";
                        let check: boolean;
                        do {
                            name = input.question("Nhap Ten moi cua Bai hat: ");
                            if (name == "") {
                                console.log("\x1b[31mKhông được để trống Tên Bài hát!!!\x1b[0m");
                            } else {
                                for (let i = 0; i < songManagement.listSong.length; i++) {
                                    if (name == songManagement.listSong[i].name) {
                                        console.log("\x1b[31mTên Bài hát này đã tồn tại!!!\x1b[0m");
                                        check = true;
                                        name = "";
                                        break;
                                    } else {
                                        check = false;
                                    }
                                }
                                if (!check) {
                                    for (let i = 0; i < songManagement.listSong.length; i++) {
                                        if (i == index - 1) {
                                            songManagement.listSong[i].name = name;
                                            console.log("STT:" + (i + 1) + " - " + "Tên:" + songManagement.listSong[i].name + " - " + "Ca sĩ:" + songManagement.listSong[i].singer + " - " + "Sáng tác:" + songManagement.listSong[i].composer);
                                        }
                                    }
                                }
                            }

                        } while (name == "");
                        break;
                    case "2":
                        let singer: string = input.question("Nhap Ten Ca si moi: ");
                        for (let i = 0; i < songManagement.listSong.length; i++) {
                            if (i == index - 1) {
                                songManagement.listSong[i].singer = singer;
                                console.log("STT:" + (i + 1) + " - " + "Tên:" + songManagement.listSong[i].name + " - " + "Ca sĩ:" + songManagement.listSong[i].singer + " - " + "Sáng tác:" + songManagement.listSong[i].composer);
                            }
                        }
                        break;
                    case "3":
                        let composer: string = input.question("Nhap Ten Ca si moi: ");
                        for (let i = 0; i < songManagement.listSong.length; i++) {
                            if (i == index - 1) {
                                songManagement.listSong[i].composer = composer;
                                console.log("STT:" + (i + 1) + " - " + "Tên:" + songManagement.listSong[i].name + " - " + "Ca sĩ:" + songManagement.listSong[i].singer + " - " + "Sáng tác:" + songManagement.listSong[i].composer);
                            }
                        }
                        break;
                    case "0":
                        break;
                    default:
                        console.log("\x1b[31mChọn sai rồi!!! Nhập lại đê!!!\x1b[0m");
                        break;
                }
            }
        } else if (index == 0) {
            break;
        } else {
            console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
        }
    }
}

function addAlbum() {
    let user: User = userManagement.findById(idUser);
    let name: string = "";
    let check: boolean;
    let album: Album;
    do {
        name = input.question("Nhap Ten Album: ");
        if (name == "") {
            console.log("\x1b[31mKhông được để trống Tên Album!!!\x1b[0m");
        } else {
            for (let i = 0; i < albumManagement.listAlbum.length; i++) {
                if (name == albumManagement.listAlbum[i].name) {
                    check = true
                    console.log("\x1b[31mTên này đã tồn tại!!!\x1b[0m");
                    name = "";
                    break;
                } else {
                    check = false;
                }
            }
            if (!check) {
                album = new Album(name, user);
                albumManagement.add(album);
                allAlbum.push(album);
            }
        }
    }
    while (name == "");

    let menu: string = `
    \x1b[34mBạn có muốn Thêm Bài hát vào Album này không???\x1b[0m
    1. Có
    2. Không
    `
    let choice: string = null;
    while (choice != "2") {
        console.log(menu);
        choice = input.question("Nhap lua chon: ");
        if (choice == "1") {
            let index: number = null;
            while (index != 0) {
                showListSong();
                console.log("\x1b[34mNhập STT Bài hát để Thêm vào Album\x1b[0m");
                console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
                index = +input.question("Nhap lua chon: ");
                if (index > 0 && index <= songManagement.listSong.length) {
                    let check: boolean;
                    for (let i = 0; i < album.album.length; i++) {
                        if (album.album[i].name == songManagement.listSong[index - 1].name) {
                            check = true;
                            console.log("\x1b[31mAlbum đã có Bài hát này!!!\x1b[0m");
                            break;
                        } else {
                            check = false;
                        }
                    }
                    if (!check) {
                        console.log("\x1b[34mBài hát đã được Thêm vào Album\x1b[0m");
                        album.album.push(songManagement.listSong[index - 1]);
                    }
                } else if (index == 0) {
                    break;
                } else {
                    console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                }
            }
        } else if (choice == "2") {
            break;
        } else {
            console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
        }
    }
}

function showListAlbum() {
    albumManagement.show();
}

function deleteAlbum() {
    showListAlbum();
    let index: number = null;
    while (index != 0) {
        showListAlbum();
        console.log("\x1b[31mNhập STT Album để Xóa\x1b[0m");
        console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
        index = +input.question("Nhap lua chon: ");
        if (index > 0 && index <= albumManagement.listAlbum.length) {
            let menu: string = `
            \x1b[31m===== Xóa Album STT:${index} ??? =====\x1b[0m
            1. Có
            2. Không
            `
            let choice: string = null;
            while (choice != "2") {
                console.log(menu);
                choice = input.question("Nhap lua chon: ");
                if (choice == "1") {
                    albumManagement.listAlbum.splice(index - 1, 1);
                    break;
                } else if (choice == "2") {
                    break;
                } else {
                    console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                }
            }

        } else if (index == 0) {
            break;
        } else {
            console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
        }
    }
}

function editAlbum() {
    let index: number = null;
    while (index != 0) {
        showListAlbum();
        console.log("\x1b[34mNhập STT Album để Sửa\x1b[0m");
        console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
        index = +input.question("Nhap lua chon: ");
        if (index > 0 && index <= albumManagement.listAlbum.length) {
            let name: string = "";
            let check: boolean;
            do {
                console.log(`\x1b[33m===== Sửa Tên Album STT:${index} =====\x1b[0m`);
                name = input.question("Nhap Ten moi cua Album: ");
                if (name == "") {
                    console.log("\x1b[31mKhông được để trống Tên Album!!!\x1b[0m");
                } else {
                    for (let i = 0; i < albumManagement.listAlbum.length; i++) {
                        if (name == albumManagement.listAlbum[i].name) {
                            console.log("\x1b[31mTên Album này đã tồn tại!!!\x1b[0m");
                            check = true;
                            name = "";
                            break;
                        } else {
                            check = false;
                        }
                    }
                    if (!check) {
                        for (let i = 0; i < albumManagement.listAlbum.length; i++) {
                            if (i == index - 1) {
                                albumManagement.listAlbum[i].name = name;
                                console.log("STT:" + (i + 1) + " - " + "Tên:" + albumManagement.listAlbum[i].name);
                            }
                        }
                    }
                }
            } while (name == "");
        } else if (index == 0) {
            break;
        } else {
            console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
        }
    }
}

function findAlbumByName() {
    let name: string = input.question("Nhap Ten Album can tim: ");
    let newListAlbum: Album[] = [];
    for (let i = 0; i < albumManagement.listAlbum.length; i++) {
        if (albumManagement.listAlbum[i].name.includes(name)) {
            newListAlbum.push(albumManagement.listAlbum[i]);
        }
    }
    if (newListAlbum.length == 0) {
        console.log("\x1b[34m===== Kết quả =====\x1b[0m");
        console.log("\x1b[31mKhông có Album nào có Tên như vậy!!!\x1b[0m");
    } else {
        console.log("\x1b[34m===== Kết quả =====\x1b[0m");
        for (let i = 0; i < newListAlbum.length; i++) {
            console.log("Album " + newListAlbum[i].name);
            console.log(newListAlbum[i].album);
            console.log("--------------------");
        }
    }
}

function main() {
    let menu: string = `
    \x1b[33m===== Menu =====\x1b[0m
    1. Đăng kí
    2. Đăng nhập
    0. Thoát Chương trình
    `
    let choice: string = null;
    while (choice != "0") {
        console.log(menu);
        choice = input.question("Nhap lua chon: ");
        switch (choice) {
            case "1":
                let name: string = "";
                let check: boolean;
                do {
                    name = input.question("Tao Ten Nguoi dung: ");
                    if (name == "") {
                        console.log("\x1b[31mKhông được để trống Tên Người dùng!!!\x1b[0m");
                    } else {
                        for (let i = 0; i < userManagement.listUser.length; i++) {
                            if (name == userManagement.listUser[i].name) {
                                check = true
                                console.log("\x1b[31mTên này đã tồn tại!!!\x1b[0m");
                                name = "";
                                break;
                            } else {
                                check = false;
                            }
                        }
                        if (!check) {
                            let password: string = input.question("Tao Mat khau: ");
                            let user: User = new User(name, password, true);
                            userManagement.listUser.push(user);
                        }
                    }
                }
                while (name == "");
                break;
            case "2":
                let username: string = input.question("Nhap Tai khoan: ");
                let password2: string = input.question("Nhap Mat khau: ");
                if (username == "admin" && password2 == "admin") {
                    adminMenu();
                } else {
                    let check: boolean = false;
                    let checkStatus: boolean = true;
                    for (let i = 0; i < userManagement.listUser.length; i++) {
                        if (username == userManagement.listUser[i].name && password2 == userManagement.listUser[i].password) {
                            if (userManagement.listUser[i].status) {
                                check = true;
                                idUser = userManagement.listUser[i].id;
                            } else {
                                console.log("\x1b[31mTài khoản đã bị Khóa\x1b[0m");
                                checkStatus = false;
                            }
                            break;
                        }
                    }
                    if (checkStatus) {
                        if (check) {
                            for (let i = 0; i < allAlbum.length; i++) {
                                if (allAlbum[i].user.id == idUser) {
                                    albumManagement.listAlbum.push(allAlbum[i]);
                                }
                            }
                            userMenu();
                        } else {
                            console.log("\x1b[33mNhập sai Tài khoản hoặc Mật khẩu!!!\x1b[0m");
                        }
                    }
                }
                break;
            case "0":
                break;
            default:
                console.log("\x1b[31mChọn sai rồi!!! Nhập lại đê!!!\x1b[0m");
                break;
        }
    }
}

main();