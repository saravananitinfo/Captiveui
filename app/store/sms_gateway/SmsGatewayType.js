Ext.define('CaptivePortal.store.sms_gateway.SmsGatewayType',{
	extend:'Ext.data.Store',
	autoload:false,
	fields:[
		{ name:'id', type:'string'},
		{ name:'name', type:'string'}
	],
	data: [
    	{id: 0, name: 'clickatell'},
    	{id: 1, name: 'twilio'},
    	{id: 2, name: 'cdyne'}
	]
});