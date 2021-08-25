//examples???

import { events } from "bdsx/event";
import { command } from "bdsx/command";
import { getMoney, sendMessage } from "./economy";

events.serverOpen.on(() => {
        command.register('atm', 'Check balance.').overload((p, o) => {
                var a = o.getEntity();
                if (a?.isPlayer()) {
                        sendMessage(a, `Your balance is ${getMoney(a)}`);
                }
        },{});
});