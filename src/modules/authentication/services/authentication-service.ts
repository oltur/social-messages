"use strict";
import fs from "fs";
import path from "path";
import {SignOptions, sign, verify, VerifyOptions} from "jsonwebtoken";
import { generalConfig } from "../../config/general";
import { getDBInstance } from "../../db";
import { compare, genSalt, hash } from "bcrypt";
import { v4 } from "uuid";
import { AppError } from "../../common/utils/error-handler";
import {IUser} from "../../users/interfaces/user";
const privateKeyPath = path.join(process.cwd(), generalConfig.env.PRIVATE_KEY_PATH);
const publicKeyPath = path.join(process.cwd(),  generalConfig.env.PUBLIC_KEY_PATH);
const sshDeffaultPrivateKey = fs.readFileSync(privateKeyPath, "utf-8");
const sshDefaultPublicKey = fs.readFileSync(publicKeyPath, "utf-8");

class AuthenticationService {

    private static signOptions: SignOptions = {
        algorithm: "RS256",
        audience: "c-universe",
        expiresIn: "12h",
        issuer: "c-universe",
    };

    private static verifyOptions: VerifyOptions = {
        audience: "c-universe",
        issuer: "c-universe",
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

    public async login(email: string, password: string): Promise<string> {

        const db = getDBInstance();
        const user = await db.pool.query(`SELECT first_name,
                                                                  last_name,
                                                                  password,
                                                                  email FROM users WHERE email=$1`, [email]);

        if (user.rows.length === 0) {
            return Promise.reject(new AppError(401, "No User found"));
        }
        const userData = user.rows[0];
        await this.checkUserCredentials(userData, password);
        delete userData.password;

        return this.signToken(userData);
    }

    public async checkUserCredentials(user: IUser, password: string) {
        const correctPassword = await this.isSamePassword(password, user.password);

        if(!correctPassword) {
            return Promise.reject(new AppError(401, "invalid password", null));
        }

        return correctPassword;
    }

    public async createUser(user: IUser) {
        // validate user here
        const db = getDBInstance();
        const {email, firstName, lastName, password} = user;
        const ID = v4();
        const hashedPassword = await this.hashPassword(password);

        await db.pool.query(`INSERT INTO users(id, user_name, first_name, last_name, email, password) VALUES($1,$2,$3,$4,$5,$6);`, [ID, email, firstName, lastName, email, hashedPassword]);

        return user;
    }

    public signToken(payload: any) {
        return sign(payload, this.sshPrivateKey, AuthenticationService.signOptions);
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(10);
        const hashed = await hash(password, salt);
        return hashed;
    }

    private async isSamePassword(password: string, encrypted: string): Promise<boolean> {
        if (!encrypted || !password) {
            return Promise.reject(false);
        }

        return compare(password, encrypted);
    }
}

export  {
    AuthenticationService,
};
