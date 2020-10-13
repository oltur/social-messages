"use strict";
import { AuthenticationService} from "./authentication-service";

let instance: AuthenticationService | null = null;

function getAuthenticationServiceInstance(): AuthenticationService {
    if (instance === null) {
        instance = new AuthenticationService();
    }
    return instance;
}

export {
    getAuthenticationServiceInstance,
};
