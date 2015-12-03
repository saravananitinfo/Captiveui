Ext.define('CaptivePortal.store.template_mgmt.TemplateMgmt',{
	extend:'Ext.data.Store',
	model:'CaptivePortal.model.template_mgmt.TemplateMgmt',
	idField:'id',
	autoLoad:false,
	requires:['CaptivePortal.model.template_mgmt.TemplateMgmt'],
	proxy:{
		url:CaptivePortal.Config.SERVICE_URLS.GET_SPLASH_JOURNEY,
		type:'ajax',
		reader:{
			type:'json',
			rootProperty:'data.splash_journeys'
		}
	}
});