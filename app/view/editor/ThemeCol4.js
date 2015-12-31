Ext.define("CaptivePortal.view.editor.ThemeCol4",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.theme_col_4',
	width: '100%',
    height: 200,
    layout: "hbox",
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
    defaults: {
        ddGroup: "widgetGroup",
        width: "50%",
        flex: 1,
        height: '100%',
        margin: 5
    },
    cls: 'dpanel',
     items: [
        {
            xtype: "dropPanel",
            cls: "dropPanel"
        },
        {
            xtype: "dropPanel",
            cls: "dropPanel"
        },
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