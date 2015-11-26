Ext.define('CaptivePortal.store.accesstimepolicy.Availablity',{
	extend:'Ext.data.Store',
	fields:['value', 'name'],
	data:[
	{value:true, name:'Available'},
	{value:false, name:'Unavailable'}]
});