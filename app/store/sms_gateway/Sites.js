Ext.define('CaptivePortal.store.sms_gateway.Sites',{
	extend:'Ext.data.Store',
	autoload:false,
	fields:[
		{ name:'id', type:'string'},
		{ name:'name', type:'string'}
	],
	proxy:{
		url:CaptivePortal.Config.SERVICE_URLS.NEW_SMSGATEWAY,
		type:'ajax',
		reader:{
			type:'json',
			rootProperty:'data.sites'
		}
	}
});