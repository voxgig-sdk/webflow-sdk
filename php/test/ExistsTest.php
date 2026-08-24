<?php
declare(strict_types=1);

// Webflow SDK exists test

require_once __DIR__ . '/../webflow_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = WebflowSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
