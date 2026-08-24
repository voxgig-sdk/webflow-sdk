
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


describe('CollectionEntity', async () => {

  test('instance', async () => {
    const testsdk = WebflowSDK.test()
    const ent = testsdk.Collection()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let collection_ref01_data = Object.values(setup.data.existing.collection)[0]

    // LIST
    const collection_ref01_ent = client.Collection()
    const collection_ref01_match = {}
    collection_ref01_match['site_id'] = setup.idmap['site01']

    const collection_ref01_list = (await collection_ref01_ent.list(collection_ref01_match)).map((e) => e.data())


    // LOAD
    const collection_ref01_match_dt0 = {}
    collection_ref01_match_dt0.id = collection_ref01_data.id
    const collection_ref01_data_dt0 = (await collection_ref01_ent.load(collection_ref01_match_dt0)).data()
    assert(collection_ref01_data_dt0.id === collection_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/collection/CollectionTestData.json')

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
    ['collection01','collection02','collection03','site01','site02','site03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WEBFLOW_TEST_COLLECTION_ENTID': idmap,
    'WEBFLOW_TEST_LIVE': 'FALSE',
    'WEBFLOW_TEST_EXPLAIN': 'FALSE',
    'WEBFLOW_APIKEY': 'NONE',
  })

  idmap = env['WEBFLOW_TEST_COLLECTION_ENTID']

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
  
