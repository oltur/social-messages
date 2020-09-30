"use strict";
import config from "../config/general";
//import {promisify} from "util";
import fs from "fs";
import path from "path";
import {SignOptions, sign, verify, VerifyOptions} from "jsonwebtoken";

/*
const asyncSign = (
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret,
    options: SignOptions
) => promisify(sign);
*/
//const asyncVerify = (token: string, secretOrPublicKey: Secret, options: VerifyOptions) => promisify(verify);
const privateKeyPath = path.join(process.cwd(), config.env.PRIVATE_KEY_PATH);
const publicKeyPath = path.join(process.cwd(),  config.env.PUBLIC_KEY_PATH);
const sshDeffaultPrivateKey = fs.readFileSync(privateKeyPath, "utf-8");
const sshDefaultPublicKey = fs.readFileSync(publicKeyPath, "utf-8");

class AuthenticationService {

    static signOptions: SignOptions = {
        issuer: "c-universe",
        audience: "c-universe",
        expiresIn: "12h",
        algorithm: "RS256",
    };

    static verifyOptions: VerifyOptions = {
        issuer: "c-universe",
        audience: "c-universe",
    };

    constructor (public userModel?: any, private readonly sshPrivateKey: string = sshDeffaultPrivateKey, private readonly sshPublicKey: string = sshDefaultPublicKey) {
        this.sshPrivateKey = sshPrivateKey;
        this.sshPublicKey = sshPublicKey;
        this.userModel = userModel;
    }

    async checkToken (token: string) {
        return verify(token, this.sshPublicKey, AuthenticationService.verifyOptions);
    }

    async login (user: string, password: string) {
        const validUser = await this.checkUserCredentials(user, password);

        return this.signToken(validUser);
    }

    async checkUserCredentials (user: string, password: string) {
        return { user };
    }

    signToken (payload: any) {
        return sign(payload, this.sshPrivateKey, AuthenticationService.signOptions);
    }
}

export default AuthenticationService;
