Ext.define('CaptivePortal.store.access_point.AddAccessPoint',{
	extend:'Ext.data.Store',
	autoLoad:false,
	requires:['CaptivePortal.model.access_point.AccessPoint'],
	model:'CaptivePortal.model.access_point.AccessPoint',
	data: [
		{name: "", mac_id: "", site_id: "", uid: ""}
	]
});