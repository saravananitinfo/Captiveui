Ext.define("CaptivePortal.view.editor.TextWidget",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.text_widget',
	width: '100%',
    height: '100%',
    header: {
        hidden: true,
        titlePosition: 0,
        title: 'Text',
        items:[{
            xtype:'button',
            text: 'Edit',
            handler: function(){
                var me = this
                pn = me.up().up().items.getAt(0)
                var panel = new Ext.panel.Panel({
                    title: 'HTML Editor',
                    floating: true,
                    closable : true,
                    width: 473,
                    // height: 220,
                    default: '',
                    frame: true,
                    layout: 'fit',
                    items: [{
                        xtype: 'button',
                        margin: '10 0 0 0',
                        text: 'Save HTML Contents',
                        handler: function() {
                            // me.el.setHtml(panel.items.getAt(1).getValue());
                            me.up().up().items.getAt(0).setHtml(panel.items.getAt(1).getValue());
                            panel.close();
                        }
                    },{
                        xtype: 'htmleditor',
                        enableColors: true,
                        enableAlignments: true,
                        enableLists: true,
                        enableSourceEdit: true
                    }]
                });
                panel.items.getAt(1).setValue(pn.el.getHtml());
                panel.show();
                panel.center();
                       
            }
        },{
            xtype:'button',
            text: 'Delete',
            margin: '0 0 0 5',
            handler: function(){
                var theme = this.up().up().up();
                var indx = theme.items.indexOf(this.up().up());
                theme.remove(this.up().up());
                theme.insert(indx,{
                    xtype: "dropPanel",
                    cls: "dropPanel",
                    height: '100%',
                    margin: 5
                });
            }
        }]
    },
    border: true,
    items: [{
        // xtype: "panel",
        // cls: "text_panel",
        // itemId: "text_panel",
        // margin: 5

        xtype: 'component',
        itemId: "text_panel",
        // margin: '5 0 0 0',
        padding: 10

    }],
    listeners: {
        afterrender: function(panel) {
            var header = panel.getHeader();
            panel.getEl().on('mouseover', function() {
                // header.getTools().forEach(function(tool) {
                //     tool.show();
                header.show()
                console.log(header);
                // })
            }, this);
            panel.getEl().on('mouseout', function() {
                // header.getTools().forEach(function(tool) {
                //     tool.hide();
                // })
                header.hide();
            }, this);
        }
    }
});