Ext.define("CaptivePortal.view.editor.HtmlWidget",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.html_widget',
	width: '100%',
    height: '100%',
    bodyStyle: "background: transparent;",
    header: {
        titlePosition: 0,
        title: 'HTML',
    },
    tools: [
        {
            type:'gear',
            handler: function(){
                var me = this
                pn = me.up().up().items.getAt(0)

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
                        xtype: 'textarea',
                        fieldStyle: 'height:100%;',
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
                var theme = Ext.ComponentQuery.query('#'+this.el.up('.dpanel').id)[0];
                var indx = theme.items.indexOf(this.up('html_widget'));
                theme.remove(this.up('html_widget'));
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
                itemId: "html_panel",
                padding: 10,
                html: htm
            }
        ]
        this.callParent();
    }
});