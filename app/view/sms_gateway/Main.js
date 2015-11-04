Ext.define('CaptivePortal.view.sms_gateway.Main',{
	extend:'Ext.Panel',
	requires:[
	  'CaptivePortal.view.sms_gateway.AddOrEditSMSGateway',
	  'CaptivePortal.view.sms_gateway.MainController'
	],
	alias:'widget.sms_gatewaysmain',
	controller: 'sms_gateway_maincontroller',
	height:'100%',
	width:'100%',
	layout:'card',
	initComponent: function () {
    	this.items = [{
      		xtype: 'sms_gateways_addedit',
        	itemId:'card_addeditsms_gateways'
      	}]
        this.callParent(arguments);
	}
});