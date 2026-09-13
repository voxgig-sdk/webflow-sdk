-- Item entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("webflow_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("ItemEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Item(nil)
    assert.is_not_nil(ent)
  end)

  -- Feature #4: the entity stream(action, ...) method runs the op pipeline and
  -- returns an iterator over result items. With the streaming feature active it
  -- yields the feature's incremental output; otherwise it falls back to the
  -- materialised list so stream always yields.
  it("should stream", function()
    local seed = {
      entity = {
        ["item"] = {
          s1 = { id = "s1" },
          s2 = { id = "s2" },
          s3 = { id = "s3" },
        },
      },
    }

    -- Fallback: streaming inactive -> yields the materialised list items.
    local base = sdk.test(seed, nil)
    local seen = {}
    for item in base:Item(nil):stream("list", nil, nil) do
      table.insert(seen, item)
    end
    assert.are.equal(3, #seen)

    -- Inbound: streaming active -> yields each item from the feature.
    local config = require("config_shared")()
    if type(config.feature) == "table" and config.feature.streaming ~= nil then
      local streamsdk = sdk.test(seed, { feature = { streaming = { active = true } } })
      local got = {}
      for item in streamsdk:Item(nil):stream("list", nil, nil) do
        if vs.islist(item) then
          for _, sub in ipairs(item) do
            table.insert(got, sub)
          end
        else
          table.insert(got, item)
        end
      end
      assert.are.equal(3, #got)
    end
  end)

  it("should run basic flow", function()
    local setup = item_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "item." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set WEBFLOW_TEST_ITEM_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local item_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.item")))
    local item_ref01_data = nil
    if #item_ref01_data_raw > 0 then
      item_ref01_data = helpers.to_map(item_ref01_data_raw[1][2])
    end

    -- LIST
    local item_ref01_ent = client:Item(nil)
    local item_ref01_match = {
      ["collection_id"] = setup.idmap["collection01"],
    }

    local item_ref01_list_result, err = item_ref01_ent:list(item_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(item_ref01_list_result)

    -- LOAD
    local item_ref01_match_dt0 = {
      id = item_ref01_data["id"],
    }
    local item_ref01_data_dt0_loaded, err = item_ref01_ent:load(item_ref01_match_dt0, nil)
    assert.is_nil(err)
    local item_ref01_data_dt0_load_result = helpers.to_map(type(item_ref01_data_dt0_loaded) == 'table' and item_ref01_data_dt0_loaded.data_get and item_ref01_data_dt0_loaded:data_get() or item_ref01_data_dt0_loaded)
    assert.is_not_nil(item_ref01_data_dt0_load_result)
    assert.are.equal(item_ref01_data_dt0_load_result["id"], item_ref01_data["id"])

  end)
end)

function item_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/item/ItemTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read item test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "item01", "item02", "item03", "collection01", "collection02", "collection03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("WEBFLOW_TEST_ITEM_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["WEBFLOW_TEST_ITEM_ENTID"] = idmap,
    ["WEBFLOW_TEST_LIVE"] = "FALSE",
    ["WEBFLOW_TEST_EXPLAIN"] = "FALSE",
    ["WEBFLOW_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["WEBFLOW_TEST_ITEM_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["WEBFLOW_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["WEBFLOW_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["WEBFLOW_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["WEBFLOW_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
