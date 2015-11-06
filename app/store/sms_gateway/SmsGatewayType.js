Ext.define('CaptivePortal.store.sms_gateway.SmsGatewayType',{
	extend:'Ext.data.Store',
	autoload:false,
	fields:[
		{ name:'id', type:'string'},
		{ name:'name', type:'string'}
	],
	data: [
    	{id: 'Clickatell', name: 'Clickatell'},
    	{id: 'Twilio', name: 'Twilio'},
    	{id: 'Cdyne', name: 'Cdyne'}
	]
});