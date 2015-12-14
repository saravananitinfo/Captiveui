Ext.define("CaptivePortal.view.editor.ThemeCol3",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.theme_col_3',
	width: '100%',
    height: 200,
    layout: "hbox",
    resizable: true,
    resizeHandles: 'n s',
    bodyStyle: "background: transparent;",
    // dockedItems: [
    //     {
    //         xtype: 'panel',
    //         cls: 'sort_item',
    //         height: 20,
    //         html: 'drag'
    //     }
    // ],
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
        }
    ]
});