"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFile = exports.writeJSON = exports.parseJSON = void 0;
// thanks sacri for making his userInfo.ts to make me know how to do json stuff
const fs_1 = require("fs");
function parseJSON(path) {
    initJSONifNotExist(path);
    return JSON.parse(fs_1.readFileSync(path, "utf8"));
}
exports.parseJSON = parseJSON;
function initJSONifNotExist(path) {
    if (!isFile(path)) {
        initJSON(path);
    }
}
function writeJSON(path, data) {
    initJSONifNotExist(path);
    fs_1.writeFileSync(path, JSON.stringify(data));
}
exports.writeJSON = writeJSON;
function isFile(filepath) {
    try {
        return fs_1.statSync(filepath).isFile();
    }
    catch (err) {
        return false;
    }
}
exports.isFile = isFile;
function initJSON(path) {
    fs_1.appendFileSync(path, "{}");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrRUFBK0U7QUFDL0UsMkJBQTJFO0FBRTNFLFNBQWdCLFNBQVMsQ0FBQyxJQUFZO0lBQzlCLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3RELENBQUM7QUFIRCw4QkFHQztBQUVELFNBQVMsa0JBQWtCLENBQUMsSUFBWTtJQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2YsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xCO0FBQ1QsQ0FBQztBQUVELFNBQWdCLFNBQVMsQ0FBQyxJQUFZLEVBQUUsSUFBWTtJQUM1QyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixrQkFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUhELDhCQUdDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLFFBQWU7SUFDOUIsSUFBSTtRQUNBLE9BQU8sYUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3RDO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNULENBQUM7QUFORCx3QkFNQztBQUVELFNBQVMsUUFBUSxDQUFDLElBQVk7SUFDdEIsbUJBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkMsQ0FBQyJ9