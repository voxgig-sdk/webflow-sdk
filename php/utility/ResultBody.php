<?php
declare(strict_types=1);

// Webflow SDK utility: result_body

class WebflowResultBody
{
    public static function call(WebflowContext $ctx): ?WebflowResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
