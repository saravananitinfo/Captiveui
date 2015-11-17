Ext.define('CaptivePortal.store.access_point.Sites',{
	extend:'Ext.data.Store',
	autoload:false,
	fields:[
		{ name:'id', type:'string'},
		{ name:'name', type:'string'}
	],
	proxy:{
		url:CaptivePortal.Config.SERVICE_URLS.NEW_ACCESSPOINT,
		type:'ajax',
		reader:{
			type:'json',
			rootProperty:'data.site'
		}
	}
});