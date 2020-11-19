import {array, object, string} from "yup";
import {DateMetaSchema, LocationSchema} from "../../common/schemas/common.schema";

const MessageSchema = object().shape({
    userId: string().uuid(),
    subject: string().required(),
    text: string().required(),
    tags: array().of(string().uuid()),
    media: array().of(string().uuid()),
    location: LocationSchema,
    dateMeta: DateMetaSchema,
    type: string().required().matches(/(message|repost|comment)/),
    parentId: string().uuid(),
});

export {
    MessageSchema,
};
