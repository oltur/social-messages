"use strict";

import {UserId, UUID} from "../../common/interfaces/utility";

interface IRelation {
    id: UUID;
    followerId: UserId;
    followedId: UserId;
}

export {
    IRelation,
}
