Ext.define('CaptivePortal.model.accesstimepolicy.TimePolicy',{
	extend:'Ext.data.Model',
	fields:[
		{ name:'close_message', type: 'string'},
		{ name:'date_policies'},
		{ name:'date_range_policies'},
		{ name:'default_policies'},
		{ name:'id', type: 'string'},
		{ name:'name', type: 'string'},
		{ name:'associated_resource'},
		{ name:'site_info'}
	]
});