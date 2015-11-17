Ext.define('CaptivePortal.view.access_point.Main',{
	extend:'Ext.Panel',
	alias:'widget.access_pointmain',
	requires:[
		'CaptivePortal.view.access_point.MainController',
		'CaptivePortal.view.access_point.AccessPointList',
		'CaptivePortal.view.access_point.AddAccessPoint',
		'CaptivePortal.view.access_point.EditAccessPoint'
	],
	controller: 'access_point_main_controller',
	height:'100%',
	width:'100%',
	layout:'card',
	initComponent: function () {
    	this.items = [
    	    {
    	    	xtype: 'access_point_list',
    	    	reference: 'card_access_point_list_view',
    			itemId: 'access_point_list_view'
    	    },
    		{
    			xtype: 'add_access_point_view',
    			reference: 'card_add_access_point_view',
    			itemId: 'add_access_point_view'
    		},
    		{
    			xtype: 'edit_access_point',
    			reference: 'card_edit_access_point_view',
    			itemId: 'edit_access_point_view'
    		}
      	]
        this.callParent(arguments);
	}
});