<?php
declare(strict_types=1);

// Webflow SDK utility: prepare_body

class WebflowPrepareBody
{
    public static function call(WebflowContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
