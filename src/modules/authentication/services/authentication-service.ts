"use strict";
import fs from "fs";
import path from "path";
import {SignOptions, sign, verify, VerifyOptions} from "jsonwebtoken";
import { generalConfig } from "../../config/general";
const privateKeyPath = path.join(process.cwd(), generalConfig.env.PRIVATE_KEY_PATH);
const publicKeyPath = path.join(process.cwd(),  generalConfig.env.PUBLIC_KEY_PATH);
const sshDeffaultPrivateKey = fs.readFileSync(privateKeyPath, "utf-8");
const sshDefaultPublicKey = fs.readFileSync(publicKeyPath, "utf-8");

class AuthenticationService {

    private static signOptions: SignOptions = {
        issuer: "c-universe",
        audience: "c-universe",
        expiresIn: "12h",
        algorithm: "RS256",
    };

    private static verifyOptions: VerifyOptions = {
        issuer: "c-universe",
        audience: "c-universe",
    };

    constructor(public userModel?: any,
                private readonly sshPrivateKey: string = sshDeffaultPrivateKey,
                private readonly sshPublicKey: string = sshDefaultPublicKey) {
        this.sshPrivateKey = sshPrivateKey;
        this.sshPublicKey = sshPublicKey;
        this.userModel = userModel;
    }

    public async checkToken(token: string) {
        return verify(token, this.sshPublicKey, AuthenticationService.verifyOptions);
    }

    public async login(user: string, password: string) {
        const validUser = await this.checkUserCredentials(user, password);

        return this.signToken(validUser);
    }

    public async checkUserCredentials(user: string, password: string) {
        return { user };
    }

    public signToken(payload: any) {
        return sign(payload, this.sshPrivateKey, AuthenticationService.signOptions);
    }
}

export  {
    AuthenticationService
};
