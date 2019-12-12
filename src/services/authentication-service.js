"use strict";

const util = require("util");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const signToken = util.promisify(jsonwebtoken.sign);
const verifyToken = util.promisify(jsonwebtoken.verify);
console.log("private path", process.env.PRIVATE_KEY_PATH);
const privateKeyPath = path.join(process.cwd(), process.env.PRIVATE_KEY_PATH);
const publicKeyPath = path.join(process.cwd(), process.env.PUBLIC_KEY_PATH);

const sshPrivateKey = fs.readFileSync(privateKeyPath, "utf-8");
const sshPublicKey = fs.readFileSync(publicKeyPath, "utf-8");

class AuthenticationService {
    #sshPrivateKey;
    #sshPublicKey;
    #userModel;

    static signOptions = {
        issuer: "c-universe",
        audience: "c-universe",
        expiresIn: "12h",
        algorithm: "RS256"
    };

    static verifyOptions = {
        issuer: "c-universe",
        audience: "c-universe",
        expiresIn: "12h",
        algorithm: "RS256"
    };

    constructor (userModel) {
        this.#sshPrivateKey = sshPrivateKey;
        this.#sshPublicKey = sshPublicKey;
        this.userModel = userModel;
    }

    async checkToken (token) {
        return verifyToken(token, this.#sshPublicKey, AuthenticationService.verifyOptions);
    }

    async login(user, password) {
        const validUser = await this.checkUserCredentials(user, password);

        return this.signToken(validUser);
    }

    checkUserCredentials(user, password) {
        return { user };
    }

    signToken(payload) {
        return signToken(payload, this.#sshPrivateKey, AuthenticationService.signOptions);
    }
}

module.exports = AuthenticationService;
