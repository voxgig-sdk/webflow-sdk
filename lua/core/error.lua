-- Webflow SDK error

local WebflowError = {}
WebflowError.__index = WebflowError


function WebflowError.new(code, msg, ctx)
  local self = setmetatable({}, WebflowError)
  self.is_sdk_error = true
  self.sdk = "Webflow"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function WebflowError:error()
  return self.msg
end


function WebflowError:__tostring()
  return self.msg
end


return WebflowError
