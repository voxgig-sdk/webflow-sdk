
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { WebflowSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('SiteEntity', async () => {

  test('instance', async () => {
    const testsdk = WebflowSDK.test()
    const ent = testsdk.Site()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let site_ref01_data = Object.values(setup.data.existing.site)[0]

    // LIST
    const site_ref01_ent = client.Site()
    const site_ref01_match = {}

    const site_ref01_list = (await site_ref01_ent.list(site_ref01_match)).map((e) => e.data())


    // LOAD
    const site_ref01_match_dt0 = {}
    site_ref01_match_dt0.id = site_ref01_data.id
    const site_ref01_data_dt0 = (await site_ref01_ent.load(site_ref01_match_dt0)).data()
    assert(site_ref01_data_dt0.id === site_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/site/SiteTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = WebflowSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['site01','site02','site03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WEBFLOW_TEST_SITE_ENTID': idmap,
    'WEBFLOW_TEST_LIVE': 'FALSE',
    'WEBFLOW_TEST_EXPLAIN': 'FALSE',
    'WEBFLOW_APIKEY': 'NONE',
  })

  idmap = env['WEBFLOW_TEST_SITE_ENTID']

  if ('TRUE' === env.WEBFLOW_TEST_LIVE) {
    client = new WebflowSDK(merge([
      {
        apikey: env.WEBFLOW_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.WEBFLOW_TEST_EXPLAIN,
    now: Date.now(),
  }

  return setup
}
  
