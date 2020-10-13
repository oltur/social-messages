import {DBService} from "./db-service";

let DBInstance: any;

function getDBInstance(): DBService {
    if (!DBInstance) {
        DBInstance = new DBService();
    }
    return DBInstance;
}

export {
    getDBInstance,
};
