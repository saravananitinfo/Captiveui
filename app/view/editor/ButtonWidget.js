Ext.define("CaptivePortal.view.editor.ButtonWidget",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.button_widget',
    require: [
        'CaptivePortal.view.editor.EditorButtonSetting'
    ],
	width: '100%',
    height: '100%',
    cls: 'button_widget',
    button_json: '{"text":"Default","padding_val":5,"font_size":13}',
    // style: 'border: solid 1px gray',
    header: {
        hidden: true,
        titlePosition: 0,
        title: 'Button',
        items:[{
            xtype:'button',
            text: 'Select Button',
            handler: function(){
                console.log("akshay..............");
                console.log(this.up(".button_widget").id);
                var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0];
                var panel = editor_settings.down('#editor_setting_panel');
                panel.removeAll();
                panel.add({
                    xtype: 'editor_button_setting',
                    cls: this.up(".button_widget").id,
                    button_id: this.up(".button_widget").id,
                    header: {
                        titlePosition: 0,
                        title: 'Button Settings'
                    },
                    listeners: {
                        'close': function() {
                            var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0]
                            editor_settings.setActiveItem(0)
                        }
                    }
                });

                editor_settings.setActiveItem(1)
                // editor_settings.down('#editor_setting_panel').add({

                // })

                // var bti = this.up(".button_widget");
                // console.log(bti);
                // var panel = Ext.create('CaptivePortal.view.editor.EditorButtonSetting',{
                //     width: 600,
                //     height: 400,
                //     current_block: bti.id
                // });
                // panel.show();
                // panel.center();
                       
            }
        },{
            xtype:'button',
            text: 'Delete',
            margin: '0 0 0 5',
            handler: function(){
                // var b_setting = Ext.query('.'+this.up(".button_widget").id)[0]
                var setting = Ext.ComponentQuery.query('#editor_settings')[0];
                console.log(setting.getLayout().activeItem);

                if(setting.getLayout().getActiveItem().itemId === 'editor_setting_panel'){
                    if(setting.getLayout().getActiveItem().down('editor_button_setting').button_id == this.up('.button_widget').id){
                        setting.setActiveItem(0);
                    }
                }

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
        // xtype: 'component',
        // autoEl: {
        //     tag: 'button',
        // },
        xtype: 'component',
        style: "text-align: center;",
        height: '100%',
        itemId: "button_panel",
        padding: 10,
        html: '<button type="button" class="edtBtn btn-default">Default</button>'
    }],
    listeners: {
        afterrender: function(panel) {
            var header = panel.getHeader();
            panel.getEl().on('mouseover', function() {
                // header.getTools().forEach(function(tool) {
                //     tool.show();
                header.show()
                // console.log(header);
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