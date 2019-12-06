"use strict";

function onListening (port) {
    return function listen () {
        console.log("Listening on " + port);
    };
}

module.exports = {
    onListening
};
