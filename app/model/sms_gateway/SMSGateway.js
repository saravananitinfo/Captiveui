Ext.define('CaptivePortal.model.sms_gateway.SMSGateway',{
	extend:'Ext.data.Model',
	fields:[
		{ name:'name', type:'string'},
		{ name:'status', type: 'string'},
		{ name:'gateway_type', type: 'string'}
	]
});