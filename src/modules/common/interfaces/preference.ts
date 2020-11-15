import {UserId} from "./utility";

enum Theme {
    LIGHT = "light",
    DARK = "DARK",
}
interface IPreference {
    theme: Theme;
    blockUsers: UserId[];
}

export {
    IPreference,
};
