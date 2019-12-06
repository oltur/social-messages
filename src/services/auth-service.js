const util = require("util");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const {ErrorHandler} = require("../utils/error-handler");
const signToken = util.promisify(jsonwebtoken.sign);
const keyPath = path.join(process.cwd(), ".ssh", "privateKey");

class AuthService {

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
            throw new ErrorHandler(500, "Can't locate ssh keys", e);
        }
    }

    async login(user, password) {
      const validUser = await this.checkUserCredentials(user, password);


      return this.signToken(validUser);
    }

    checkUserCredentials(user, password) {
        return {user}
    }

   signToken (payload) {
       return signToken(payload, this.#sshPrivateKey, AuthService.signOptions);
   }
}

module.exports = AuthService;
