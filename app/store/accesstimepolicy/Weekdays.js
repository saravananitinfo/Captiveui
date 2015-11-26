Ext.define('CaptivePortal.store.accesstimepolicy.Weekdays',{
	extend:'Ext.data.Store',
	 storeId: 'WeekdaysStore',
	fields:['id', 'name'],
	data:[{id:'Sunday', name:'Sunday'},
	{id:'Monday', name:'Monday'},
	{id:'Tuesday', name:'Tuesday'},
	{id:'Wednesday', name:'Wednesday'},
	{id:'Thurdday', name:'Thurdday'},
	{id:'Friday', name:'Friday'},
	{id:'Saturday', name:'Saturday'}]
});