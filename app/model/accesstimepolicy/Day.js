Ext.define('CaptivePortal.model.accesstimepolicy.Day',{
	extend:'Ext.data.Model',
	fields:[
		{ name:'days'},
		{ name:'from', type: 'string'},
		{ name:'to', type: 'string'},
		{ name:'id', type: 'string'},
		{ name:'available', type:'bool'}
	]
});