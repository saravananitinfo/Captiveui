Ext.define('CaptivePortal.view.role.ListRole', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.role.RoleController',
		'CaptivePortal.store.role.Role'
    ],	
    xtype: 'widget.role.ListRole',
    controller: 'role',	  
	padding:0,
	height:'100%',
	width:'100%',
	bodyCls:'custom_bg_background',
	layout:'vbox',
	initComponent:function(){
	var store = Ext.create('CaptivePortal.store.role.Role',{ 
							data:[]
							});
		this.items = [{
						xtype:'container',
						autoEl: {
								tag: 'div'	
							},
						cls:'heading_color',
						height:5,	
						width:105						
					},{
						xtype:'label',
						text:'Role Templates',
						cls:'header_label header_label_content'
					},{
						xtype:'panel',
						cls:'custom_toolbar',
						autoScroll:true,
						topPanel:true,
						width:'100%',
						items:[{
						xtype:'form',
						items:[{
							xtype:'label',
							text:'Roles',
							allowBlank:false,
							//padding:'20 0 0 0',
							margin:'0 0 0 20',
							cls:'header_label_content'
						},{
						 xtype:'container',
						 width:'100%',
						 height:'100%',
						 margin:20,
						 layout:'fit',
						 items:[{
							xtype: 'grid',
							itemId:'roles_grid',
							border:1,
							style:'z-index:1000;',
							//autoScroll:true,
							height:'100%',
							//height:250,
							columns:[
							{
								header:'Name', 
								dataIndex:'name', 
								width:'79.9%',
								renderer: function(value, metaData, rec, view){
									metaData.tdAttr='data-qtip="' + value + '" ';
									return value;
								}
							},
							{
								header:'Action',
								renderer: function(value, metaData, rec, view){
									return '<div action="edit" class="edit-icon"></div><div action="delete" class="del-icon"></div>';
								},
								width:'20%'
							}
							
							],
							tbar:[ '->',
							{
								xtype:'button',
								text:'Add Roles',
								cls:'logout_button',
								handler:'createRoles'
							}
							],
							store:store,
							listeners:{
								render:'getRoles',
								itemclick: 'editroleitem'
							}
						}]
						}]
						}]
					}];
					this.callParent();
	}
	
});
