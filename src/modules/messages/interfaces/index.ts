"use strict";

import {IDateMeta} from "../../common/interfaces/date";
import {UserId, UUID} from "../../common/interfaces/utility";

enum MediaType {
    VIDEO = "video",
    IMAGE = "image",
}

enum MessageType {
    MESSAGE = "message",
    REPOST = "repost",
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
    subject: string;
    text: string;
    tags: UUID[];
    likesCount: number;
    media: string[];
    location: ILocation;
    dateMeta: IDateMeta;
    type: MessageType;
    parentId?: UUID;
}

export {
    IMessage,
    MediaType,
    ITag,
    ILike,
    IMedia,
};
