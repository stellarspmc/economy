import { moneyData, getMoney, moneys, addresses, xuids } from "./economy";
import { writeJSON } from "@bdsx/ckclib";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { Player } from "bdsx/bds/player";
import { events } from "bdsx/event";

events.serverClose.on(() => {
	writeJSON("../scriptData/money.json", moneyData);
});

events.packetAfter(MinecraftPacketIds.Login).on((packet, networkIdentifier) => {
	const ip = networkIdentifier.getAddress();
	console.log(ip);
	let xuid, name;

	var actor = networkIdentifier.getActor();

	name = networkIdentifier.getActor()?.getName();

	if (packet.connreq == null) return;

	xuid = packet.connreq.cert.toString();

	if (name != null && actor != null) {
	addresses.set(ip.toLowerCase(), name.toLowerCase());
	xuids.set(name.toLowerCase(), xuid);
	moneyData[name] = getMoney(actor);
	}
	writeJSON("../scriptData/money.json", moneyData);
});

events.packetAfter(MinecraftPacketIds.Disconnect).on((p, networkIdentifier) => {
	const name = addresses.get(networkIdentifier.getAddress().toLowerCase());
	if(!name){
		return;
	}
	if (networkIdentifier.getActor() == null) {
		const user = moneys.get(networkIdentifier.getActor() as Player);
	if(!user){
		return;
	}
	moneyData[name.toLowerCase()] = user.getMoney();
	moneys.delete(networkIdentifier.getActor() as Player);
	addresses.delete(name);

	if(xuids.has(name.toLowerCase())){
		xuids.delete(name.toLowerCase());
	}}
	writeJSON("../scriptData/money.json", moneyData);
});
