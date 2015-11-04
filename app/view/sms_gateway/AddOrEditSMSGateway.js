Ext.define('CaptivePortal.view.sms_gateway.AddOrEditSMSGateway',{
	extend: 'Ext.panel.Panel',
	requires: [
   		'CaptivePortal.view.sms_gateway.SMSGatewayController',
   		'CaptivePortal.view.sms_gateway.GatewayType0',
   		'CaptivePortal.view.sms_gateway.GatewayType1',
   		'CaptivePortal.view.sms_gateway.GatewayType2'
	],
	alias: 'widget.sms_gateways_addedit',
	controller: 'sms_gateway',
	padding: 0,
	height: 100,
	scrollable: true,
	width: '100%',
	layout: {
	    type: 'vbox',
	    padding: '10 0 0 30'
	},
	initComponent: function () {
		this.items = [{
                xtype: 'panel',
                width: '100%',
                padding: '20 0 0 0',
                cls: 'form_trigger',
                items: [{
                        xtype: 'form',
                        itemId: 'smsform',
                        defaults: {
                            width: 400,
                            height: 30,
                            padding: '10 0 15 0',
                            maxLength: 50,
                        },
                        items: [{
                                xtype: 'hiddenfield', 
                                name: 'gateway_id',
                                reference:'hf_gatewayid'
                               
                            },{
                                xtype: 'label',
                                text: 'Name',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'textfield',
                                name: 'name',
                                itemId: 'gateway_name',
                                allowBlank: false,
                                //readOnly:(this.user_id) ? true:false
                            },{
                                xtype: 'label',
                                text: 'Gateway Type',
                                cls: 'header_label_content'
                            },{
                                xtype: 'combobox',
                                allowBlank: false,
                                name: 'gateway_type',
                                queryMode: 'local',
                                itemId: 'gateway',
                                valueField: 'id',
                                displayField: 'name',
                                store: 'CaptivePortal.store.sms_gateway.SmsGatewayType',
                                listeners: {
                                    'select': 'selectGatewayType'
                                }
                             },{
                                    xtype: 'panel',
	                                // layout: 'card',
	                                reference: 'gatwaytype_forms',
	                                width: '100%',
	                                height: 150
	                                // items: [
	                                // 	{
	                                // 		xtype: "gatewaytype0",
	                                // 		itemId: "gatewaytype0"
	                                // 	},
	                                // 	{
	                                // 		xtype: "gatewaytype1",
	                                // 		itemId: "gatewaytype1"
	                                // 	},
	                                // 	{
	                                // 		xtype: "gatewaytype2",
	                                // 		itemId: "gatewaytype2"
	                                // 	}
	                                // ]
	                             },{
                                    xtype: 'container',
	                                layout: 'hbox',
	                                width: '100%',
	                                height: 50,
	                                items: [{
	                                        xtype: 'button',
	                                        reference:'btn_save',
	                                        formBind: true,
	                                        itemId: "btn_saveTenant",
	                                        text: "Save",
	                                        handler: 'saveSMSGateway',
											cls: 'btn'
	                                    },
	                                    {
	                                        xtype: 'button',
	                                        margin: '0 0 0 20',
	                                        text: 'Cancel',
	                                        handler: 'cancelTenant',
											cls: 'btn btn-cancel'
	                                    }]
	                              }
                            ]
                        }]
       }]
	 this.callParent();
	}


});