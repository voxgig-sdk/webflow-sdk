
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WebflowSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await WebflowSDK.test()
    equal(null !== testsdk, true)
  })

})
