import { int32_t } from "bdsx/nativetype";
import { ActorWildcardCommandSelector, CommandPermissionLevel } from "bdsx/bds/command";

import { events } from "bdsx/event";
import { command } from "bdsx/command";
import { addMoney, getMoney, reduceMoney, sendMessage, setMoney } from "./economy";

events.serverOpen.on(() => {
        command.register('atm', 'Check balance.').overload((p, o) => {
                var p2 = o.getEntity()
                for (var actor of p.plr.newResults(o)) {
                        if (p2?.isPlayer()) {
                                if (actor?.isPlayer())
                                if (actor.getName() == p2.getName()) sendMessage(p2, `Your balance is ${getMoney(p2)}`);
                                else sendMessage(p2, `${actor.getName()}'s balance is ${getMoney(actor)}`);

                        }
                }
        },{
                plr: ActorWildcardCommandSelector
        });

        // I added these because people are requesting it.
        command.register('atmadd', 'Add balance.', CommandPermissionLevel.Operator).overload((p, o) => {
                var a = o.getEntity();
                if (a?.isPlayer()) {
                        for (var actor of p.plr.newResults(o)) {
                                if (actor?.isPlayer()) {
                                        addMoney(actor, p.amount);
                                        sendMessage(a, `Sucessfully added ${p.amount} to ${actor.getName()}'s balance.'`);
                                        sendMessage(actor, `You have been added ${p.amount} to your balance.'`);
                                }
                        }
                }
        },{
                plr: ActorWildcardCommandSelector,
                amount: int32_t
        });

        command.register('atmset', 'Set balance.', CommandPermissionLevel.Operator).overload((p, o) => {
                var a = o.getEntity();
                if (a?.isPlayer()) {
                        for (var actor of p.plr.newResults(o)) {
                                if (actor?.isPlayer()) {
                                        setMoney(actor, p.amount);
                                        sendMessage(a, `Sucessfully set ${p.amount} to ${actor.getName()}'s balance.'`);
                                        sendMessage(actor, `You have been set ${p.amount} to your balance.'`);
                                }
                        }
                }
        },{
                plr: ActorWildcardCommandSelector,
                amount: int32_t
        });

        command.register('atmrm', 'Remove balance.', CommandPermissionLevel.Operator).overload((p, o) => {
                var a = o.getEntity();
                if (a?.isPlayer()) {
                        for (var actor of p.plr.newResults(o)) {
                                if (actor?.isPlayer()) {
                                        reduceMoney(actor, p.amount);
                                        sendMessage(a, `Sucessfully removed ${p.amount} to ${actor.getName()}'s balance.'`);
                                        sendMessage(actor, `You have been removed ${p.amount} in your balance.'`);
                                }
                        }
                }
        },{
                plr: ActorWildcardCommandSelector,
                amount: int32_t
        });

        command.register('atmreset', 'Resey balance.', CommandPermissionLevel.Operator).overload((p, o) => {
                var a = o.getEntity();
                if (a?.isPlayer()) {
                        for (var actor of p.plr.newResults(o)) {
                                if (actor?.isPlayer()) {
                                        reduceMoney(actor, 0);
                                        sendMessage(a, `Sucessfully resetted ${actor.getName()}'s balance.'`);
                                        sendMessage(actor, `You have been reset balance.'`);
                                }
                        }
                }
        },{
                plr: ActorWildcardCommandSelector
        });
});