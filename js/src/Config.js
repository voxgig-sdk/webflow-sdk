
const { BaseFeature } = require('./feature/base/BaseFeature')
const { TestFeature } = require('./feature/test/TestFeature')



const FEATURE_CLASS = {
   test: TestFeature,

}


class Config {

  makeFeature(fn) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(fn) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Webflow',
        slug: "webflow",
    version: "0.0.1",
    target: "js",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.webflow.com/v2",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      collection: {
      },

      item: {
      },

      site: {
      },

    }
  }


  entity = {
    "collection": {
      "fields": [
        {
          "name": "createdOn",
          "type": "`$STRING`"
        },
        {
          "name": "displayName",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "slug",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/sites/{site_id}/collections",
              "parts": [
                "sites",
                "{site_id}",
                "collections"
              ],
              "select": {
                "exist": [
                  "site_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.collections`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/collections/{collection_id}",
              "parts": [
                "collections",
                "{id}"
              ],
              "rename": {
                "param": {
                  "collection_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "site"
          ]
        ]
      }
    },
    "item": {
      "fields": [
        {
          "name": "cmsLocaleId",
          "type": "`$STRING`"
        },
        {
          "name": "fieldData",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "lastPublished",
          "type": "`$STRING`"
        },
        {
          "name": "lastUpdated",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/collections/{collection_id}/items",
              "parts": [
                "collections",
                "{collection_id}",
                "items"
              ],
              "select": {
                "exist": [
                  "collection_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.items`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "item_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/collections/{collection_id}/items/{item_id}",
              "parts": [
                "collections",
                "{collection_id}",
                "items",
                "{id}"
              ],
              "rename": {
                "param": {
                  "item_id": "id"
                }
              },
              "select": {
                "exist": [
                  "collection_id",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.fieldData`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "collection"
          ]
        ]
      }
    },
    "site": {
      "fields": [
        {
          "name": "createdOn",
          "type": "`$STRING`"
        },
        {
          "name": "displayName",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "lastPublished",
          "type": "`$STRING`"
        },
        {
          "name": "shortName",
          "type": "`$STRING`"
        }
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
                "sites"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.sites`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/sites/{site_id}",
              "parts": [
                "sites",
                "{id}"
              ],
              "rename": {
                "param": {
                  "site_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

module.exports = {
  config
}

