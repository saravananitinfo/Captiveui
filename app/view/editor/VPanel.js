Ext.define("CaptivePortal.view.editor.VPanel",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.v_panel',
	verticle_divide: true,
    height: '100%',
    margin: 5,
    cls: "dropPanel dpanel",  
    layout: 'vbox',
    defaults: {
        ddGroup: "widgetGroup",
        flex: 1,
        width: '100%',
        height: '50%'
    },
    bodyStyle: "background: transparent",
    items:[
    	{
	        xtype: "dropPanel",
	        cls: "dropPanel"
    	},
	    {
	        xtype: "dropPanel",
	        cls: "dropPanel"
	    }
    ]
});
