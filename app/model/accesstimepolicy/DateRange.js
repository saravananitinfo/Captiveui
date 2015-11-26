Ext.define('CaptivePortal.model.accesstimepolicy.DateRange',{
	extend:'Ext.data.Model',
	fields:[
		{ name:'start_date', type: 'date'},
		{ name:'end_date', type: 'date'},
		{ name:'from', type: 'string'},
		{ name:'to', type: 'string'},
		{ name:'available', type:'bool'},
		{ name:'id', type: 'string'}
	]
});