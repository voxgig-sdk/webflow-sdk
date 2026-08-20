import { WebflowEntityBase } from '../WebflowEntityBase';
import type { WebflowSDK } from '../WebflowSDK';
import type { Control } from '../types';
import type { Site, SiteLoadMatch, SiteListMatch } from '../WebflowTypes';
declare class SiteEntity extends WebflowEntityBase<Site> {
    constructor(client: WebflowSDK, entopts: any);
    make(this: SiteEntity): SiteEntity;
    load(this: any, reqmatch?: SiteLoadMatch, ctrl?: Control): Promise<SiteEntity>;
    list(this: any, reqmatch?: SiteListMatch, ctrl?: Control): Promise<SiteEntity[]>;
}
export { SiteEntity };
