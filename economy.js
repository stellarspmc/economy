"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RET_NO_ACCOUNT = exports.RET_NOT_ENOUGH_MONEY = exports.RET_INVALID = exports.RET_SUCCESS = exports.MAXIMUM_MONEY = exports.User = exports.getUser = exports.setMoney = exports.reduceMoney = exports.addMoney = exports.getMoney = exports.sendMessage = exports.xuids = exports.addresses = exports.moneys = exports.moneyData = void 0;
const packets_1 = require("bdsx/bds/packets");
const utils_1 = require("./utils");
exports.moneyData = utils_1.parseJSON("../scriptData/money.json");
exports.moneys = new Map();
exports.addresses = new Map();
exports.xuids = new Map();
function sendMessage(actor, message, type = 1) {
    const packet = packets_1.TextPacket.create();
    packet.message = message;
    packet.type = type;
    packet.sendTo(actor.getNetworkIdentifier());
    packet.dispose();
}
exports.sendMessage = sendMessage;
function hasAccount(player) {
    const user = exports.moneys.get(player);
    if (!user) {
        if (!exports.moneyData[player.getName().toLowerCase()]) {
            return false;
        }
    }
    return true;
}
function getMoney(player) {
    const user = exports.moneys.get(player);
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
    const user = exports.moneys.get(player);
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
    const user = exports.moneys.get(player);
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
    const user = exports.moneys.get(player);
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
    const user = exports.moneys.get(player);
    if (!user) {
        return null;
    }
    return user;
}
exports.getUser = getUser;
class User {
    constructor(player, money) {
        this.player = player;
        this.money = money;
    }
    getMoney() {
        return this.money;
    }
    getPlayer() {
        return this.player;
    }
    addMoney(money) {
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
    }
    reduceMoney(money) {
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
    }
    setMoney(money) {
        if (money >= exports.MAXIMUM_MONEY) {
            return exports.RET_INVALID;
        }
        if (money < 0) {
            return exports.RET_INVALID;
        }
        this.money = money;
        return exports.RET_SUCCESS;
    }
}
exports.User = User;
exports.MAXIMUM_MONEY = 2147483647;
exports.RET_SUCCESS = -1;
exports.RET_INVALID = -2;
exports.RET_NOT_ENOUGH_MONEY = -3;
exports.RET_NO_ACCOUNT = -4;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNvbm9teS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVjb25vbXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsOENBQTRDO0FBRTVDLG1DQUErQztBQUVwQyxRQUFBLFNBQVMsR0FBRyxpQkFBUyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFFaEQsUUFBQSxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQWdCLENBQUM7QUFFakMsUUFBQSxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7QUFFdEMsUUFBQSxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7QUFFL0MsU0FBZ0IsV0FBVyxDQUFDLEtBQWEsRUFBRSxPQUFlLEVBQUUsT0FBZSxDQUFDO0lBQzNFLE1BQU0sTUFBTSxHQUFHLG9CQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNsQixDQUFDO0FBTkQsa0NBTUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxNQUFjO0lBQ2pDLE1BQU0sSUFBSSxHQUFHLGNBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsSUFBRyxDQUFDLElBQUksRUFBQztRQUNSLElBQUcsQ0FBQyxpQkFBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFDO1lBQzdDLE9BQU8sS0FBSyxDQUFDO1NBQ2I7S0FDRDtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQztBQUVELFNBQWdCLFFBQVEsQ0FBQyxNQUFjO0lBQ3RDLE1BQU0sSUFBSSxHQUFHLGNBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENB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