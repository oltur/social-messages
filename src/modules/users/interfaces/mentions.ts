
import {UserId, UUID} from "../../common/interfaces/utility";

interface IMentions {
    id: UUID;
    userId: UserId;
    mentionedUserId: UserId;
}

export {
    IMentions,
}
