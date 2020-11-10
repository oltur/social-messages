enum MediaType {
    VIDEO = "video",
    IMAGE = "image",
}
interface IDateMeta {
    dateCreated: string;
    dateModified: string;
};

interface ITag {
    id: string;
    label: string;
}
interface IMedia {
    id: string;
    url: string;
    type: MediaType;
    messageId: string;
    dateMeta: IDateMeta;
}
interface ILike {
    id: string;
    userId: string;
    messageId: string;
    dateMeta: IDateMeta;
}
interface ILocation {
    longitude: string;
    latitude: string;
    name: string;
}
interface IMessage {
    id: string;
    userId: string;
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
