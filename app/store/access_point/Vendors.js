Ext.define('CaptivePortal.store.access_point.Vendors',{
	extend:'Ext.data.Store',
	 storeId: 'Vendors',
	fields:['id', 'name'],
	data:[
	{id:'zebra', name:'zebra'},
	{id:'wavespot', name:'wavespot'}]
});