Ext.define("CaptivePortal.view.editor.ThemeCol4",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.theme_col_4',
	width: '100%',
    height: 200,
    layout: "hbox",
    resizable: true,
    resizeHandles: 'n s',
    defaults: {
        ddGroup: "widgetGroup",
        width: "50%",
        flex: 1
    },
     items: [
        {
            xtype: "dropPanel",
            cls: "dropPanel",
            height: '100%',
            margin: 5
        },
        {
            xtype: "dropPanel",
            cls: "dropPanel",
            height: '100%',
            margin: 5
        },
        {
            xtype: "dropPanel",
            cls: "dropPanel",
            height: '100%',
            margin: 5
        },
        {
            xtype: "dropPanel",
            cls: "dropPanel",
            height: '100%',
            margin: 5
        }
    ]
});