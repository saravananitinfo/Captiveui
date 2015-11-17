Ext.define('CaptivePortal.model.access_point.AccessPoint',{
	extend:'Ext.data.Model',
	fields: [
		{ name:'name', type:'string'},
		{ name:'mac_id', type:'string'},
		{ name:'site_id', type:'string'},
		{ name: 'uid', type:'string'}
    ]
});