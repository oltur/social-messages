import {DbService} from "../../db/services/db.service";
import {getDBInstance} from "../../db";
import {IMessage} from "../interfaces";
import {MessageSchema} from "../schemas/message.schema";
import {AppError} from "../../common/utils/error-handler";
import {v4} from "uuid";

class MessagesService {
    private db: DbService  = getDBInstance();

    public async addMessage(message: IMessage): Promise<IMessage> {
        const {subject, text, type, userId} = message;

        const isValid = await MessageSchema.isValid(message);
        const ID = v4();

        if (!message || !isValid) {
            return Promise.reject(new AppError(400, "Invalid message"));
        }
        try {
            await this.db.pool
                .query(`INSERT INTO messages(id,subject,text,type,user_id) VALUES($1,$2,$3,$4,$5)`, [
                    ID,
                    subject,
                    text,
                    type,
                    userId]);
            message.id = ID;
            return Promise.resolve(message);
        } catch (e) {
            return Promise.reject(e);
        }

    }
}

export {
    MessagesService,
};
