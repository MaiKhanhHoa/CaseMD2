"use strict";
exports.__esModule = true;
exports.UserManagement = void 0;
var UserManagement = /** @class */ (function () {
    function UserManagement() {
        this.listUser = [];
        this.result = "===== Danh sách Người dùng =====\n";
    }
    UserManagement.prototype.show = function () {
        if (this.listUser.length == 0) {
            console.log("\x1b[33m===== DaNh sách Người dùng =====\x1b[0m");
            console.log("\x1b[31mKhông có Người dùng nào cả!!!\x1b[0m");
        }
        else {
            console.log("\x1b[33m===== DaNh sách Người dùng =====\x1b[0m");
            for (var i = 0; i < this.listUser.length; i++) {
                if (this.listUser[i].status) {
                    console.log("STT:" + (i + 1) + " - " + "Tên:" + this.listUser[i].name + " - Trạng thái: Không bị khóa");
                    this.result += "STT:" + (i + 1) + " - " + "Tên:" + this.listUser[i].name + " - Trạng thái: Không bị khóa" + "\n";
                }
                else {
                    console.log("STT:" + (i + 1) + " - " + "Tên:" + this.listUser[i].name + " - Trạng thái: Đã bị khóa");
                    this.result += "STT:" + (i + 1) + " - " + "Tên:" + this.listUser[i].name + " - Trạng thái: Đã bị khóa" + "\n";
                }
            }
        }
        return this.result;
    };
    UserManagement.prototype.findById = function (id) {
        for (var i = 0; i < this.listUser.length; i++) {
            if (id == this.listUser[i].id) {
                return this.listUser[i];
            }
        }
    };
    return UserManagement;
}());
exports.UserManagement = UserManagement;
