# Webflow SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Webflow",
            "slug": "webflow",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.webflow.com/v2",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "collection": {},
                "item": {},
                "site": {},
            },
        },
        "entity": {
      "collection": {
        "fields": [
          {
            "name": "createdOn",
            "type": "`$STRING`",
          },
          {
            "name": "displayName",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "slug",
            "type": "`$STRING`",
          },
        ],
        "name": "collection",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "site_id",
                      "orig": "site_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/sites/{site_id}/collections",
                "parts": [
                  "sites",
                  "{site_id}",
                  "collections",
                ],
                "select": {
                  "exist": [
                    "site_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.collections`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "collection_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/collections/{collection_id}",
                "parts": [
                  "collections",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "collection_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "site",
            ],
          ],
        },
      },
      "item": {
        "fields": [
          {
            "name": "cmsLocaleId",
            "type": "`$STRING`",
          },
          {
            "name": "fieldData",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "lastPublished",
            "type": "`$STRING`",
          },
          {
            "name": "lastUpdated",
            "type": "`$STRING`",
          },
        ],
        "name": "item",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "collection_id",
                      "orig": "collection_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/collections/{collection_id}/items",
                "parts": [
                  "collections",
                  "{collection_id}",
                  "items",
                ],
                "select": {
                  "exist": [
                    "collection_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "collection_id",
                      "orig": "collection_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "item_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/collections/{collection_id}/items/{item_id}",
                "parts": [
                  "collections",
                  "{collection_id}",
                  "items",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "item_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "collection_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.fieldData`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "collection",
            ],
          ],
        },
      },
      "site": {
        "fields": [
          {
            "name": "createdOn",
            "type": "`$STRING`",
          },
          {
            "name": "displayName",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "lastPublished",
            "type": "`$STRING`",
          },
          {
            "name": "shortName",
            "type": "`$STRING`",
          },
        ],
        "name": "site",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/sites",
                "parts": [
                  "sites",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.sites`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "site_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/sites/{site_id}",
                "parts": [
                  "sites",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "site_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
