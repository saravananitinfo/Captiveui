Ext.define('CaptivePortal.store.access_point.AccessPoints',{
	extend:'Ext.data.Store',
	autoLoad:false,
	requires:['CaptivePortal.model.access_point.AccessPoint'],
	model:'CaptivePortal.model.access_point.AccessPoint',
	proxy:{
		url:CaptivePortal.Config.SERVICE_URLS.GET_ACCESSPOINT,
		type:'ajax',
		reader:{
			type:'json',
			rootProperty:'data.access_points'
		}
	}
});