import {IDateMeta} from "../../common/interfaces/date";
import {UserId} from "../../common/interfaces/utility";

interface IUser {
    id: UserId;
    email: string;
    password: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateMeta: IDateMeta;
}

export {
    IUser,
}
