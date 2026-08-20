export interface Collection {
    createdOn?: string;
    displayName?: string;
    id?: string;
    slug?: string;
}
export interface CollectionLoadMatch {
    id: string;
}
export interface CollectionListMatch {
    site_id: string;
}
export interface Item {
    cmsLocaleId?: string;
    fieldData?: Record<string, any>;
    id?: string;
    lastPublished?: string;
    lastUpdated?: string;
}
export interface ItemLoadMatch {
    collection_id: string;
    id: string;
}
export interface ItemListMatch {
    collection_id: string;
}
export interface Site {
    createdOn?: string;
    displayName?: string;
    id?: string;
    lastPublished?: string;
    shortName?: string;
}
export interface SiteLoadMatch {
    id: string;
}
export interface SiteListMatch {
    createdOn?: string;
    displayName?: string;
    id?: string;
    lastPublished?: string;
    shortName?: string;
}
