Ext.define("CaptivePortal.view.editor.ButtonWidget",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.button_widget',
    requires: [
        'CaptivePortal.view.editor.EditorButtonSetting'
    ],
	width: '100%',
    height: '100%',
    cls: 'button_widget',
    // layout: 'hbox',
    button_json: '{"text":"Default","url":"https://","padding_val":5,"font_size":13,txt_color:"",bg_color:"",border_radius: 0,top:50,left:50}',
    // style: 'border: solid 1px gray',
    // ddGroup:"akshay",
    header: {
        // hidden: true,
        titlePosition: 0,
        style:{
            // background: 'transparent'
            // width: '100%'
        },
        title: 'Button',
        // items:[{
        //     xtype:'button',
        //     text: 'Select Button',
        //     handler: function(){
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
        //     xtype:'button',
        //     text: 'Delete',
        //     margin: '0 0 0 5',
        //     handler: function(){
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
        // }]
    },
    tools: [{
        type:'gear',
        handler: function(event, toolEl, panel){
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
        }
    },{
         type:'close',
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
    }],
    border: true,
    initComponent: function () {
         var me= this;
         var button_json = Ext.decode(me.button_json);

         this.items = [
            // {
            //     xtype: 'component',
            //     style: "text-align: center;",
            //     height: '100%',
            //     itemId: "button_panel",
            //     padding: 10,
            //     html: '<button type="button" class="edtBtn btn-default">Default</button>'
            // }
            {
                xtype: 'component',
                text: 'Default',
                // width: 50,
                // style: "text-align: center;",
                autoEl: {
                    tag: "div",
                    // cls: "edtBtn",
                    // style: 'display: inline-block;top: 10px;left: 50px;'
                    style: {
                        display: 'inline-block',
                        top: button_json['top']+"px",
                        left: button_json['left']+"px"
                    }
                    // html: "<span>Default</spam>"
                },
                // itemSelector: "button.edtBtn",
                // draggable: true,
                draggable: {
                    // delegate: "button",
                    constrain: true,
                    constrainTo: me.el,
                    listeners: {
                        'dragend': function( ths, e, eOpts ){
                            var button_json = Ext.decode(me.button_json);
                            button_json['top'] = ths.dragTarget.offsetTop;
                            button_json['left'] = ths.dragTarget.offsetLeft;
                            me.button_json = JSON.stringify(button_json);
                        }
                    }
                },
                // ddGroup:"akshay",
                // height: '100%',
                itemId: "button_panel",
                // padding: 10,
                html: '<a href="#"><button type="button" class="edtBtn btn-default">Default</button></a>'
            }

         ]
         this.callParent(arguments);
    },
    listeners: {
        // afterrender: function(panel) {
        //     var header = panel.getHeader();
        //     panel.getEl().on('mouseover', function() {
        //         // header.getTools().forEach(function(tool) {
        //             // tool.show();
        //         header.show();
        //         // console.log(header);
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