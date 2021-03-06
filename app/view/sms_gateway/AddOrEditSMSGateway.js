Ext.define('CaptivePortal.view.sms_gateway.AddOrEditSMSGateway',{
	extend: 'Ext.panel.Panel',
	requires: [
   		'CaptivePortal.view.sms_gateway.SMSGatewayController',
   		'CaptivePortal.view.sms_gateway.GatewayTypeClickatell',
   		'CaptivePortal.view.sms_gateway.GatewayTypeTwilio',
   		'CaptivePortal.view.sms_gateway.GatewayTypeCdyne'
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
		this.items = [
		   {
                xtype: 'panel',
                width: '100%',
                bodyCls: 'form_panel',
                cls: 'form_trigger',
                items: [
        			{
                		xtype: 'form',
                		itemId: 'smsform',
                		defaults: {
                    		width: 400,
                    		height: 30,
                    		padding: '10 0 15 0',
                    		maxLength: 50,
                		},
                		items: [
        					{
                				xtype: 'hiddenfield', 
                				name: 'gateway_id',
                				itemId: 'gateway_id',
                				reference:'hf_gatewayid',
                                value: this.gateway_id ? this.gateway_id : ''
               
            				},
            				{
                				xtype: 'label',
                				text: 'Name',
                				cls: 'header_label_content'
            				},
            				{
                                xtype: 'textfield',
                                name: 'name',
                                itemId: 'gateway_name',
                                allowBlank: false,
                                emptyText: "Gateway Name",
                                value: this.name ? this.name : ''
                                //readOnly:(this.user_id) ? true:false
                            },
                            {
                            	xtype: 'label',
                                text: 'Select Site / Group',
                                cls: 'header_label_content'
                            },
                            {
                            	xtype: 'combo',
                                allowBlank: false,
                                editable: false,
                                name: 'associated_resource',
                                queryMode: 'local',
                                itemId: 'gateway_sites',
                                emptyText: "Select Site / Group",
                                valueField: 'id',
                                displayField: 'name',
                                store: CaptivePortal.util.Utility.getEmptySiteStore(),
                                listConfig:{
                                    getInnerTpl:CaptivePortal.util.Utility.getSiteTemplateIcon
                                }
                            },
                            {
                                xtype: 'label',
                                text: 'Gateway Type',
                                cls: 'header_label_content'
                            },
                            {
                                xtype: 'combobox',
                                allowBlank: false,
                                editable: false,
                                name: 'gateway_type',
                                queryMode: 'local',
                                itemId: 'gateway_type',
                                valueField: 'id',
                                value: this.gateway_type ? this.gateway_type : 'Clickatell',
                                displayField: 'name',
                                store: 'CaptivePortal.store.sms_gateway.SmsGatewayType',
                                listeners: {
                                    'select': 'selectGatewayType'
                                }
                            },
                            {
                				xtype: 'label',
                				text: 'Status',
                				cls: 'header_label_content'
            				},
                            {
                                xtype: 'container',
                                defaultType: 'radiofield',
                                defaults: {
                                    width: 100
                                },
                                margin: '0 0 20 0',
                                layout: 'hbox',
                                items: [
                                    {
                                        boxLabel: 'Enable',
                                        name: 'status',
                                        inputValue: 'enable',
                                        itemId: 'user_enable',
                                        checked: true
                                    }, {
                                        boxLabel: 'Disable',
                                        name: 'status',
                                        inputValue: 'disable',
                                        itemId: 'user_disable',
                                        checked: this.status == 'disable' ? true : false
                                    }
                                ]
                            },
                            {
                				xtype: 'label',
                				text: 'Account Details',
                				cls: 'header_label_content',
                                padding: '10 0 10 0'

            				},
                            {
                                xtype: 'panel',
                                reference: 'gatwaytype_forms',
                                itemId: 'gatwaytype_forms',
                                padding: '0 0 15 0',
                                width: 600,
                                layout: 'box',
                                height: 220
                       //  		items: [
                       //      		{
                       //      			xtype: "gatewaytype0",
                       //      			itemId: "gatewaytype0"
                       //      		}
                    			// ]
                 			},
                 			{
                                xtype: 'container',
                                layout: 'hbox',
                                width: '100%',
                                height: 50,
                                items: [
                                	{
                                        xtype: 'button',
                                        reference:'btn_save',
                                        formBind: true,
                                        itemId: "btn_saveSMSGateway",
                                        text: "Save",
                                        handler: 'saveSMSGateway',
										cls: 'btn'
                        			},
                        			{
                                        xtype: 'button',
                                        margin: '0 0 0 20',
                                        text: 'Cancel',
                                        handler: 'cancelSMSGateway',
										cls: 'btn btn-cancel'
                        			},
					{
				                xtype: 'button',
                				text: 'Verify',
				                cls: 'header_label_content btn btn-verify',
				                margin: '0 0 0 20',
				                handler: 'testVerifyGatewayDetails'
            }

                        		]
                  			}
            			]
                	}
                ]
            }
        ]
	    this.callParent();
	}


});
