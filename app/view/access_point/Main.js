Ext.define('CaptivePortal.view.access_point.Main',{
	extend:'Ext.Panel',
	alias:'widget.access_pointmain',
	requires:[
		'CaptivePortal.view.access_point.MainController',
		'CaptivePortal.view.access_point.AddAccessPoint'
	],
	controller: 'access_point_main_controller',
	height:'100%',
	width:'100%',
	layout:'card',
	initComponent: function () {
    	this.items = [
    		{
    			xtype: 'add_access_point_view',
    			reference: 'card_add_access_point_view',
    			itemId: 'add_access_point_view'
    		}
      	]
        this.callParent(arguments);
	}
});