<?php
declare(strict_types=1);

// Webflow SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class WebflowMakeContext
{
    public static function call(array $ctxmap, ?WebflowContext $basectx): WebflowContext
    {
        return new WebflowContext($ctxmap, $basectx);
    }
}
