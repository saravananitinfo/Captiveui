Ext.define('CaptivePortal.view.roles.AddOrEditRole', {
  extend: 'Ext.panel.Panel',
  requires: [
        'CaptivePortal.view.roles.RoleController',
        'CaptivePortal.store.role.Role'
    ],
  alias: 'widget.roles_addrole',
  controller: 'rolelistcontroller',
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
	                              xtype: 'hiddenfield',
								  name: 'role_id',
								  itemId:'role_id',
								  value: this.role_id
			                     },{
									xtype:'label',
									text:'Role Name',							
									//padding:'20 0 0 0',
									margin:'0 0 0 20',
									cls:'header_label_content'
								},{
									xtype:'textfield',
									allowBlank:false,
									margin:'0 0 0 20',
									maxLength:50,
									width:300,
									name:'role_name',
									itemId:'role_name',
									value:this.role_name ? this.role_name : ''
								},{
                                xtype: 'label',
                                reference:'lab_permittedroles',
                                text: 'Permitted User Roles',
                                
                                margin: '20 0 0 0',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'container',
                                reference:'con_permittedroles',
                                width: '100%',
                                //height: '100%',
                                height:400,
                                layout: 'fit',
                                margin: '0 20 0 20',
                                items: [{
                                        xtype: 'grid',
                                        itemId: 'permission_user_role_grid',
                                        reference:'grd_permittedusers',
                                        border: 1,
                                        style: 'z-index:1000;',
                                        autoScroll: true,
                                        columns: [
                                          		  {
														header:'Access', 
														dataIndex:'access_for', 
														width:'59.9%',
														renderer: function(value, metaData, rec, view){
															metaData.tdAttr='data-qtip="' + value + '" ';
															return value;
														}
													},
													{
														header:'Read', 
														dataIndex:'read', 
														width:'20%',
														renderer: function(value, metaData, rec, view){
															if(value){
																value = '<input type="checkbox" checked action="read"/>';
															} else {
																value = '<input type="checkbox" action="read"/>';
															}
															return value;
														}
													},
													{
														header:'Wrie', 
														dataIndex:'write', 
														width:'20%',
														renderer: function(value, metaData, rec, view){
															if(value){
																value = '<input type="checkbox" checked action="write"/>';
															} else {
																value = '<input type="checkbox" action="write"/>';
															}
															return value;
														}
													}
                                        		],
                                        listeners: {
                                            itemclick: 'permissionRowClick'
                                        },
                                        store: 'CaptivePortal.store.role.RoleAccess',
                                    }]
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
		                                        handler: 'saveRole'
		                                    },
		                                    {
		                                        xtype: 'button',
		                                        margin: '0 0 0 20',
		                                        text: 'Cancel',
		                                        handler: 'cancelRole'
		                                    }
		                                ]
		                              }]
            					}]
            	}];
        this.callParent();
  }
});
