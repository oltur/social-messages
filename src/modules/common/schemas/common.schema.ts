import {object, string} from "yup";

const DateMetaSchema = object().shape({
    dateCreated: string(),
    dateModified: string(),
});

const LocationSchema =  object().shape({
    latitude: string(),
    longitude: string(),
    name: string(),
});

export {
    DateMetaSchema,
    LocationSchema,
};
