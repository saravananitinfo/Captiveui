Ext.define('CaptivePortal.store.radius_vsa.RadiusVSA',{
	extend:'Ext.data.Store',
	autoLoad:false,
	requires:['CaptivePortal.model.radius_vsa.RadiusVSA'],
	model:'CaptivePortal.model.radius_vsa.RadiusVSA',
	proxy:{
		url:CaptivePortal.Config.SERVICE_URLS.GET_RADIUS_VSA,
		type:'ajax',
		reader:{
			type:'json',
			root:'data.radius_vsa'
		}
	}
});