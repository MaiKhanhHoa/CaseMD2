"use strict";
exports.__esModule = true;
var User_1 = require("../model/User");
var UserManagement_1 = require("./UserManagement");
var SongManagement_1 = require("./SongManagement");
var Song_1 = require("../model/Song");
var Album_1 = require("../model/Album");
var albumManagement_1 = require("./albumManagement");
var fs = require("fs");
var input = require('readline-sync');
var idUser = null;
var allAlbum = [];
var userManagement = new UserManagement_1.UserManagement();
var songManagement = new SongManagement_1.SongManagement();
var albumManagement = new albumManagement_1.AlbumManagement();
function adminMenu() {
    var menu = "\n    \u001B[33m===== Admin Menu =====\u001B[0m\n    1. Qu\u1EA3n l\u00FD Ng\u01B0\u1EDDi d\u00F9ng\n    2. Qu\u1EA3n l\u00FD B\u00E0i h\u00E1t\n    0. \u0110\u0103ng xu\u1EA5t\n    ";
    var choice = null;
    while (choice != "0") {
        console.log(menu);
        choice = input.question("Nhap lua chon: ");
        switch (choice) {
            case "1":
                var menu1 = "\n                \u001B[33m===== Qu\u1EA3n l\u00FD Ng\u01B0\u1EDDi d\u00F9ng =====\u001B[0m\n                1. Hi\u1EC7n th\u1ECB danh s\u00E1ch\n                2. Kh\u00F3a Ng\u01B0\u1EDDi d\u00F9ng\n                3. M\u1EDF kh\u00F3a Ng\u01B0\u1EDDi d\u00F9ng\n                0. Tho\u00E1t\n                ";
                var choice1 = null;
                while (choice1 != "0") {
                    console.log(menu1);
                    choice1 = input.question("Nhap lua chon: ");
                    switch (choice1) {
                        case "1":
                            showListUser();
                            break;
                        case "2":
                            var index = null;
                            while (index != 0) {
                                showListUser();
                                console.log("\x1b[31mNhập STT Người dùng để Khóa\x1b[0m");
                                console.log("\x1b[31mBấm 0 hoặc Enter để Thoát\x1b[0m");
                                index = +input.question("Nhap lua chon: ");
                                if (index > 0 && index <= userManagement.listUser.length) {
                                    for (var i = 0; i < userManagement.listUser.length; i++) {
                                        if (i == index - 1) {
                                            userManagement.listUser[i].status = false;
                                            console.log("\x1b[31mTài khoản đã bị khóa!!!\x1b[0m");
                                        }
                                    }
                                }
                                else if (index == 0) {
                                    break;
                                }
                                else {
                                    console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                                }
                            }
                            break;
                        case "3":
                            var index1 = null;
                            while (index1 != 0) {
                                showListUser();
                                console.log("\x1b[34mNhập STT Người dùng để Mở khóa\x1b[0m");
                                console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
                                index1 = +input.question("Nhap lua chon: ");
                                if (index1 > 0 && index1 <= userManagement.listUser.length) {
                                    for (var i = 0; i < userManagement.listUser.length; i++) {
                                        if (i == index1 - 1) {
                                            userManagement.listUser[i].status = true;
                                            console.log("\x1b[34mTài khoản đã được mở khóa!!!\x1b[0m");
                                        }
                                    }
                                }
                                else if (index1 == 0) {
                                    break;
                                }
                                else {
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
                var menu2 = "\n                \u001B[33m===== Qu\u1EA3n l\u00FD B\u00E0i h\u00E1t =====\u001B[0m\n                1. Th\u00EAm B\u00E0i h\u00E1t m\u1EDBi\n                2. Hi\u1EC7n th\u1ECB danh s\u00E1ch B\u00E0i h\u00E1t\n                3. X\u00F3a B\u00E0i h\u00E1t\n                4. S\u1EEDa th\u00F4ng tin B\u00E0i h\u00E1t\n                0. Tho\u00E1t\n                ";
                var choice2 = null;
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
    var menu = "\n    \u001B[33m===== User Menu =====\u001B[0m\n    1. T\u1EA1o Album m\u1EDBi\n    2. Hi\u1EC7n th\u1ECB danh s\u00E1ch Album\n    3. X\u00F3a Album\n    4. S\u1EEDa T\u00EAn Album\n    5. Hi\u1EC7n th\u1ECB v\u00E0 Ch\u1EC9nh s\u1EEDa m\u1ED9t Album\n    6. T\u00ECm Album b\u1EB1ng T\u00EAn\n    0. \u0110\u0103ng xu\u1EA5t\n    ";
    var choice = null;
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
    var data = userManagement.show();
    fs.writeFileSync('./data.txt', data);
    userManagement.result = "===== Danh sách Người dùng =====\n";
}
function showAndEditAlbum() {
    var index = null;
    while (index != 0) {
        showListAlbum();
        console.log("\x1b[34mNhập STT Album để Hiện thị và Chỉnh sửa\x1b[0m");
        console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
        index = +input.question("Nhap lua chon: ");
        if (index > 0 && index <= albumManagement.listAlbum.length) {
            var currentAlbum = albumManagement.listAlbum[index - 1];
            console.log("\u001B[33m===== Album ".concat(currentAlbum.name, " =====\u001B[0m"));
            if (currentAlbum.album.length == 0) {
                console.log("\x1b[31mAlbum trống\x1b[0m\n");
            }
            else {
                for (var i = 0; i < currentAlbum.album.length; i++) {
                    console.log("STT:" + (i + 1) + " - " + "Bài hát:" + currentAlbum.album[i].name + " - " + "Ca sĩ:" + currentAlbum.album[i].singer);
                }
            }
            var menu = "\n                \u001B[34m===== Ch\u1EC9nh s\u1EEDa Album ".concat(currentAlbum.name, " kh\u00F4ng??? =====\u001B[0m\n                1. C\u00F3\n                2. Kh\u00F4ng\n                ");
            var choice = null;
            while (choice != "2") {
                console.log(menu);
                choice = input.question("Nhap lua chon: ");
                if (choice == "1") {
                    var menu1 = "\n                    \u001B[33m===== Ch\u1EC9nh s\u1EEDa Album ".concat(currentAlbum.name, " =====\u001B[0m\n                    1. T\u00ECm B\u00E0i h\u00E1t trong Album\n                    2. X\u00F3a B\u00E0i h\u00E1t kh\u1ECFi Album\n                    3. S\u1EEDa T\u00EAn B\u00E0i h\u00E1t trong Album\n                    4. Th\u00EAm B\u00E0i h\u00E1t v\u00E0o Album\n                    5. Hi\u1EC7n th\u1ECB Danh s\u00E1ch B\u00E0i h\u00E1t\n                    0. Tho\u00E1t\n                    ");
                    var choice1 = null;
                    while (choice1 != "0") {
                        console.log(menu1);
                        choice1 = input.question("Nhap lua chon: ");
                        switch (choice1) {
                            case "1":
                                var name_1 = input.question("Nhap Ten Bai hat can tim: ");
                                var newListSong = [];
                                for (var i = 0; i < currentAlbum.album.length; i++) {
                                    if (currentAlbum.album[i].name.includes(name_1)) {
                                        newListSong.push(currentAlbum.album[i]);
                                    }
                                }
                                if (newListSong.length == 0) {
                                    console.log("\x1b[34m===== Kết quả =====\x1b[0m");
                                    console.log("\x1b[31mKhông có Tên Bài hát nào như vậy!!!\x1b[0m");
                                }
                                else {
                                    console.log("\x1b[34m===== Kết quả =====\x1b[0m");
                                    for (var i = 0; i < newListSong.length; i++) {
                                        console.log("Tên Bài hát:" + newListSong[i].name + " - " + "Ca sĩ:" + newListSong[i].singer + " - " + "Nhạc sĩ:" + newListSong[i].composer);
                                    }
                                }
                                break;
                            case "2":
                                console.log("\u001B[33m===== Album ".concat(currentAlbum.name, " =====\u001B[0m"));
                                var index_1 = null;
                                while (index_1 != 0) {
                                    for (var i = 0; i < currentAlbum.album.length; i++) {
                                        console.log("STT:" + (i + 1) + " - " + "Bài hát:" + currentAlbum.album[i].name + " - " + "Ca sĩ:" + currentAlbum.album[i].singer);
                                    }
                                    console.log("\x1b[31mNhập STT Bài hát để Xóa\x1b[0m");
                                    console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
                                    index_1 = +input.question("Nhap lua chon: ");
                                    if (index_1 > 0 && index_1 <= currentAlbum.album.length) {
                                        var menu_1 = "\n                                        \u001B[31m===== X\u00F3a B\u00E0i h\u00E1t STT:".concat(index_1, " ??? =====\u001B[0m\n                                        1. C\u00F3\n                                        2. Kh\u00F4ng\n                                        ");
                                        console.log(menu_1);
                                        var choice_1 = input.question("Nhap lua chon: ");
                                        if (choice_1 == "1") {
                                            currentAlbum.album.splice(index_1 - 1, 1);
                                        }
                                        else if (choice_1 == "2") {
                                        }
                                        else {
                                            console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                                        }
                                    }
                                    else if (index_1 == 0) {
                                        break;
                                    }
                                    else {
                                        console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                                    }
                                }
                                break;
                            case "3":
                                console.log("\u001B[33m===== Album ".concat(currentAlbum.name, " =====\u001B[0m"));
                                var index2 = null;
                                while (index2 != 0) {
                                    for (var i = 0; i < currentAlbum.album.length; i++) {
                                        console.log("STT:" + (i + 1) + " - " + "Bài hát:" + currentAlbum.album[i].name + " - " + "Ca sĩ:" + currentAlbum.album[i].singer);
                                    }
                                    console.log("\x1b[34mNhập STT Bài hát để Sửa Tên\x1b[0m");
                                    console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
                                    index2 = +input.question("Nhap lua chon: ");
                                    if (index2 > 0 && index2 <= currentAlbum.album.length) {
                                        var name_2 = "";
                                        var check = void 0;
                                        do {
                                            name_2 = input.question("Nhap Ten moi cua Bai hat: ");
                                            if (name_2 == "") {
                                                console.log("\x1b[31mKhông được để trống Tên Bài hat!!!\x1b[0m");
                                            }
                                            else {
                                                for (var i = 0; i < currentAlbum.album.length; i++) {
                                                    if (name_2 == currentAlbum.album[i].name) {
                                                        console.log("\x1b[31mTên Bài hát này đã tồn tại!!!\x1b[0m");
                                                        check = true;
                                                        name_2 = "";
                                                        break;
                                                    }
                                                    else {
                                                        check = false;
                                                    }
                                                }
                                                if (!check) {
                                                    for (var i = 0; i < currentAlbum.album.length; i++) {
                                                        if (i == index2 - 1) {
                                                            currentAlbum.album[i].name = name_2;
                                                            console.log("STT:" + (i + 1) + " - " + "Tên:" + currentAlbum.album[i].name);
                                                        }
                                                    }
                                                }
                                            }
                                        } while (name_2 == "");
                                    }
                                    else if (index2 == 0) {
                                        break;
                                    }
                                    else {
                                        console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                                    }
                                }
                                break;
                            case "4":
                                var index3 = null;
                                while (index3 != 0) {
                                    showListSong();
                                    console.log("\x1b[34mNhập STT Bài hát để Thêm vào Album\x1b[0m");
                                    console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
                                    index3 = +input.question("Nhap lua chon: ");
                                    if (index3 > 0 && index3 <= songManagement.listSong.length) {
                                        var check = void 0;
                                        for (var i = 0; i < currentAlbum.album.length; i++) {
                                            if (currentAlbum.album[i].name == songManagement.listSong[index3 - 1].name) {
                                                check = true;
                                                console.log("\x1b[31mAlbum đã có Bài hát này!!!\x1b[0m");
                                                break;
                                            }
                                            else {
                                                check = false;
                                            }
                                        }
                                        if (!check) {
                                            console.log("\x1b[34mBài hát đã được Thêm vào Album\x1b[0m");
                                            currentAlbum.album.push(songManagement.listSong[index3 - 1]);
                                        }
                                    }
                                    else if (index3 == 0) {
                                        break;
                                    }
                                    else {
                                        console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                                    }
                                }
                                break;
                            case "5":
                                console.log("\u001B[33m===== Album ".concat(currentAlbum.name, " =====\u001B[0m"));
                                for (var i = 0; i < currentAlbum.album.length; i++) {
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
                }
                else if (choice == "2") {
                    break;
                }
                else {
                    console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                }
            }
        }
        else if (index == 0) {
            break;
        }
        else {
            console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
        }
    }
}
function addSong() {
    var name = "";
    var check;
    do {
        name = input.question("Nhap Ten Bai hat: ");
        if (name == "") {
            console.log("\x1b[31mKhông được để trống Tên Bài hát!!!\x1b[0m");
        }
        else {
            for (var i = 0; i < songManagement.listSong.length; i++) {
                if (name == songManagement.listSong[i].name) {
                    check = true;
                    console.log("\x1b[31mTên này đã tồn tại!!!\x1b[0m");
                    name = "";
                    break;
                }
                else {
                    check = false;
                }
            }
            if (!check) {
                var singer = input.question("Nhap Ten Ca si: ");
                var composer = input.question("Nhap Ten Nguoi sang tac: ");
                var song = new Song_1.Song(name, singer, composer);
                songManagement.add(song);
            }
        }
    } while (name == "");
}
function showListSong() {
    var data = songManagement.show();
    fs.writeFileSync('./data.txt', data);
    songManagement.result = "===== Danh sách Bài hát =====\n";
}
function deleteSong() {
    var index = null;
    while (index != 0) {
        showListSong();
        console.log("\x1b[31mNhập STT Bài hát để Xóa\x1b[0m");
        console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
        index = +input.question("Nhap lua chon: ");
        if (index > 0 && index <= songManagement.listSong.length) {
            var menu = "\n            \u001B[31m===== X\u00F3a B\u00E0i h\u00E1t STT:".concat(index, " ??? =====\u001B[0m\n            1. C\u00F3\n            2. Kh\u00F4ng\n            ");
            var choice = null;
            while (choice != "2") {
                console.log(menu);
                choice = input.question("Nhap lua chon: ");
                if (choice == "1") {
                    songManagement.listSong.splice(index - 1, 1);
                    break;
                }
                else if (choice == "2") {
                    break;
                }
                else {
                    console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                }
            }
        }
        else if (index == 0) {
            break;
        }
        else {
            console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
        }
    }
}
function editSong() {
    var index = null;
    while (index != 0) {
        showListSong();
        console.log("\x1b[34mNhập STT Bài hát để Sửa\x1b[0m");
        console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
        index = +input.question("Nhap lua chon: ");
        if (index > 0 && index <= songManagement.listSong.length) {
            var menu = "\n            \u001B[33m===== S\u1EEDa th\u00F4ng tin B\u00E0i h\u00E1t STT:".concat(index, " =====\u001B[0m\n            1. S\u1EEDa T\u00EAn B\u00E0i h\u00E1t\n            2. S\u1EEDa T\u00EAn Ca s\u0129\n            3. S\u1EEDa T\u00EAn Ng\u01B0\u1EDDi s\u00E1ng t\u00E1c\n            0. Tho\u00E1t\n            ");
            var choice = null;
            while (choice != "0") {
                console.log(menu);
                choice = input.question("Nhap lua chon: ");
                switch (choice) {
                    case "1":
                        var name_3 = "";
                        var check = void 0;
                        do {
                            name_3 = input.question("Nhap Ten moi cua Bai hat: ");
                            if (name_3 == "") {
                                console.log("\x1b[31mKhông được để trống Tên Bài hát!!!\x1b[0m");
                            }
                            else {
                                for (var i = 0; i < songManagement.listSong.length; i++) {
                                    if (name_3 == songManagement.listSong[i].name) {
                                        console.log("\x1b[31mTên Bài hát này đã tồn tại!!!\x1b[0m");
                                        check = true;
                                        name_3 = "";
                                        break;
                                    }
                                    else {
                                        check = false;
                                    }
                                }
                                if (!check) {
                                    for (var i = 0; i < songManagement.listSong.length; i++) {
                                        if (i == index - 1) {
                                            songManagement.listSong[i].name = name_3;
                                            console.log("STT:" + (i + 1) + " - " + "Tên:" + songManagement.listSong[i].name + " - " + "Ca sĩ:" + songManagement.listSong[i].singer + " - " + "Sáng tác:" + songManagement.listSong[i].composer);
                                        }
                                    }
                                }
                            }
                        } while (name_3 == "");
                        break;
                    case "2":
                        var singer = input.question("Nhap Ten Ca si moi: ");
                        for (var i = 0; i < songManagement.listSong.length; i++) {
                            if (i == index - 1) {
                                songManagement.listSong[i].singer = singer;
                                console.log("STT:" + (i + 1) + " - " + "Tên:" + songManagement.listSong[i].name + " - " + "Ca sĩ:" + songManagement.listSong[i].singer + " - " + "Sáng tác:" + songManagement.listSong[i].composer);
                            }
                        }
                        break;
                    case "3":
                        var composer = input.question("Nhap Ten Ca si moi: ");
                        for (var i = 0; i < songManagement.listSong.length; i++) {
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
        }
        else if (index == 0) {
            break;
        }
        else {
            console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
        }
    }
}
function addAlbum() {
    var user = userManagement.findById(idUser);
    var name = "";
    var check;
    var album;
    do {
        name = input.question("Nhap Ten Album: ");
        if (name == "") {
            console.log("\x1b[31mKhông được để trống Tên Album!!!\x1b[0m");
        }
        else {
            for (var i = 0; i < albumManagement.listAlbum.length; i++) {
                if (name == albumManagement.listAlbum[i].name) {
                    check = true;
                    console.log("\x1b[31mTên này đã tồn tại!!!\x1b[0m");
                    name = "";
                    break;
                }
                else {
                    check = false;
                }
            }
            if (!check) {
                album = new Album_1.Album(name, user);
                albumManagement.add(album);
                allAlbum.push(album);
            }
        }
    } while (name == "");
    var menu = "\n    \u001B[34mB\u1EA1n c\u00F3 mu\u1ED1n Th\u00EAm B\u00E0i h\u00E1t v\u00E0o Album n\u00E0y kh\u00F4ng???\u001B[0m\n    1. C\u00F3\n    2. Kh\u00F4ng\n    ";
    var choice = null;
    while (choice != "2") {
        console.log(menu);
        choice = input.question("Nhap lua chon: ");
        if (choice == "1") {
            var index = null;
            while (index != 0) {
                showListSong();
                console.log("\x1b[34mNhập STT Bài hát để Thêm vào Album\x1b[0m");
                console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
                index = +input.question("Nhap lua chon: ");
                if (index > 0 && index <= songManagement.listSong.length) {
                    var check_1 = void 0;
                    for (var i = 0; i < album.album.length; i++) {
                        if (album.album[i].name == songManagement.listSong[index - 1].name) {
                            check_1 = true;
                            console.log("\x1b[31mAlbum đã có Bài hát này!!!\x1b[0m");
                            break;
                        }
                        else {
                            check_1 = false;
                        }
                    }
                    if (!check_1) {
                        console.log("\x1b[34mBài hát đã được Thêm vào Album\x1b[0m");
                        album.album.push(songManagement.listSong[index - 1]);
                    }
                }
                else if (index == 0) {
                    break;
                }
                else {
                    console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                }
            }
        }
        else if (choice == "2") {
            break;
        }
        else {
            console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
        }
    }
}
function showListAlbum() {
    albumManagement.show();
}
function deleteAlbum() {
    showListAlbum();
    var index = null;
    while (index != 0) {
        showListAlbum();
        console.log("\x1b[31mNhập STT Album để Xóa\x1b[0m");
        console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
        index = +input.question("Nhap lua chon: ");
        if (index > 0 && index <= albumManagement.listAlbum.length) {
            var menu = "\n            \u001B[31m===== X\u00F3a Album STT:".concat(index, " ??? =====\u001B[0m\n            1. C\u00F3\n            2. Kh\u00F4ng\n            ");
            var choice = null;
            while (choice != "2") {
                console.log(menu);
                choice = input.question("Nhap lua chon: ");
                if (choice == "1") {
                    albumManagement.listAlbum.splice(index - 1, 1);
                    break;
                }
                else if (choice == "2") {
                    break;
                }
                else {
                    console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
                }
            }
        }
        else if (index == 0) {
            break;
        }
        else {
            console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
        }
    }
}
function editAlbum() {
    var index = null;
    while (index != 0) {
        showListAlbum();
        console.log("\x1b[34mNhập STT Album để Sửa\x1b[0m");
        console.log("\x1b[31mBấm 0 hoặc Enter Thoát\x1b[0m");
        index = +input.question("Nhap lua chon: ");
        if (index > 0 && index <= albumManagement.listAlbum.length) {
            var name_4 = "";
            var check = void 0;
            do {
                console.log("\u001B[33m===== S\u1EEDa T\u00EAn Album STT:".concat(index, " =====\u001B[0m"));
                name_4 = input.question("Nhap Ten moi cua Album: ");
                if (name_4 == "") {
                    console.log("\x1b[31mKhông được để trống Tên Album!!!\x1b[0m");
                }
                else {
                    for (var i = 0; i < albumManagement.listAlbum.length; i++) {
                        if (name_4 == albumManagement.listAlbum[i].name) {
                            console.log("\x1b[31mTên Album này đã tồn tại!!!\x1b[0m");
                            check = true;
                            name_4 = "";
                            break;
                        }
                        else {
                            check = false;
                        }
                    }
                    if (!check) {
                        for (var i = 0; i < albumManagement.listAlbum.length; i++) {
                            if (i == index - 1) {
                                albumManagement.listAlbum[i].name = name_4;
                                console.log("STT:" + (i + 1) + " - " + "Tên:" + albumManagement.listAlbum[i].name);
                            }
                        }
                    }
                }
            } while (name_4 == "");
        }
        else if (index == 0) {
            break;
        }
        else {
            console.log("\x1b[31mNhập sai rồi!!! Nhập lại đê!!!\x1b[0m");
        }
    }
}
function findAlbumByName() {
    var name = input.question("Nhap Ten Album can tim: ");
    var newListAlbum = [];
    for (var i = 0; i < albumManagement.listAlbum.length; i++) {
        if (albumManagement.listAlbum[i].name.includes(name)) {
            newListAlbum.push(albumManagement.listAlbum[i]);
        }
    }
    if (newListAlbum.length == 0) {
        console.log("\x1b[34m===== Kết quả =====\x1b[0m");
        console.log("\x1b[31mKhông có Album nào có Tên như vậy!!!\x1b[0m");
    }
    else {
        console.log("\x1b[34m===== Kết quả =====\x1b[0m");
        for (var i = 0; i < newListAlbum.length; i++) {
            console.log("Album " + newListAlbum[i].name);
            console.log(newListAlbum[i].album);
            console.log("--------------------");
        }
    }
}
function main() {
    var menu = "\n    \u001B[33m===== Menu =====\u001B[0m\n    1. \u0110\u0103ng k\u00ED\n    2. \u0110\u0103ng nh\u1EADp\n    0. Tho\u00E1t Ch\u01B0\u01A1ng tr\u00ECnh\n    ";
    var choice = null;
    while (choice != "0") {
        console.log(menu);
        choice = input.question("Nhap lua chon: ");
        switch (choice) {
            case "1":
                var name_5 = "";
                var check = void 0;
                do {
                    name_5 = input.question("Tao Ten Nguoi dung: ");
                    if (name_5 == "") {
                        console.log("\x1b[31mKhông được để trống Tên Người dùng!!!\x1b[0m");
                    }
                    else {
                        for (var i = 0; i < userManagement.listUser.length; i++) {
                            if (name_5 == userManagement.listUser[i].name) {
                                check = true;
                                console.log("\x1b[31mTên này đã tồn tại!!!\x1b[0m");
                                name_5 = "";
                                break;
                            }
                            else {
                                check = false;
                            }
                        }
                        if (!check) {
                            var password = input.question("Tao Mat khau: ");
                            var user = new User_1.User(name_5, password, true);
                            userManagement.listUser.push(user);
                        }
                    }
                } while (name_5 == "");
                break;
            case "2":
                var username = input.question("Nhap Tai khoan: ");
                var password2 = input.question("Nhap Mat khau: ");
                if (username == "admin" && password2 == "admin") {
                    adminMenu();
                }
                else {
                    var check_2 = false;
                    var checkStatus = true;
                    for (var i = 0; i < userManagement.listUser.length; i++) {
                        if (username == userManagement.listUser[i].name && password2 == userManagement.listUser[i].password) {
                            if (userManagement.listUser[i].status) {
                                check_2 = true;
                                idUser = userManagement.listUser[i].id;
                            }
                            else {
                                console.log("\x1b[31mTài khoản đã bị Khóa\x1b[0m");
                                checkStatus = false;
                            }
                            break;
                        }
                    }
                    if (checkStatus) {
                        if (check_2) {
                            for (var i = 0; i < allAlbum.length; i++) {
                                if (allAlbum[i].user.id == idUser) {
                                    albumManagement.listAlbum.push(allAlbum[i]);
                                }
                            }
                            userMenu();
                        }
                        else {
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
