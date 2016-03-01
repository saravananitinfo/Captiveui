Ext.define("CaptivePortal.view.editor.TextWidget",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.text_widget',
	width: '100%',
    height: '100%',
    bodyStyle: "background: transparent;",
    header: {
        // hidden: true,
        titlePosition: 0,
        title: 'Text',
        // items:[{
        //     xtype:'button',
        //     text: 'Edit',
        //     handler: function(){
        //         var me = this
        //         pn = me.up().up().items.getAt(0)
        //         var panel = new Ext.panel.Panel({
        //             title: 'HTML Editor',
        //             floating: true,
        //             closable : true,
        //             width: 473,
        //             // height: 220,
        //             default: '',
        //             frame: true,
        //             layout: 'fit',
        //             items: [{
        //                 xtype: 'button',
        //                 margin: '10 0 0 0',
        //                 text: 'Save HTML Contents',
        //                 handler: function() {
        //                     // me.el.setHtml(panel.items.getAt(1).getValue());
        //                     me.up().up().items.getAt(0).setHtml(panel.items.getAt(1).getValue());
        //                     panel.close();
        //                 }
        //             },{
        //                 xtype: 'htmleditor',
        //                 enableColors: true,
        //                 enableAlignments: true,
        //                 enableLists: true,
        //                 enableSourceEdit: true
        //             }]
        //         });
        //         panel.items.getAt(1).setValue(pn.el.getHtml());
        //         panel.show();
        //         panel.center();
                       
        //     }
        // },{
        //     xtype:'button',
        //     text: 'Delete',
        //     margin: '0 0 0 5',
        //     handler: function(){
        //         var theme = this.up().up().up();
        //         var indx = theme.items.indexOf(this.up().up());
        //         theme.remove(this.up().up());
        //         theme.insert(indx,{
        //             xtype: "dropPanel",
        //             cls: "dropPanel",
        //             height: '100%',
        //             margin: 5
        //         });
        //     }
        // }]
    },
    tools: [
        {
            type:'gear',
            handler: function(){
                var me = this
                pn = me.up().up().items.getAt(0)

                // var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0];
                // var panel = editor_settings.down('#editor_setting_panel');
                // panel.removeAll();
                // panel.add({
                //     xtype: 'panel',
                //     title: 'HTML Editor',
                //     closable : true,
                //     layout: 'vbox',
                //     listeners: {
                //     'close': function() {
                //             var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0]
                //             editor_settings.setActiveItem(0)
                //         }
                //     },
                //     items: [{
                //         xtype: 'button',
                //         margin: '10 0 0 0',
                //         text: 'Save HTML Contents',
                //         handler: function() {
                //             // me.el.setHtml(panel.items.getAt(1).getValue());
                //             me.up().up().items.getAt(0).setHtml(this.up().items.getAt(1).getValue());
                //             this.up().close();
                //         }
                //     },{
                //         xtype: 'htmleditor',
                //         width: '100%',
                //         enableColors: true,
                //         enableAlignments: true,
                //         enableLists: true,
                //         enableSourceEdit: true,
                //         value: pn.el.getHtml(),
                //         layout: {
                //             type: 'vbox',
                //             // align: 'left'
                //         }
                //     }]
                // });

                // editor_settings.setActiveItem(1)

                var panel = new Ext.panel.Panel({
                    title: 'HTML Editor',
                    floating: true,
                    closable : true,
                    width: 800,
                    height: 400,
                    default: '',
                    frame: true,
                    layout: 'vbox',
                    items: [{
                        xtype: 'htmleditor',
                        enableColors: true,
                        enableAlignments: true,
                        enableLists: true,
                        enableSourceEdit: true,
                        width: '100%',
                        height: 320
                    },{
                        xtype: 'button',
                        width: '100%',
                        style: {
                            right: 0
                        },
                        text: 'Save HTML Contents',
                        handler: function() {
                            // me.el.setHtml(panel.items.getAt(1).getValue());
                            me.up().up().items.getAt(0).setHtml(panel.items.getAt(0).getValue());
                            panel.close();
                        }
                    }]
                });
                panel.items.getAt(0).setValue(pn.el.getHtml());
                panel.show();
                panel.center();
                       
            }
        },{
            type:'close',
            handler: function(){
                // var theme = this.up().up().up();
                // var indx = theme.items.indexOf(this.up().up());
                // theme.remove(this.up().up());
                // theme.insert(indx,{
                //     xtype: "dropPanel",
                //     cls: "dropPanel",
                //     height: '100%',
                //     margin: 5
                // });

                var theme = Ext.ComponentQuery.query('#'+this.el.up('.dpanel').id)[0];
                var indx = theme.items.indexOf(this.up('text_widget'));
                theme.remove(this.up('text_widget'));
                theme.insert(indx,{
                    xtype: "dropPanel",
                    cls: "dropPanel"
                });
            }
        }
    ],
    border: true,
    initComponent: function(){
        var htm = this.html_str;
        this.items = [
            {
                xtype: 'component',
                itemId: "text_panel",
                html: htm
            }
        ]
        this.callParent();
    },
    // items: [{
    //     // xtype: "panel",
    //     // cls: "text_panel",
    //     // itemId: "text_panel",
    //     // margin: 5

    //     xtype: 'component',
    //     itemId: "text_panel",
    //     // margin: '5 0 0 0',
    //     padding: 10

    // }],
    listeners: {
        // afterrender: function(panel) {
        //     var header = panel.getHeader();
        //     panel.getEl().on('mouseover', function() {
        //         // header.getTools().forEach(function(tool) {
        //         //     tool.show();
        //         header.show()
        //         console.log(header);
        //         // })
        //     }, this);
        //     panel.getEl().on('mouseout', function() {
        //         // header.getTools().forEach(function(tool) {
        //         //     tool.hide();
        //         // })
        //         header.hide();
        //     }, this);
        // }
    }
});