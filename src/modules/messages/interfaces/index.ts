import {IDateMeta} from "../../common/interfaces/date";
import {UserId, UUID} from "../../common/interfaces/utility";

enum MediaType {
    VIDEO = "video",
    IMAGE = "image",
}

interface ITag {
    id: UUID;
    label: string;
}
interface IMedia {
    id: UUID;
    url: string;
    type: MediaType;
    messageId: string;
    dateMeta: IDateMeta;
}
interface ILike {
    id: UUID;
    userId: UserId;
    messageId: string;
    dateMeta: IDateMeta;
}
interface ILocation {
    longitude: string;
    latitude: string;
    name: string;
}
interface IMessage {
    id: UUID;
    userId: UserId;
    text: string;
    tags: ITag[];
    likes: string[];
    media: string[];
    location: ILocation;
    dateMeta: IDateMeta;
}

export {
    IMessage,
    MediaType,
    ITag,
    ILike,
    IMedia,
};
