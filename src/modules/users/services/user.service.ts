import {UUID} from "../../common/interfaces/utility";
import {AppError} from "../../common/utils/error-handler";
import {getDBInstance} from "../../db";
import {v4} from "uuid";
import {IUser} from "../interfaces/user";
import {getAuthenticationServiceInstance} from "../../authentication/services/authentication-service.provider";
interface IFollow {
    followerId: UUID;
    followingId: UUID;
}

class UserService {
    private db = getDBInstance();
    private auth = getAuthenticationServiceInstance();

    public async follow(followerId: UUID, followingId: UUID): Promise<IFollow> {
        const ID = v4();

        const exist = await this.db.pool.query("SELECT follower_user_id FROM users_relations WHERE follower_user_id=$1 AND following_user_id=$2", [followerId, followingId]);

        if (exist && exist.rows.length !== 0 ) {
            return Promise.reject(new AppError(409, "Already followed"));
        }

        await this.db.pool.query(`INSERT INTO users_relations(follower_user_id, following_user_id, id) VALUES($1, $2, $3)`,
                [followerId, followingId, ID]);
        return Promise.resolve({followerId, followingId});
    }

    public async createUser(user: IUser) {
        // validate user here
        const db = getDBInstance();
        const {email, firstName, lastName, password} = user;
        const ID = v4();
        const hashedPassword = await this.auth.hashPassword(password);

        await db.pool.query(`INSERT INTO users(id, user_name, first_name, last_name, email, password) VALUES($1,$2,$3,$4,$5,$6);`, [ID, email, firstName, lastName, email, hashedPassword]);

        return user;
    }
}

export {
    UserService,
};
