import { WebflowEntityBase } from '../WebflowEntityBase';
import type { WebflowSDK } from '../WebflowSDK';
import type { Control } from '../types';
import type { Collection, CollectionLoadMatch, CollectionListMatch } from '../WebflowTypes';
declare class CollectionEntity extends WebflowEntityBase<Collection> {
    constructor(client: WebflowSDK, entopts: any);
    make(this: CollectionEntity): CollectionEntity;
    load(this: any, reqmatch?: CollectionLoadMatch, ctrl?: Control): Promise<CollectionEntity>;
    list(this: any, reqmatch?: CollectionListMatch, ctrl?: Control): Promise<CollectionEntity[]>;
}
export { CollectionEntity };
