Ext.define('CaptivePortal.view.guest_users.AddOrEditGuestUser',{
	extend: 'Ext.panel.Panel',
	requires: [
 		'CaptivePortal.view.guest_users.GuestUserController'
	],
	alias: 'widget.guest_user_addedit',
	controller: 'guest_user',
	padding: 0,
	height: 100,
	autoScroll: true,
	width: '95%',
	layout: {
	    type: 'vbox',
	    padding: '10 0 0 30'
	},
	initComponent: function () {
        var emptySiteStore = Ext.create('Ext.data.Store',{
            fields:['id', 'name'],
            data:[]
        });
		this.items = [
		   {
                xtype: 'panel',
                width: '95%',
                bodyCls: 'form_panel',
                cls: 'form_trigger',
                items: [
        			{
                		xtype: 'form',
                		itemId: 'guest_user_form',
                		defaults: {
                    		width: 400,
                    		height: 30,
                    		padding: '10 0 15 0',
                    		maxLength: 50,
                		},
                		items: [
        					{
                				xtype: 'hiddenfield', 
                				name: 'guest_user_id',
                				itemId: 'guest_user_id',
                				reference:'guest_user_id',
                                value: this.guest_user_id ? this.guest_user_id : ''
               
            				},
                            {
                            	xtype: 'label',
                                text: 'Site / Group',
                                cls: 'header_label_content'
                            },
                            {
                            	xtype: 'combobox',
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
                				text: 'Username',
                				cls: 'header_label_content'
            				},
            				{
                                xtype: 'textfield',
                                name: 'user_name',
                                itemId: 'guest_user_username',
                                emptyText: "Username",
                                allowBlank: false,
                                value: this.user_name ? this.user_name : ''
                                //readOnly:(this.user_id) ? true:false
                            },
                            {
                                xtype: 'label',
                                text: 'Password',
                                cls: 'header_label_content'
                            },
                            {
                                xtype: 'textfield',
                                name: 'password',
                                inputType: 'password',
                                itemId: 'guest_user_password',
                                emptyText: "Password",
                                allowBlank: false,
                                value: this.password ? this.password : ''
                                //readOnly:(this.user_id) ? true:false
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
                                        name: 'enabled',
                                        inputValue: 'yes',
                                        itemId: 'guest_user_enable',
                                        checked: true,
                                        //checked: this.enabled == 'yes' ? true : false
                                    }, {
                                        boxLabel: 'Disable',
                                        name: 'enabled',
                                        inputValue: 'no',
                                        itemId: 'guest_user_disable',
                                        checked: this.enabled == 'no' ? true : false
                                    }
                                ]
                            },
                            /*{
                                xtype: 'label',
                                text: 'Additional Details',
                                cls: 'header_label_content'
                            },*/
                            {                                
                                xtype: 'panel',
                                title: 'Additional Details',
                                collapsible: true,
                                collapsed: true,
                                layout: 'vbox',
                                padding: '0 0 0 0',
                                //margin:'20 20 0 0',
                                height:300,
                                width: '100%',
                                items:[{
                                xtype: 'container',
                                itemId: 'additional_detail',
                                width: '100%',
                                height: 100,
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'container',
                                        margin:'0 10 0 10',
                                        items: [
                                            {
                                                xtype: 'label',
                                                text: 'First Name',
                                                cls: 'header_label_content'
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'first_name',
                                                margin: '10 0 0 0',
                                                width: 400,
                                                itemId: 'guest_user_first_name',
                                                allowBlank: true,
                                                value: this.first_name ? this.first_name : ''
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '0 0 0 50',
                                        items: [
                                            {
                                                xtype: 'label',
                                                text: 'Last Name',
                                                cls: 'header_label_content'
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'last_name',
                                                margin: '10 0 0 0',
                                                width: 400,
                                                itemId: 'guest_user_last_name',
                                                allowBlank: true,
                                                value: this.first_name ? this.first_name : ''
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                width: '100%',
                                height: 100,
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'container',
                                        margin:'0 10 0 10',
                                        items: [
                                            {
                                                xtype: 'label',
                                                text: 'Email',
                                                cls: 'header_label_content'
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'email',
                                                margin: '10 0 0 0',
                                                width: 400,
                                                itemId: 'guest_user_email',
                                                allowBlank: true,
                                                value: this.email ? this.email : ''
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '0 0 0 50',
                                        items: [
                                            {
                                                xtype: 'label',
                                                text: 'Mobile No.',
                                                cls: 'header_label_content'
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'mobile_no',
                                                margin: '10 0 0 0',
                                                width: 400,
                                                itemId: 'guest_user_mobile_no',
                                                allowBlank: true,
                                                value: this.mobile_no ? this.mobile_no : ''
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                width: '100%',
                                height: 100,
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'container',
                                        hidden: true,
                                        margin:'0 10 0 10',
                                        items: [
                                            {
                                                xtype: 'label',
                                                text: 'Authorized SSIDs',
                                                cls: 'header_label_content'
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'authorized_ssids',
                                                margin: '10 0 0 0',
                                                width: 400,
                                                itemId: 'guest_user_authorized_ssids',
                                                allowBlank: true,
                                                value: this.authorized_ssids ? this.authorized_ssids : ''
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        // margin: '0 0 0 50',
                                        items: [
                                            {
                                                xtype: 'label',
                                                text: 'Expiry Date',
                                                cls: 'header_label_content'
                                            },
                                            {
                                                xtype: 'datefield',
                                                name: 'expiry_date',
                                                minValue: new Date(),
                                                margin: '10 0 0 0',
                                                width: 400,
                                                itemId: 'guest_user_expiry_date',
                                                allowBlank: true,
                                                format: "d/m/Y",
                                                value: this.expiry_date ? this.expiry_date : new Date()
                                            }
                                        ]
                                    }
                                ]
                            },]
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
                                        itemId: "btn_save_guest_user",
                                        text: "Save",
                                        handler: 'saveGuestUser',
										cls: 'btn'
                        			},
                        			{
                                        xtype: 'button',
                                        margin: '0 0 0 20',
                                        text: 'Cancel',
                                        handler: 'cancelGuestUser',
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