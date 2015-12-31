Ext.define("CaptivePortal.view.editor.ThemeCol2RightVbox",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.theme_col_2_right_vbox',
	width: '100%',
    height: 200,
    layout: "hbox",
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'right',
        style: "background: transparent",
        items: [
            {
                // text: 'Close',
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
    bodyStyle: "background: transparent;",
    defaults: {
        ddGroup: "widgetGroup",
        width: "50%",
        height: '100%',
        margin: 5,
        flex: 1
    },
    cls: 'dpanel',
    items: [
        {
            xtype: "dropPanel",
            cls: "dropPanel"
        },
        {
            verticle_divide: true,
            height: '100%',
            margin: 5,
            cls: "dropPanel dpanel",
            // id: 'dpanel',   
            layout: 'vbox',
            defaults: {
                ddGroup: "widgetGroup",
                flex: 1,
                width: '100%',
                height: '50%'
            },
            bodyStyle: "background: transparent",
            items:[{
                xtype: "dropPanel",
                cls: "dropPanel"
                // style: 'border: 1px dashed #03142a;border-bottom: none;background: transparent',
            },
            {
                xtype: "dropPanel",
                cls: "dropPanel"
            }]
        }
    ]
});