import {IDateMeta} from "../../common/interfaces/date";
import {UserId, UUID} from "../../common/interfaces/utility";
import {IPreference} from "../../common/interfaces/preference";

interface IUser {
    id: UserId;
    email: string;
    password: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateMeta: IDateMeta;
    following: UserId[];
    location: string;
    interests: UUID[];
    preferences: IPreference;
    messages: UUID[];
    notifications: UUID[]; // re check this
}

export {
    IUser,
};
