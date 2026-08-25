-- Webflow SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Webflow",
      slug = "webflow",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.webflow.com/v2",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["collection"] = {},
        ["item"] = {},
        ["site"] = {},
      },
    },
    entity = {
      ["collection"] = {
        ["fields"] = {
          {
            ["name"] = "createdOn",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "displayName",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "slug",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "collection",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "site_id",
                      ["orig"] = "site_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/sites/{site_id}/collections",
                ["parts"] = {
                  "sites",
                  "{site_id}",
                  "collections",
                },
                ["select"] = {
                  ["exist"] = {
                    "site_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.collections`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "collection_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/collections/{collection_id}",
                ["parts"] = {
                  "collections",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["collection_id"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "site",
            },
          },
        },
      },
      ["item"] = {
        ["fields"] = {
          {
            ["name"] = "cmsLocaleId",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "fieldData",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lastPublished",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lastUpdated",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "item",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "collection_id",
                      ["orig"] = "collection_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/collections/{collection_id}/items",
                ["parts"] = {
                  "collections",
                  "{collection_id}",
                  "items",
                },
                ["select"] = {
                  ["exist"] = {
                    "collection_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.items`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "collection_id",
                      ["orig"] = "collection_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "item_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/collections/{collection_id}/items/{item_id}",
                ["parts"] = {
                  "collections",
                  "{collection_id}",
                  "items",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["item_id"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "collection_id",
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.fieldData`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "collection",
            },
          },
        },
      },
      ["site"] = {
        ["fields"] = {
          {
            ["name"] = "createdOn",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "displayName",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lastPublished",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "shortName",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "site",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/sites",
                ["parts"] = {
                  "sites",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.sites`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "site_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/sites/{site_id}",
                ["parts"] = {
                  "sites",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["site_id"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
