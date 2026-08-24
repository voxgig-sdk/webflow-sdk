# Webflow SDK utility: make_context

from projectname_sdk.core.context import WebflowContext


def make_context_util(ctxmap, basectx):
    return WebflowContext(ctxmap, basectx)
