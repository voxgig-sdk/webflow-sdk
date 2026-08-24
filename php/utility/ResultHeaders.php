<?php
declare(strict_types=1);

// Webflow SDK utility: result_headers

class WebflowResultHeaders
{
    public static function call(WebflowContext $ctx): ?WebflowResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
