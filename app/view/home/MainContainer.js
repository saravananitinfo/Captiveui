Ext.define('CaptivePortal.view.home.MainContainer',{
	extend:'Ext.Container',
	alias:'widget.maincontainer',
	layout:'card',	
	initComponent:function(){
	this.items = [{
		xtype:'usermain'
	}]
	this.callParent(arguments);
	}
})