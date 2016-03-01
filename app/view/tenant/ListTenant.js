Ext.define('CaptivePortal.view.tenant.ListTenant', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.tenant.TenantController',
		'CaptivePortal.store.tenant.Tenant'
    ],	
    xtype: 'widget.role.ListTenant',
    controller: 'tenant',	  
	padding:0,
	height:'100%',
	width:'100%',
	bodyCls:'custom_bg_background',
	layout:'vbox',
	initComponent:function(){
	var store = Ext.create('CaptivePortal.store.tenant.Tenant',{ 
							data:[]
							});
		this.items = [{
						xtype:'container',
						autoEl: {
								tag: 'div'	
							},
						cls:'heading_color',
						height:5,	
						width:50						
					},{
						xtype:'label',
						text:'Tenant',
						cls:'header_label header_label_content'
					},{
						xtype:'panel',
						autoScroll:true,
						topPanel:true,
						cls:'custom_toolbar',
						width:'100%',
						items:[{
						xtype:'form',
						items:[{
							xtype:'label',
							text:'Tenants',
							allowBlank:false,
							//padding:'20 0 0 0',
							margin:'0 0 0 20',
							cls:'header_label_content'
						},{
						 xtype:'container',
						 width:'90%',
						 height:'100%',
						 margin:'0 20 0 20',
						 layout:'fit',
						 items:[{
							xtype: 'grid',
							itemId:'tenants_grid',
							border:1,
							style:'z-index:1000;',
							autoScroll:true,
							height:'100%',
							width:'90%',
							//height:100,
							listeners: {
              				  itemclick: 'userItemClick'
            				},
							columns:[
							{
								header:'Tenant Name', 
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
								text:'Add Tenant',
								cls:'logout_button',
								handler:'createTenants'
							}
							],
							store:store,
							listeners:{
								itemclick: 'editTenantItemClick',
								render:'loadTenants'
								
							}
						}]
						}]
						}]
					}];
					this.callParent();
	}
	
});
