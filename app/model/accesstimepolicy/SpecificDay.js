Ext.define('CaptivePortal.model.accesstimepolicy.SpecificDay',{
	extend:'Ext.data.Model',
	fields:[
		{ name:'date', type: 'date'},
		{ name:'from', type: 'string'},
		{ name:'to', type: 'string'},
		{ name:'available', type:'bool'},
		{ name:'id', type: 'string'}
	]
});