<?php
declare(strict_types=1);

// Typed models for the Webflow SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Collection entity data model. */
class Collection
{
    public ?string $createdOn = null;
    public ?string $displayName = null;
    public ?string $id = null;
    public ?string $slug = null;
}

/** Request payload for Collection#load. */
class CollectionLoadMatch
{
    public string $id;
}

/** Request payload for Collection#list. */
class CollectionListMatch
{
    public string $site_id;
}

/** Item entity data model. */
class Item
{
    public ?string $cmsLocaleId = null;
    public ?array $fieldData = null;
    public ?string $id = null;
    public ?string $lastPublished = null;
    public ?string $lastUpdated = null;
}

/** Request payload for Item#load. */
class ItemLoadMatch
{
    public string $collection_id;
    public string $id;
}

/** Request payload for Item#list. */
class ItemListMatch
{
    public string $collection_id;
}

/** Site entity data model. */
class Site
{
    public ?string $createdOn = null;
    public ?string $displayName = null;
    public ?string $id = null;
    public ?string $lastPublished = null;
    public ?string $shortName = null;
}

/** Request payload for Site#load. */
class SiteLoadMatch
{
    public string $id;
}

/** Request payload for Site#list. */
class SiteListMatch
{
    public ?string $createdOn = null;
    public ?string $displayName = null;
    public ?string $id = null;
    public ?string $lastPublished = null;
    public ?string $shortName = null;
}

