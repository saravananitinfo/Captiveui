Ext.define('CaptivePortal.view.tenants.AddOrEditTenant', {
  extend: 'Ext.panel.Panel',
  requires: [
        'CaptivePortal.view.tenants.TenantController',
        'CaptivePortal.store.users.TenantList'
    ],
  alias: 'widget.tenants_addedit',
  controller: 'tenants',
  padding: 0,
  height: 100,
  scrollable: true,
  width: '100%',
	layout: {
	    type: 'vbox',
	    padding: '10 0 0 30'
	},
  initComponent: function () {
    		var userText = (this.user_id) ? 'Edit Tenant' : 'New Tenant';
        var btnText = (this.user_id) ? 'Update' : 'Create';
        this.items = [{
                xtype: 'panel',
                width: '100%',
                items: [{
                        xtype: 'form',
                        itemId: 'userform',
                        defaults: {
                            width: 400,
                            height: 30,
                            padding: 20,
                            maxLength: 50
                        },
                        items: [{
	                                xtype: 'hiddenfield', name: 'tenant_id',
	                                value: this.tenant_id
			                            },{
																		xtype:'label',
																		text:'Tenant Name',							
																		//padding:'20 0 0 0',
																		margin:'0 0 0 20',
																		cls:'header_label_content'
																	},{
																		xtype:'textfield',
																		allowBlank:false,
																		margin:'0 0 0 20',
																		maxLength:50,
																		width:300,
																		name:'tenant_name',
																		itemId:'tenant_name',
																		value:this.tenant_name ? this.tenant_name : ''
																	},{
																		xtype: 'hiddenfield',
																		name: 'tenant_id',
																		itemId:'tenant_id',
																		value: this.tenant_id
															    },{
		                                xtype: 'container',
		                                margin: 20,
		                                layout: 'hbox',
		                                width: '100%',
		                                height: 50,
		                                items: [
		                                    {
		                                        xtype: 'button',
		                                        formBind: true,
		                                        text: btnText,
		                                        handler: 'saveTenant'
		                                    },
		                                    {
		                                        xtype: 'button',
		                                        margin: '0 0 0 20',
		                                        text: 'Cancel',
		                                        handler: 'cancelTenant'
		                                    }
		                                ]
		                              }]
            					}]
            	}];
        this.callParent();
  }
});