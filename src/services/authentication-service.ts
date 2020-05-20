"use strict";
import config from "../config/general";
import util from "util";

const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const signToken = util.promisify(jsonwebtoken.sign);
const verifyToken = util.promisify(jsonwebtoken.verify);
const privateKeyPath = path.join(process.cwd(), config.env.PRIVATE_KEY_PATH);
const publicKeyPath = path.join(process.cwd(),  config.env.PUBLIC_KEY_PATH);

const sshDeffaultPrivateKey = fs.readFileSync(privateKeyPath, "utf-8");
const sshDefaultPublicKey = fs.readFileSync(publicKeyPath, "utf-8");

class AuthenticationService {

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

    constructor (public userModel?: any, private readonly sshPrivateKey: string = sshDeffaultPrivateKey, private readonly sshPublicKey: string = sshDefaultPublicKey) {
        this.sshPrivateKey = sshPrivateKey;
        this.sshPublicKey = sshPublicKey;
        this.userModel = userModel;
    }

    async checkToken (token: string) {
        return verifyToken(token, this.sshPublicKey, AuthenticationService.verifyOptions);
    }

    async login (user: string, password: string) {
        const validUser = await this.checkUserCredentials(user, password);

        return this.signToken(validUser);
    }

    checkUserCredentials (user: string, password: string) {
        return { user };
    }

    signToken (payload: any) {
        return signToken(payload, this.sshPrivateKey, AuthenticationService.signOptions);
    }
}

export default AuthenticationService;
