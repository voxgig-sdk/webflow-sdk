package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCollectionEntityFunc func(client *WebflowSDK, entopts map[string]any) WebflowEntity

var NewItemEntityFunc func(client *WebflowSDK, entopts map[string]any) WebflowEntity

var NewSiteEntityFunc func(client *WebflowSDK, entopts map[string]any) WebflowEntity

