package voxgigwebflowsdk

import (
	"github.com/voxgig-sdk/webflow-sdk/go/core"
	"github.com/voxgig-sdk/webflow-sdk/go/entity"
	"github.com/voxgig-sdk/webflow-sdk/go/feature"
	_ "github.com/voxgig-sdk/webflow-sdk/go/utility"
)

// Type aliases preserve external API.
type WebflowSDK = core.WebflowSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type WebflowEntity = core.WebflowEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type WebflowError = core.WebflowError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCollectionEntityFunc = func(client *core.WebflowSDK, entopts map[string]any) core.WebflowEntity {
		return entity.NewCollectionEntity(client, entopts)
	}
	core.NewItemEntityFunc = func(client *core.WebflowSDK, entopts map[string]any) core.WebflowEntity {
		return entity.NewItemEntity(client, entopts)
	}
	core.NewSiteEntityFunc = func(client *core.WebflowSDK, entopts map[string]any) core.WebflowEntity {
		return entity.NewSiteEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewWebflowSDK = core.NewWebflowSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewWebflowSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *WebflowSDK  { return NewWebflowSDK(nil) }
func Test() *WebflowSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
