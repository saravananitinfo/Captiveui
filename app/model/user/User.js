Ext.define('CaptivePortal.model.user.User',{
	extend:'Ext.data.Model',
	idProperty:'id',
	fields:[
	{ name:'name', type:'string'},
	{ name:'email', type:'string'},
	{ name:'tenant_id'},
	{ name:'site_ids'},
	{ name:'site_role_id'},
	{ name:'permission'},
	{ name:'status', type:'string'},
	{ name:'id', type:'string'}
	]
});