Ext.define('CaptivePortal.view.roles.AddOrEditRole', {
  extend: 'Ext.panel.Panel',
  requires: [
        'CaptivePortal.view.roles.RoleController',
        'CaptivePortal.store.role.Role'
    ],
  alias: 'widget.roles_addrole',
  controller: 'roles',
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
                padding: '20 0 0 0',
                cls: 'form_trigger',
                items: [{
                        xtype: 'form',
                        itemId: 'roleform',
                        defaults: {
                            width: 400,
                            height: 30,
                            padding: '10 0 15 0',
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
									cls:'header_label_content'
								},{
									xtype:'textfield',
									allowBlank:false,
									maxLength:50,
									width:300,
									name:'role_name',
									itemId:'role_name',
									value:this.role_name ? this.role_name : ''
								},{
                                xtype: 'label',
                                reference:'lab_permittedroles',
                                text: 'Permitted User Roles',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'container',
                                reference:'con_permittedroles',
                                width: '100%',
                                //height: '100%',
                                height:400,
                                layout: 'fit',
                                margin: '0 30 0 0',
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
														cls: 'table-row',
														renderer: function(value, metaData, rec, view){
															metaData.tdAttr='data-qtip="' + rec.data.name + '" ';
															return rec.data.name;
														}
													},
													{
														header:'Read', 
														dataIndex:'read', 
														width:'20%',
														cls: 'table-row',
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
														header:'Write', 
														dataIndex:'write', 
														width:'20%',
														cls: 'table-row',
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
		                                layout: 'hbox',
		                                width: '100%',
		                                height: 50,
		                                items: [
		                                    {
		                                        xtype: 'button',
		                                        reference:'btn_save',
		                                        formBind: true,
		                                        itemId: "btn_saveRole",
		                                        text: btnText,
		                                        handler: 'saveRole',
		                                        cls: 'btn'
		                                    },
		                                    {
		                                        xtype: 'button',
		                                        margin: '0 0 0 20',
		                                        text: 'Cancel',
		                                        cls: 'btn btn-cancel',
		                                        handler: 'cancelRole'

		                                    }
		                                ]
		                              }]
            					}]
            	}];
        this.callParent();
  }
});
