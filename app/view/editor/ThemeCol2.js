Ext.define("CaptivePortal.view.editor.ThemeCol2",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.theme_col_2',
	width: '100%',
    height: 200,
    layout: "hbox",
    resizable: {
        // listeners: {
        //     resize: function(ths, width, height, e, eOpts ){
        //         window.abc = ths;
        //         console.log(ths.down('.button_widget').id);
        //         Ext.ComponentQuery.query("#"+ths.down('.button_widget').id)[0].down('.button_widget').body.elapplyStyles('top: 0px;height: 100%;');
                
        //     }
        // }
    },
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
        }
    ]
});