"use strict";
//examples???
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
const command_1 = require("bdsx/command");
const economy_1 = require("./economy");
event_1.events.serverOpen.on(() => {
    command_1.command.register('atm', 'Check balance.').overload((p, o) => {
        var a = o.getEntity();
        if (a === null || a === void 0 ? void 0 : a.isPlayer()) {
            economy_1.sendMessage(a, `Your balance is ${economy_1.getMoney(a)}`);
        }
    }, {});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGFBQWE7O0FBRWIsc0NBQW9DO0FBQ3BDLDBDQUF1QztBQUN2Qyx1Q0FBa0Q7QUFFbEQsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQ2xCLGlCQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsUUFBUSxFQUFFLEVBQUU7WUFDWCxxQkFBVyxDQUFDLENBQUMsRUFBRSxtQkFBbUIsa0JBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDeEQ7SUFDVCxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUM7QUFDZCxDQUFDLENBQUMsQ0FBQyJ9