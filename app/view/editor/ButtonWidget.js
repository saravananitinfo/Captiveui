Ext.define("CaptivePortal.view.editor.ButtonWidget",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.button_widget',
    require: [
        'CaptivePortal.view.editor.EditorButtonSetting'
    ],
	width: '100%',
    height: '100%',
    cls: 'button_widget',
    // layout: 'hbox',
    button_json: '{"text":"Default","padding_val":5,"font_size":13,txt_color:"",bg_color:"",border_radius: 0}',
    // style: 'border: solid 1px gray',
    // ddGroup:"akshay",
    header: {
        // hidden: true,
        titlePosition: 0,
        style:{
            background: 'transparent'
        },
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
                    btn_json: this.up(".button_widget").button_json,
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

                // var theme = this.up().up().up();
                // var indx = theme.items.indexOf(this.up().up());
                // theme.remove(this.up().up());

                var theme = this.up('.button_widget').up();
                var indx = theme.items.indexOf(this.up('.button_widget'));
                theme.remove(this.up('.button_widget'));

                theme.insert(indx,{
                    xtype: "dropPanel",
                    cls: "dropPanel",
                    height: '100%',
                    margin: 5
                });
            }
        }]
    },
    // tools: [{
    //     type:'gear',
    //     // tooltip: 'Refresh',
    //     handler: function(event, toolEl, panel){
    //         console.log("akshay..............");
    //         console.log(this.up(".button_widget").id);
    //         var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0];
    //         var panel = editor_settings.down('#editor_setting_panel');
    //         panel.removeAll();
    //         panel.add({
    //             xtype: 'editor_button_setting',
    //             cls: this.up(".button_widget").id,
    //             button_id: this.up(".button_widget").id,
    //             btn_json: this.up(".button_widget").button_json,
    //             header: {
    //                 titlePosition: 0,
    //                 title: 'Button Settings'
    //             },
    //             listeners: {
    //                 'close': function() {
    //                     var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0]
    //                     editor_settings.setActiveItem(0)
    //                 }
    //             }
    //         });

    //         editor_settings.setActiveItem(1)
    //     }
    // },{
    //      type:'close',
    //      handler: function(){
    //         // var b_setting = Ext.query('.'+this.up(".button_widget").id)[0]
    //         var setting = Ext.ComponentQuery.query('#editor_settings')[0];
    //         console.log(setting.getLayout().activeItem);

    //         if(setting.getLayout().getActiveItem().itemId === 'editor_setting_panel'){
    //             if(setting.getLayout().getActiveItem().down('editor_button_setting').button_id == this.up('.button_widget').id){
    //                 setting.setActiveItem(0);
    //             }
    //         }

    //         // var theme = this.up().up().up();
    //         // var indx = theme.items.indexOf(this.up().up());
    //         // theme.remove(this.up().up());

    //         var theme = this.up('.button_widget').up();
    //         var indx = theme.items.indexOf(this.up('.button_widget'));
    //         theme.remove(this.up('.button_widget'));


    //         theme.insert(indx,{
    //             xtype: "dropPanel",
    //             cls: "dropPanel",
    //             height: '100%',
    //             margin: 5
    //         });
    //     }
    // }],
    border: true,
    initComponent: function () {
         var me= this;
         this.items = [
            {
                xtype: 'component',
                style: "text-align: center;",
                height: '100%',
                itemId: "button_panel",
                padding: 10,
                html: '<button type="button" class="edtBtn btn-default">Default</button>'
            }
            // {
            //     xtype: 'component',
            //     text: 'Default',
            //     // style: "text-align: center;",
            //     // autoEl: {
            //     //     tag: "button",
            //     //     cls: "edtBtn btn-default",
            //     //     html: "<span>Default</spam>"
            //     // },
            //     // itemSelector: "button.edtBtn",
            //     // draggable: true,
            //     draggable: {
            //         delegate: "button",
            //         constrain: true,
            //         constrainTo: me.el
            //     },
            //     // ddGroup:"akshay",
            //     // height: '100%',
            //     // itemId: "button_panel",
            //     // padding: 10,
            //     html: '<button type="button" class="edtBtn btn-default">Default</button>'
            // }

         ]
         this.callParent(arguments);
    },
    listeners: {
        afterrender: function(panel) {
            var header = panel.getHeader();
            window.abc= header;
            panel.getEl().on('mouseover', function() {
                // header.getTools().forEach(function(tool) {
                    // tool.show();
                header.show();
                // header.el.applyStyles('display:block;');
                // console.log(header);
                // })
            }, this);
            panel.getEl().on('mouseout', function() {
                // header.getTools().forEach(function(tool) {
                //     tool.hide();
                // })
                header.hide();
                // header.el.applyStyles('display:none;');
            }, this);
        }
        // onRender: function(b){
        //     var c = new Ext.dd.DropTarget(this.getView().el, {
        //         ddGroup: d.ddGroup
        //     });
        // }
    }
});