"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const economy_1 = require("./economy");
const utils_1 = require("./utils");
const packetids_1 = require("bdsx/bds/packetids");
const event_1 = require("bdsx/event");
event_1.events.serverClose.on(() => {
    utils_1.writeJSON("../scriptData/money.json", economy_1.moneyData);
});
event_1.events.packetAfter(packetids_1.MinecraftPacketIds.Login).on((packet, networkIdentifier) => {
    var _a;
    const ip = networkIdentifier.getAddress();
    console.log(ip);
    let xuid, name;
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
    utils_1.writeJSON("../scriptData/money.json", economy_1.moneyData);
});
event_1.events.packetAfter(packetids_1.MinecraftPacketIds.Disconnect).on((p, networkIdentifier) => {
    const name = economy_1.addresses.get(networkIdentifier.getAddress().toLowerCase());
    if (!name) {
        return;
    }
    if (networkIdentifier.getActor() == null) {
        const user = economy_1.moneys.get(networkIdentifier.getActor());
        if (!user) {
            return;
        }
        economy_1.moneyData[name.toLowerCase()] = user.getMoney();
        economy_1.moneys.delete(networkIdentifier.getActor());
        economy_1.addresses.delete(name);
        if (economy_1.xuids.has(name.toLowerCase())) {
            economy_1.xuids.delete(name.toLowerCase());
        }
    }
    utils_1.writeJSON("../scriptData/money.json", economy_1.moneyData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUEwRTtBQUMxRSxtQ0FBb0M7QUFDcEMsa0RBQXdEO0FBRXhELHNDQUFvQztBQUVwQyxjQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDMUIsaUJBQVMsQ0FBQywwQkFBMEIsRUFBRSxtQkFBUyxDQUFDLENBQUM7QUFDbEQsQ0FBQyxDQUFDLENBQUM7QUFFSCxjQUFNLENBQUMsV0FBVyxDQUFDLDhCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxFQUFFOztJQUM3RSxNQUFNLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hCLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQztJQUVmLElBQUksS0FBSyxHQUFHLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRXpDLElBQUksR0FBRyxNQUFBLGlCQUFpQixDQUFDLFFBQVEsRUFBRSwwQ0FBRSxPQUFPLEVBQUUsQ0FBQztJQUUvQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSTtRQUFFLE9BQU87SUFFbkMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRXRDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1FBQ25DLG1CQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNwRCxlQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxtQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDakM7SUFDRCxpQkFBUyxDQUFDLDBCQUEwQixFQUFFLG1CQUFTLENBQUMsQ0FBQztBQUNsRCxDQUFDLENBQUMsQ0FBQztBQUVILGNBQU0sQ0FBQyxXQUFXLENBQUMsOEJBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLEVBQUU7SUFDN0UsTUFBTSxJQUFJLEdBQUcsbUJBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN6RSxJQUFHLENBQUMsSUFBSSxFQUFDO1FBQ1IsT0FBTztLQUNQO0lBQ0QsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUU7UUFDekMsTUFBTSxJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFZLENBQUMsQ0FBQztRQUNqRSxJQUFHLENBQUMsSUFBSSxFQUFDO1lBQ1IsT0FBTztTQUNQO1FBQ0QsbUJBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEQsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFZLENBQUMsQ0FBQztRQUN0RCxtQkFBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2QixJQUFHLGVBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUM7WUFDaEMsZUFBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUNqQztLQUFDO0lBQ0YsaUJBQVMsQ0FBQywwQkFBMEIsRUFBRSxtQkFBUyxDQUFDLENBQUM7QUFDbEQsQ0FBQyxDQUFDLENBQUMifQ==