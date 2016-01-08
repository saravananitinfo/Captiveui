Ext.define('CaptivePortal.view.access_point.EditAccessPoint',{
	extend: 'Ext.panel.Panel',
	requires: [
		'CaptivePortal.view.access_point.AccessPointListController'
	],
	alias: 'widget.edit_access_point',
	controller: 'access_point_list_controller',
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
                padding: '20 0 0 0',
                cls: 'form_trigger',
                items: [
        			{
                		xtype: 'form',
                		itemId: 'access_point_form',
                		defaults: {
                    		width: 400,
                    		height: 30,
                    		padding: '10 0 15 0',
                    		maxLength: 50,
                		},
                		items: [
        					{
                				xtype: 'hiddenfield', 
                				name: 'access_point_id',
                				itemId: 'access_point_id',
                				reference:'hf_access_point_id',
                                value: this.access_point_id ? this.access_point_id : ''
               
            				},
            				{
                				xtype: 'label',
                				text: 'Name',
                				cls: 'header_label_content'
            				},
            				{
                                xtype: 'textfield',
                                name: 'name',
                                itemId: 'access_point_name',
                                allowBlank: false,
                                value: this.name ? this.name : ''
                            },
                            {
                            	xtype: 'label',
                                text: 'Mac Id',
                                cls: 'header_label_content'
                            },
                            {
                            	xtype: 'textfield',
                                allowBlank: false,
                                name: 'mac_id',
                                itemId: 'access_point_mac_id',
                                value: this.mac_id ? this.mac_id : '',
                            },
                            {
                            	xtype: 'label',
                                text: 'Vendors',
                                cls: 'header_label_content'
                            },
                            {
                            	xtype:"combo",
                                emptyText: "Vendors",
                                allowBlank: false,
                                store: Ext.create("CaptivePortal.store.access_point.Vendors"),
                                editable: false,
                                queryMode: "remote",
                                displayField: "name",
                                valueField: "id",
                                name:'vendor_type',
                                value: this.vendor_type ? this.vendor_type : '',
                            },
                            {
                            	xtype: 'label',
                                text: 'Site Id',
                                cls: 'header_label_content'
                            },
                            {
                            	xtype: 'combobox',
                            	editable: false,
                                allowBlank: false,
					            queryMode: "local",
					            displayField: "name",
					            valueField: "id",
                                name: 'site_id',
                                itemId: 'access_point_sites',
                                value: this.site_id ? this.site_id : '',
                                store: "CaptivePortal.store.access_point.Sites"
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
                                        itemId: "btn_save_access_point",
                                        text: "Update",
                                        handler: 'saveEditAccessPoint',
										cls: 'btn'
                        			},
                        			{
                                        xtype: 'button',
                                        margin: '0 0 0 20',
                                        text: 'Cancel',
                                        handler: 'cancleEditAccessPoint',
										cls: 'btn btn-cancel'
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