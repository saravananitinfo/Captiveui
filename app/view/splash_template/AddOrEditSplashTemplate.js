Ext.define('CaptivePortal.view.splash_template.AddOrEditSplashTemplate',{
	extend: 'Ext.panel.Panel',
	requires: [
        'CaptivePortal.view.splash_template.SplashTemplateController'
	],
	alias: 'widget.splash_template_add_edit',
	controller: 'splash_template',
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
                // padding: '15 0 0 0',
                bodyCls: 'form_panel',
                cls: 'form_trigger',
                items: [
        			{
                		xtype: 'form',
                		itemId: 'splashTemplateForm',
                		defaults: {
                    		width: 400,
                    		height: 30,
                    		padding: '10 0 15 0',
                    		maxLength: 50,
                		},
                		items: [
        					{
                				xtype: 'hiddenfield', 
                				name: 'splash_template_id',
                				itemId: 'splash_template_id',
                				reference:'hf_splash_template_id',
                                value: this.splash_template_id ? this.splash_template_id : ''
               
            				},
                            {
                                xtype: 'hiddenfield', 
                                name: 'if_admin_template',
                                itemId: 'if_admin_template',
                                reference:'if_admin_template',
                                value: this.if_admin_template ? this.if_admin_template : ''
               
                            },
            				{
                				xtype: 'label',
                				text: 'Name',
                				cls: 'header_label_content'
            				},
            				{
                                xtype: 'textfield',
                                name: 'name',
                                itemId: 'splash_template_name',
                                allowBlank: false,
                                emptyText: "Template Name",
                                value: this.name ? this.name : ''
                            },
                            {
                                xtype:'label',
                                text:'Category',                            
                                cls:'header_label_content'
                             },{
                                xtype:'combo',                                          
                                allowBlank: false,
                                name:'category',
                                itemId: 'splash_template_form-category',
                                queryMode: 'local',                                           
                                forceSelection:true,
                                valueField: 'id',
                                displayField: 'name',
                                emptyText: 'Select Category',
                            },
                            {
                                xtype: 'label',
                                text: 'Site / Group',
                                cls: 'header_label_content',
                                hidden:CaptivePortal.app.getUserRole() == 'super_admin'
                            }, {
                                xtype: 'combo',
                                queryMode: 'local',
                                name: 'associated_resource',
                                itemId: 'site_combo',
                                forceSelection:true,
                                valueField: 'id',
                                displayField: 'name',
                                emptyText: 'Select Site / Group',
                                store: CaptivePortal.util.Utility.getEmptySiteStore(),
                                hidden:CaptivePortal.app.getUserRole() == 'super_admin',
                                allowBlank: false,
                                listConfig:{
                                    getInnerTpl:CaptivePortal.util.Utility.getSiteTemplateIcon
                                },
                                listeners:{
                                    select:CaptivePortal.util.Utility.getSiteAndTagDetails
                                },margin:'0 0 0 0'
                            },
                            {
                                xtype: 'label',
                                text: 'Status',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'container',
                                defaultType: 'radiofield',
                                defaults: {
                                    width: 100
                                },
                                margin: '0 0 20 0',
                                layout: 'hbox',
                                items: [
                                    {
                                        boxLabel: 'Draft',
                                        name: 'status',
                                        inputValue: 'drafted',
                                        checked: true
                                    }, {
                                        boxLabel: 'Publish',
                                        name: 'status',
                                        inputValue: 'published'
                                    }
                                ]
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
                                        itemId: "btn_saveSplashTemplate",
                                        text: "Save",
                                        handler: 'saveSplashTemplateForm',
										cls: 'btn'
                        			},
                        			{
                                        xtype: 'button',
                                        margin: '0 0 0 20',
                                        text: 'Cancel',
                                        handler: 'cancelSplashTemplate',
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
	},
    listeners: {
        afterrender: function(panel) {
            if(CaptivePortal.app.getUserRole() == 'super_admin'){
                var combo = panel.down('#site_combo');
                Ext.apply(combo, {allowBlank: true}, {});
            }
        }
    }
});
