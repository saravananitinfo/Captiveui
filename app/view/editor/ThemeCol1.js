Ext.define("CaptivePortal.view.editor.ThemeCol1",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.theme_col_1',
	width: '100%',
    height: 200,
    layout: "vbox",
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'right',
        style: "background: transparent",
        items: [
            {
                xtype: 'component',
                style: 'cursor: pointer;',
                html: '<i class="fa fa-times"></i>',
                listeners: {
                    afterrender: function(component) {
                        component.getEl().on('click', function(component) {
                            var me = this;
                            Ext.MessageBox.confirm('Delete', 'Are you sure ?', function(btn){
                               if(btn === 'yes'){
                                   me.up('#editor_canvas').remove(me.up('panel'));
                                    var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0];
                                    editor_settings.setActiveItem(0);
                               }
                            });
                        }, this);
                    }
                }
            },
            {
                xtype: 'colorbutton',
                style: 'border: 1px solid black;',
                width: 15,
                height: 15,
                value: 'FFFFFF',
                listeners: {
                    'change': function( ths, color, previousColor, eOpts){
                        if(this.up('panel').body){
                            this.up('panel').body.el.dom.style.background = '#'+color;
                        }
                    }
                }
            }
        ]
    },{
        xtype: 'toolbar',
        dock: 'left',
        style: "background: transparent"
    }],
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
        width: "100%",
        flex: 1
    },
    cls: 'dpanel',
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