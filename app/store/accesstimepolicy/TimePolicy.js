Ext.define('CaptivePortal.store.accesstimepolicy.TimePolicy',{
	extend:'Ext.data.Store',
	model:'CaptivePortal.model.accesstimepolicy.TimePolicy',
	idField:'id',
	autoLoad:true,
	requires:['CaptivePortal.model.accesstimepolicy.TimePolicy'],
	proxy:{
		url:CaptivePortal.Config.SERVICE_URLS.GET_ACCESS_TIME_POLICY,
		type:'ajax',
		reader:{
			type:'json',
			rootProperty:'data.time_policies'
		}
	}
});