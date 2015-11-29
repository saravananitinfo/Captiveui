Ext.define('CaptivePortal.view.template_mgmt.TemplateMgmtAddorEdit', {
  extend: 'Ext.panel.Panel',
  requires: ['CaptivePortal.view.template_mgmt.TemplateMgmtController'],
  alias: 'widget.template_mgmt_add_or_edit',
  controller: 'template_mgmt_edit',
  padding: 0,
  height: 100,
  autoScroll:true,
  itemIdPrefix:'template_mgmt_form-',
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
			                        itemId: this.itemIdPrefix + 'form',
			                        defaults: {
			                            width: 700,                        
			                            padding: '10 0 15 0',
			                            maxLength: 50
			                        },
			                        items: [
			                        		{
				                              xtype: 'hiddenfield',
											  name: 'id',
											  itemId:'id'
						                     },{
				                              xtype: 'hiddenfield',
											  name: 'tenant_id',
											  itemId:'tenant_id'
						                     },{
												xtype:'label',
												text:'Name',							
												cls:'header_label_content'
											 },{
												xtype:'textfield',
												allowBlank:false,
												maxLength:50,
												name:'name',
												itemId:this.itemIdPrefix + 'name'
											},{
												xtype:'label',
												text:'Category',							
												cls:'header_label_content'
											 },{
												xtype:'textfield',
												maxLength:100,												
				                                allowBlank: false,
												name:'category',
												itemId:this.itemIdPrefix + 'category'
											}, {
				                                xtype: 'label',
				                                text: 'Site',
				                                cls: 'header_label_content'
				                            }, {
				                                xtype: 'combo',
				                                queryMode: 'local',
				                                allowBlank: false,
				                                name: 'site_id',
				                                itemId: 'site_combo',
				                                forceSelection:true,
				                                valueField: 'id',
				                                displayField: 'name',
				                                emptyText: 'Select Sites',
				                                store: 'CaptivePortal.store.users.Site',
				                                filterPickList: true
			                            	},{
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
				                                        boxLabel: 'Default',
				                                        name: 'status',
				                                        inputValue: 'default',
				                                        checked: true
				                                    }, {
				                                        boxLabel: 'Publish',
				                                        name: 'status',
				                                        inputValue: 'published'
				                                    }
				                                ]
				                            }, {
				                            	xtype: 'tabpanel',
				                                margin: '0 0 20 0',
				                                width: '90%',
											    height: 350,
											    activeTab: 0,
											    border:5,
				                                items: [
				                                    {
				                                        title:'Splash Page',
				                                        margin:'0 10 0 0',
				                                        padding:15,
				                                        cls :'customTab header_label_content',
				                                        border:5,
				                                        items:[{
				                                        	xtype:'container',
				                                        	margin:15,
				                                        	layout:'vbox',
			                                        		items:[{
										                        xtype: 'image',
										                        src: 'custom/css/images/Splash_page.png',
										                        margin:'0',
										                        height:155
										                    }]
				                                        	
				                                        }]
				                                    }, {
				                                        title:'Custom Terms',
				                                        margin:'0 10 0 0',
				                                        padding:15,
				                                        componentCls :'customTab',
				                                        border:5,
				                                        layout:'vbox',
			                                        	items:[{
					                                        	xtype:'label',
					                                        	text:'Specify new terms name',
					                                        	cls:'header_label_content',
					                                        	margin: '10 0 0 0'
					                                        },{
																xtype:'textfield',
																margin: '10 0 20 0',
																allowBlank:false,
																 width: 680,  
																maxLength:100,
																name:'tnc_name'
															},{
					                                        	xtype:'label',
					                                        	text:'Specify your terms link text',
					                                        	cls:'header_label_content',
					                                        	margin: '0 0 0 0'
					                                        },{
																xtype:'textfield',
																margin: '10 0 20 0',
																allowBlank:false,
																 width: 680,  
																maxLength:100,
																name:'tnc_link'
															},{
					                                        	xtype:'label',
					                                        	margin: '0 0 0 0',
					                                        	cls:'header_label_content',
					                                        	text:'Copy & Paste your terms text here'
					                                        },{
																xtype:'textareafield',
																margin: '10 0 20 0',
																allowBlank:false,
																 width: 680,  
																maxLength:100,
																name:'tnc'
															}
			                                        	]
				                                    },{
				                                        title:'Privacy Policy',
				                                        margin:'0 10 0 0',
				                                        padding:15,
				                                        componentCls :'customTab',
				                                        border:5,
				                                        layout:'vbox',
			                                        	items:[{
					                                        	xtype:'label',
					                                        	text:'Specify new privacy policy name',
					                                        	cls:'header_label_content',
					                                        	margin: '10 0 0 0'
					                                        },{
																xtype:'textfield',
																maxLength:100,																
																margin: '10 0 20 0',
																allowBlank:false,
																 width: 680,  
																name:'privacy_policies_name'
															},{
					                                        	xtype:'label',
					                                        	text:'Specify your privacy policy link text',
					                                        	cls:'header_label_content',
					                                        	margin: '0 0 0 0'
					                                        },{
																xtype:'textfield',
																maxLength:100,
																margin: '10 0 20 0',
																allowBlank:false,
																 width: 680,  
																name:'privacy_policies_link'
															},{
					                                        	xtype:'label',
					                                        	text:'Copy & Paste your privacy policy text here',
					                                        	margin: '0 0 0 0',
					                                        	cls:'header_label_content',
					                                        },{
																xtype:'textareafield',
																maxLength:100,
																margin: '10 0 20 0',
																allowBlank:false,
																 width: 680,  
																name:'privacy_policies'
															}
			                                        	]
				                                    }, {
				                                        title:'Redirects',
				                                        margin:'0 10 0 0',
				                                        padding:15,
				                                        componentCls :'customTab',
				                                        border:5,
				                                        layout:'vbox',
			                                        	items:[{
					                                        	xtype:'label',
					                                        	text:'Success URL',
					                                        	cls:'header_label_content',
					                                        	margin: '10 0 0 0'
					                                        },{
																xtype:'textfield',
																maxLength:300,
																margin: '10 0 20 0',
																allowBlank:false,
																 width: 680,  
																name:'default_success_url'
															},{
					                                        	xtype:'label',
					                                        	text:'Error URL',
					                                        	cls:'header_label_content',
					                                        	margin: '0 0 0 0'
					                                        },{
																xtype:'textfield',
																margin: '10 0 20 0',
																maxLength:300,
																allowBlank:false,
																 width: 680,  
																name:'default_error_url'
															}
			                                        	]
				                                    }
				                                ]
				                            },{
			                                xtype: 'container',
			                                layout: 'hbox',
			                                width: '100%',
			                                height: 50,
			                                items: [
			                                    {
			                                        xtype: 'button',
			                                        formBind: true,
			                                        text: 'Create',
			                                        itemId:'btn_addtemplate',
			                                        handler: 'saveTemplate',
			                                        cls: 'btn'
			                                    },
			                                    {
			                                        xtype: 'button',
			                                        margin: '0 0 0 20',
			                                        text: 'Cancel',
			                                        cls: 'btn btn-cancel',
			                                        handler: 'cancelTemplateMgmt'

			                                    }
			                                ]
                        }
										]
											
									},
									
            		]
            	}];
        this.callParent();
  }
});
