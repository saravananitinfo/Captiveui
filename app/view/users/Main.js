Ext.define('CaptivePortal.view.users.Main',{
	extend:'Ext.Panel',
	requires:['CaptivePortal.view.users.UserList'],
	alias:'widget.usermain',
	height:'100%',
	width:'100%',
	layout:'card',		
	initComponent:function(){
	  this.items=[{
			xtype:'userlist',			
			itemId:'card_adduser'
	}]
	this.callParent(arguments);
	}
})

