"use strict";

function onListening(port: number): () => void {
    return function listen() {
        console.log("Listening on " + port);
    };
}

export { onListening };
