
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { WebflowSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await WebflowSDK.test()
    equal(null !== testsdk, true)
  })

})
