const checkServerStatus = require("./checkServerStatus.js");
const callServer = require("./callServer.js");

const startApp = () => {
    checkServerStatus((status) => {
        if (status === null) {
            console.log("Could not determine server status.");
            return;
        }
        if (status) {
            console.log("App is already running");
        } else {
            console.log("App started");
            callServer();
        }
    });
}

module.exports = startApp;