"use strict";
exports.__esModule = true;
exports.RET_NO_ACCOUNT = exports.RET_NOT_ENOUGH_MONEY = exports.RET_INVALID = exports.RET_SUCCESS = exports.MAXIMUM_MONEY = exports.User = exports.getUser = exports.setMoney = exports.reduceMoney = exports.addMoney = exports.getMoney = exports.sendMessage = exports.xuids = exports.addresses = exports.moneys = exports.moneyData = void 0;
var packets_1 = require("bdsx/bds/packets");
var json_1 = require("@bdsx/ckclib/json");
exports.moneyData = json_1.parseJSON("../scriptData/money.json");
exports.moneys = new Map();
exports.addresses = new Map();
exports.xuids = new Map();
function sendMessage(actor, message, type) {
    if (type === void 0) { type = 1; }
    var packet = packets_1.TextPacket.create();
    packet.message = message;
    packet.type = type;
    packet.sendTo(actor.getNetworkIdentifier());
    packet.dispose();
}
exports.sendMessage = sendMessage;
function hasAccount(player) {
    var user = exports.moneys.get(player);
    if (!user) {
        if (!exports.moneyData[player.getName().toLowerCase()]) {
            return false;
        }
    }
    return true;
}
function getMoney(player) {
    var user = exports.moneys.get(player);
    if (!user) {
        if (!exports.moneyData[player.getName().toLowerCase()]) {
            return exports.RET_NO_ACCOUNT;
        }
        return exports.moneyData[player.getName().toLowerCase()];
    }
    return user.getMoney();
}
exports.getMoney = getMoney;
function addMoney(player, money) {
    var user = exports.moneys.get(player);
    if (!user) {
        if (!exports.moneyData[player.getName().toLowerCase()]) {
            return exports.RET_NO_ACCOUNT;
        }
        if (money >= exports.MAXIMUM_MONEY) {
            return exports.RET_INVALID;
        }
        if (money <= 0) {
            return exports.RET_INVALID;
        }
        if (money + exports.moneyData[player.getName().toLowerCase()] >= exports.MAXIMUM_MONEY) {
            return exports.RET_INVALID;
        }
        exports.moneyData[player.getName().toLowerCase()] += money;
        return exports.RET_SUCCESS;
    }
    return user.addMoney(money);
}
exports.addMoney = addMoney;
function reduceMoney(player, money) {
    var user = exports.moneys.get(player);
    if (!user) {
        if (!exports.moneyData[player.getName().toLowerCase()]) {
            return exports.RET_NO_ACCOUNT;
        }
        if (money >= exports.MAXIMUM_MONEY) {
            return exports.RET_INVALID;
        }
        if (money <= 0) {
            return exports.RET_INVALID;
        }
        if (exports.moneyData[player.getName().toLowerCase()] - money < 0) {
            return exports.RET_NOT_ENOUGH_MONEY;
        }
        exports.moneyData[player.getName().toLowerCase()] -= money;
        return exports.RET_SUCCESS;
    }
    return user.reduceMoney(money);
}
exports.reduceMoney = reduceMoney;
function setMoney(player, money) {
    var user = exports.moneys.get(player);
    if (!user) {
        if (!exports.moneyData[player.getName().toLowerCase()]) {
            return exports.RET_NO_ACCOUNT;
        }
        if (money >= exports.MAXIMUM_MONEY) {
            return exports.RET_INVALID;
        }
        if (money < 0) {
            return exports.RET_INVALID;
        }
        exports.moneyData[player.getName()] = money;
        return exports.RET_SUCCESS;
    }
    return user.setMoney(money);
}
exports.setMoney = setMoney;
function getUser(player) {
    var user = exports.moneys.get(player);
    if (!user) {
        return null;
    }
    return user;
}
exports.getUser = getUser;
var User = /** @class */ (function () {
    function User(player, money) {
        this.player = player;
        this.money = money;
    }
    User.prototype.getMoney = function () {
        return this.money;
    };
    User.prototype.getPlayer = function () {
        return this.player;
    };
    User.prototype.addMoney = function (money) {
        if (money >= exports.MAXIMUM_MONEY) {
            return exports.RET_INVALID;
        }
        if (money <= 0) {
            return exports.RET_INVALID;
        }
        if (money + this.money >= exports.MAXIMUM_MONEY) {
            return exports.RET_INVALID;
        }
        this.money += money;
        return exports.RET_SUCCESS;
    };
    User.prototype.reduceMoney = function (money) {
        if (money >= exports.MAXIMUM_MONEY) {
            return exports.RET_INVALID;
        }
        if (money <= 0) {
            return exports.RET_INVALID;
        }
        if (this.getMoney() - money < 0) {
            return exports.RET_NOT_ENOUGH_MONEY;
        }
        this.money -= money;
        return exports.RET_SUCCESS;
    };
    User.prototype.setMoney = function (money) {
        if (money >= exports.MAXIMUM_MONEY) {
            return exports.RET_INVALID;
        }
        if (money < 0) {
            return exports.RET_INVALID;
        }
        this.money = money;
        return exports.RET_SUCCESS;
    };
    return User;
}());
exports.User = User;
exports.MAXIMUM_MONEY = 2147483647;
exports.RET_SUCCESS = -1;
exports.RET_INVALID = 0;
exports.RET_NOT_ENOUGH_MONEY = 0;
exports.RET_NO_ACCOUNT = 0;
