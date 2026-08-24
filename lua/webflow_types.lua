-- Typed models for the Webflow SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Collection
---@field createdOn? string
---@field displayName? string
---@field id? string
---@field slug? string

---@class CollectionLoadMatch
---@field id string

---@class CollectionListMatch
---@field site_id string

---@class Item
---@field cmsLocaleId? string
---@field fieldData? table
---@field id? string
---@field lastPublished? string
---@field lastUpdated? string

---@class ItemLoadMatch
---@field collection_id string
---@field id string

---@class ItemListMatch
---@field collection_id string

---@class Site
---@field createdOn? string
---@field displayName? string
---@field id? string
---@field lastPublished? string
---@field shortName? string

---@class SiteLoadMatch
---@field id string

---@class SiteListMatch
---@field createdOn? string
---@field displayName? string
---@field id? string
---@field lastPublished? string
---@field shortName? string

local M = {}

return M
