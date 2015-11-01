Ext.define('CaptivePortal.view.roles.Main',{
	extend:'Ext.container.Container',
	requires:['CaptivePortal.view.roles.RoleList','CaptivePortal.view.roles.MainController', 'CaptivePortal.view.roles.AddOrEditRole'],
	alias:'widget.rolemain',
	controller: 'roles_maincontroller',
	layout:'card',
	height:'100%',
	width:'100%',
	items:[{
		xtype:'rolelist',
		itemId: 'card_rolelist'
	}, {xtype: 'roles_addrole', itemId: 'card_addrole'}]
})