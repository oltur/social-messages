const util = require("util");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const {ErrorHandler} = require("../utils/error-handler");
const signToken = util.promisify(jsonwebtoken.sign);
const keyPath = path.join(process.cwd(), ".ssh", "privateKey")

class Auth {

    #sshPrivateKey;

    static signOptions = {
        issuer:  "c-universe",
        audience:  "c-universe",
        expiresIn:  "12h",
        algorithm:  "RS256"
    };

    constructor () {
        try {
            this.#sshPrivateKey = fs.readFileSync(keyPath, "utf-8");
        } catch (e) {
            throw new ErrorHandler(500, "Error finding ssh keys")
        }
    }

    login(user) {
        return this.signToken(user);
    }

    async signToken (payload) {
        const token = await signToken(payload, this.#sshPrivateKey, Auth.signOptions);
        return token;
    }
}

module.exports = Auth;
