"use strict";
exports.__esModule = true;
var economy_1 = require("./economy");
var json_1 = require("@bdsx/ckclib/json");
var packetids_1 = require("bdsx/bds/packetids");
var event_1 = require("bdsx/event");
event_1.events.serverClose.on(function () {
    json_1.writeJSON("../scriptData/money.json", economy_1.moneyData);
});
event_1.events.packetAfter(packetids_1.MinecraftPacketIds.Login).on(function (packet, networkIdentifier) {
    var _a;
    var ip = networkIdentifier.getAddress();
    console.log(ip);
    var xuid, name;
    var actor = networkIdentifier.getActor();
    name = (_a = networkIdentifier.getActor()) === null || _a === void 0 ? void 0 : _a.getName();
    if (packet.connreq == null)
        return;
    xuid = packet.connreq.cert.toString();
    if (name != null && actor != null) {
        economy_1.addresses.set(ip.toLowerCase(), name.toLowerCase());
        economy_1.xuids.set(name.toLowerCase(), xuid);
        economy_1.moneyData[name] = economy_1.getMoney(actor);
    }
    json_1.writeJSON("../scriptData/money.json", economy_1.moneyData);
});
event_1.events.packetAfter(packetids_1.MinecraftPacketIds.Disconnect).on(function (p, networkIdentifier) {
    var name = economy_1.addresses.get(networkIdentifier.getAddress().toLowerCase());
    if (!name) {
        return;
    }
    if (networkIdentifier.getActor() == null) {
        var user = economy_1.moneys.get(networkIdentifier.getActor());
        if (!user) {
            return;
        }
        economy_1.moneyData[name.toLowerCase()] = user.getMoney();
        economy_1.moneys["delete"](networkIdentifier.getActor());
        economy_1.addresses["delete"](name);
        if (economy_1.xuids.has(name.toLowerCase())) {
            economy_1.xuids["delete"](name.toLowerCase());
        }
    }
    json_1.writeJSON("../scriptData/money.json", economy_1.moneyData);
});
