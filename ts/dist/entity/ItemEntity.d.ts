import { WebflowEntityBase } from '../WebflowEntityBase';
import type { WebflowSDK } from '../WebflowSDK';
import type { Control } from '../types';
import type { Item, ItemLoadMatch, ItemListMatch } from '../WebflowTypes';
declare class ItemEntity extends WebflowEntityBase<Item> {
    constructor(client: WebflowSDK, entopts: any);
    make(this: ItemEntity): ItemEntity;
    load(this: any, reqmatch?: ItemLoadMatch, ctrl?: Control): Promise<ItemEntity>;
    list(this: any, reqmatch?: ItemListMatch, ctrl?: Control): Promise<ItemEntity[]>;
}
export { ItemEntity };
