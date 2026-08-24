# Webflow SDK exists test

import pytest
from webflow_sdk import WebflowSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = WebflowSDK.test(None, None)
        assert testsdk is not None
