Ext.define('CaptivePortal.model.role.RoleAccess',{
	extend:'Ext.data.Model',
	idProperty:'id',
	fields:[
	{ name:'access_for', type:'string'},
	{ name:'read', type:'bool'},
	{ name:'write', type:'bool'},
	{ name:'id', type:'string'}]
	});