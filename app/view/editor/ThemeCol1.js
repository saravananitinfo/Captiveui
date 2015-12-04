Ext.define("CaptivePortal.view.editor.ThemeCol1",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.theme_col_1',
	width: '100%',
    height: 200,
    layout: "vbox",
    resizable: true,
    resizeHandles: 'n s',
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
        width: "100%",
        flex: 1
    },
    items: [{
        xtype: "dropPanel",
        cls: "dropPanel",
        margin: 5,
        reference: "theme_col_1_0"
        // listeners: {
        //    'render': function(panel) {
        //        panel.body.on('click', function() {
        //             var me = this
        //             var panel = new Ext.panel.Panel({
        //                 title: 'HTML Editor',
        //                 floating: true,
        //                 closable : true,
        //                 width: 473,
        //                 // height: 220,
        //                 default: '',
        //                 frame: true,
        //                 layout: 'fit',
        //                 items: [{
        //                     xtype: 'button',
        //                     margin: '10 0 0 0',
        //                     text: 'Save HTML Contents',
        //                     handler: function() {
        //                         me.el.setHtml(panel.items.getAt(1).getValue());
        //                         panel.close();
        //                     }
        //                 },{
        //                     xtype: 'htmleditor',
        //                     enableColors: true,
        //                     enableAlignments: true,
        //                     enableLists: true,
        //                     enableSourceEdit: true
        //                 }]
        //             });
        //             panel.items.getAt(1).setValue(this.el.getHtml());
        //             panel.show();
        //             panel.center();
        //        });
        //     }
        // }
    }]
});