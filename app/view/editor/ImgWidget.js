Ext.define("CaptivePortal.view.editor.ImgWidget",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.img_widget',
	width: '100%',
    height: '100%',
    header: {
        titlePosition: 0,
        title: 'Image',
        items:[{
            xtype:'button',
            text: 'Upload Img',
            handler: function(){
                
                       
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

        xtype: 'component',
        itemId: "img_panel",
        padding: 10,
        bodyStyle: "background-image:url(http://cdn.flaticon.com/png/256/16410.png) !important",
        height:300,
    }]
});