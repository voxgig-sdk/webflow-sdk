// Typed models for the Webflow SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Collection {
  createdOn?: string
  displayName?: string
  id?: string
  slug?: string
}

export interface CollectionLoadMatch {
  id: string
}

export interface CollectionListMatch {
  site_id: string
}

export interface Item {
  cmsLocaleId?: string
  fieldData?: Record<string, any>
  id?: string
  lastPublished?: string
  lastUpdated?: string
}

export interface ItemLoadMatch {
  collection_id: string
  id: string
}

export interface ItemListMatch {
  collection_id: string
}

export interface Site {
  createdOn?: string
  displayName?: string
  id?: string
  lastPublished?: string
  shortName?: string
}

export interface SiteLoadMatch {
  id: string
}

export interface SiteListMatch {
  createdOn?: string
  displayName?: string
  id?: string
  lastPublished?: string
  shortName?: string
}

