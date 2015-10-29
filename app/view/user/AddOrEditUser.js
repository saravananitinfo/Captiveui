Ext.define('CaptivePortal.view.user.AddOrEditUser', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.user.UserController'
    ],	
    xtype: 'widget.user.AddOrEditUser',
    controller: 'users',	  
	padding:0,
	height:'100%',
	width:'100%',
	bodyCls:'custom_bg_background',
	layout:'vbox',
	//autoScroll:true,
	initComponent:function(){
				var tenantStore = Ext.create('Ext.data.Store',{
			fields:['id', 'name'],
			data : this.tenantData || []
		});
		var siteStore = Ext.create('Ext.data.Store',{
			fields:['id', 'name'],
			data : this.sites || []
		});
		var roleStore = Ext.create('Ext.data.Store',{
			fields:['id', 'name'],
			data : this.roleData || []
		});
		var permissionStore = Ext.create('Ext.data.Store',{ 
		model:'CaptivePortal.model.role.RoleAccess',
		data: this.permissions || []
		});
		
		var userText = (this.user_id) ? 'Edit User' : 'New User';
		var btnText = (this.user_id) ? 'Update' : 'Create';
		this.items = [{
						xtype:'container',
						autoEl: {
								tag: 'div'	
							},
						cls:'heading_color',
						height:5,	
						width:60						
					},{
						xtype:'label',
						text:userText,
						cls:'header_label header_label_content'
					},{
						xtype:'panel',
						autoScroll:true,
						topPanel:true,
						cls:'custom_toolbar',
						width:'100%',
						items:[{
								xtype:'form',
								itemId:'userform',
								defaults:{
									width:400,
									maxLength:50
								},
								items:[{
							xtype: 'hiddenfield',name:'user_id',
							value: this.user_id
						},{
									xtype:'label',
									text:'Name',
									//padding:'20 0 0 0',
									margin:'0 0 0 20',
									cls:'header_label_content'
								},{
									xtype:'textfield',
									margin:'0 0 0 20',									
									name:'name',
									itemId:'user_name',
									allowBlank:false,
									//readOnly:(this.user_id) ? true:false
								},{
									xtype:'label',
									text:'Email',
									//padding:'20 0 0 0',
									margin:'0 0 0 20',
									cls:'header_label_content'
								},{
									xtype:'textfield',
									margin:'0 0 0 20',									
									name:'email',
									itemId:'email',
									vtype:'email',
									readOnly:(this.user_id) ? true:false
								},{
									xtype:'label',
									text:'Tenant',
									//padding:'20 0 0 0',
									margin:'0 0 0 20',
									cls:'header_label_content'
								},{
									xtype:'combobox',
									margin:'0 0 0 20',
									name:'tenant_id',
									queryMode: 'local',
									itemId:'tenant',
									valueField:'id',
									displayField: 'name',
									store:tenantStore,
									listeners:{
										'select':'selectTenant'
									}
								},{
									xtype:'label',
									text:'Sites',
									//padding:'20 0 0 0',
									margin:'0 0 0 20',
									cls:'header_label_content'
								},{
									xtype:'tagfield',
									margin:'0 0 0 20',
									queryMode: 'local',
									multiSelect:true,
									name:'site_ids',
									itemId:'site',
									valueField:'id',
									displayField: 'name',
									store:siteStore,
									filterPickList:true
								},{
									xtype:'label',
									text:'Role',
									//padding:'20 0 0 0',
									margin:'0 0 0 20',
									cls:'header_label_content'
								},{
									xtype:'combobox',
									margin:'0 0 0 20',
									name:'site_role_id',
									itemId:'role',
									queryMode: 'local',
									valueField:'id',
									displayField: 'name',
									store:roleStore,
									listeners:{
										'select':'selectRole'
									}
								},{
									xtype:'label',
									text:'Access Status',
									//padding:'20 0 0 0',
									margin:'0 0 0 20',
									cls:'header_label_content'
								},{
									xtype      : 'container',
									margin:'0 0 0 20',
									defaultType: 'radiofield',
									defaults: {
										width:100
									},
									layout: 'hbox',
									items: [
										{
											boxLabel  : 'Enable',
											name      : 'status',
											inputValue: 'enable',
											id        : 'user_enable',
											checked:true
										}, {
											boxLabel  : 'Disable',
											name      : 'status',
											inputValue: 'disable',
											id        : 'user_disable'
										}
									]
								},{
									xtype:'label',
									margin:'0 0 0 20',
									text:'Permitted User Roles',
									cls:'header_label_content'
								},{
									 xtype:'container',
									 width:'100%',
									 height:'100%',
									 layout:'fit',
									 margin:'0 20 0 20',
									 items:[{
										xtype: 'grid',
										itemId:'permission_user_role_grid',
										border:1,
										style:'z-index:1000;',
										autoScroll:true,
										columns:[
										{
											header:'Access', 
											dataIndex:'access_for', 
											width:'79.9%',
											renderer: function(value, metaData, rec, view){
												metaData.tdAttr='data-qtip="' + value + '" ';
												return value;
											}
										},
										{
											header:'Permission', 
											dataIndex:'permission', 
											width:'20%',
											renderer: function(value, metaData, rec, view){
												if(value){
													value = '<input type="checkbox" checked action="permission"/>';
												} else {
													value = '<input type="checkbox" action="permission"/>';
												}
												return value;
											}
										}
										],
										listeners:{
											itemclick: 'permissionRowClick'
										},
										
										store:permissionStore,
							
						}]
						}
								]
							},
							{
								xtype:'container',
								margin:20,
								layout:'hbox',
								width:'100%',
								height:30,
								items:[
								{
									xtype:'button',
									text:btnText,
									handler:'saveUser'
								},
								{
									xtype:'button',
									margin:'0 0 0 20',
									text:'Cancel',
									handler:'cancelUser'
								}
								]
							}]
					}];
					this.callParent();
	}
	
});
