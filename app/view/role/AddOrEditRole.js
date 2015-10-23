Ext.define('CaptivePortal.view.role.AddOrEditRole', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.role.RoleController'
    ],	
    xtype: 'widget.role.AddOrEditRole',
    controller: 'role',	  
	padding:0,
	height:'100%',
	width:'100%',
	bodyCls:'custom_bg_background',
	layout:'vbox',
	initComponent:function(){
	var btnText = this.role_id ? 'Update' :'Create';
	var title = this.role_id ? 'Edit Role' :'New Role';
	var store = Ext.create('CaptivePortal.store.role.RoleAccess',{ 
	data:this.role_access
	});
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
						text:title,
						cls:'header_label header_label_content'
					},{
						xtype:'panel',
						autoScroll:true,
						topPanel:true,
						width:'100%',
						cls:'custom_toolbar',
						items:[{
						xtype:'form',
						items:[{
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
							name:'role',
							itemId:'role_name',
							value:this.role_name ? this.role_name : ''
						},{
							xtype: 'hiddenfield',
							name: 'role_id',
							itemId:'role_id',
							value: this.role_id
						},{
							xtype:'label',
							margin:'0 0 0 20',
							text:'Access Permission',
							cls:'header_label_content'
						},{
						 xtype:'container',
						 width:'100%',
						 height:'100%',
						 margin:'0 20 0 20',
						 layout:'fit',
						 items:[{
							xtype: 'grid',
							itemId:'role_def_grid',
							border:1,
							style:'z-index:1000;',
							//autoScroll:true,
							height:'100%',
							width:'90%',
							columns:[
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
							store:store,
							listeners: {
								render:'createNewRole',
								itemclick: 'permissionRowClick'
							}
						}]
						}]
						},{
						xtype:'container',
						margin:20,
						layout:'hbox',
						width:'100%',
						height:30,
						items:[
						{
							xtype:'button',
							text:btnText,
							itemId:'saveRole',
							handler:'saveRole'
						},
						{
							xtype:'button',
							margin:'0 0 0 20',
							text:'Cancel',
							handler:'cancelRole'
						}
						]
					}]
					}];
					this.callParent();
	}
	
});
