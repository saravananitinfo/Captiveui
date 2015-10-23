Ext.define('CaptivePortal.view.roles.RoleList',{
	extend:'Ext.Panel',
	requires:['CaptivePortal.view.roles.RoleController','CaptivePortal.store.role.Role'],
	alias:'widget.rolelist',
	controller:'rolelistcontroller',
	border:true,
	layout:'fit',
	bodyPadding:30,			
	dockedItems:[{
			xtype:'toolbar',
			padding:'30 30 0 30',			
			dock:'top',
			items:[{
					xtype:'searchfield'
			},{
				xtype:'tbfill'
			},{
				xtype:'button',
				text:'Add User'
			},{
				xtype:'button',
				text:'Export'
			}]
	}],
	listeners:{
		render:'getRoles'
	},		
	items:[{
			xtype:'gridpanel',			
			reference:'grd_rolelist',
			style:'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
			store:'CaptivePortal.store.role.Role',
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
									return '<div action="edit" class="edit-icon"></div>&nbsp;&nbsp;<div action="delete" class="del-icon"></div>';
								},
								width:'20%'
							}
							
							]						
							
							
						
					
	}]	
})