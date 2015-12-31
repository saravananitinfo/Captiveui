Ext.define("CaptivePortal.view.editor.ImgWidget",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.img_widget',
    requires: [
        'CaptivePortal.view.editor.ImgWidgetSetting',
        'CaptivePortal.view.editor.ImageWidgetController'
    ],
    controller: "image_widget_controller",
    listeners: {
        render: "onRender"
    },
    ddGroup: "galleryImage",
    img_json: '{src: "#", width: 0, height: 0, top: 0, left: 0}',
	width: '100%',
    height: '100%',
    cls: 'img_widget',
    // style: 'background: url("http://vignette4.wikia.nocookie.net/fable/images/5/53/Image_Upload.png/revision/latest?cb=20101002231116") no-repeat center;background-size: 70px 70px;',
    bodyStyle: "background: transparent;",
    header: {
        titlePosition: 0,
        title: 'Image',
        // items:[{
        //     xtype:'button',
        //     text: 'Upload Img',
        //     handler: function(){
                
                       
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
                var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0];
                var editor_setting_panel = Ext.ComponentQuery.query('#editor_setting_panel')[0];
                editor_setting_panel.removeAll();
                editor_setting_panel.add({
                    xtype: 'img_widget_setting',
                    img_widget_id: this.up(".img_widget").id
                });
                editor_settings.setActiveItem(1);
            }
        },{
            type:'close',
            handler: function(){
                var setting = Ext.ComponentQuery.query('#editor_settings')[0];
                console.log(setting.getLayout().activeItem);

                if(setting.getLayout().getActiveItem().itemId === 'editor_setting_panel'){
                    var button_setting = setting.getLayout().getActiveItem().down('img_widget_setting')
                    if(button_setting){
                        if(setting.getLayout().getActiveItem().down('img_widget_setting').img_widget_id == this.up('.img_widget').id){
                            setting.setActiveItem(0);
                        }
                    }
                }


                
                // var theme = this.up().up().up();
                // var indx = theme.items.indexOf(this.up().up());
                // theme.remove(this.up().up());
                // theme.insert(indx,{
                //     xtype: "dropPanel",
                //     cls: "dropPanel",
                //     height: '100%',
                //     margin: 5
                // });
                
                window.ths = this;
                var theme = Ext.ComponentQuery.query('#'+this.el.up('.dpanel').id)[0];
                var indx = theme.items.indexOf(this.up('img_widget'));
                theme.remove(this.up('img_widget'));
                theme.insert(indx,{
                    xtype: "dropPanel",
                    cls: "dropPanel"
                });
                
            }
        }
    ],
    border: true,
    initComponent: function(){
        // var stl = 'background: url("/resources/images/img_before.png") no-repeat center;background-size: 61px 44px;';
        var stl = '';
        var img_json = Ext.decode(this.img_json);
        if(img_json.src === "#"){
            stl = 'display:none';
            this.cls = 'default_img';
        }else{

        }
        console.log("..................................test............................")
        console.log(img_json);
        var me= this;
        this.items = [{
            xtype: 'component',

            autoEl: {
                tag: "div",
                style: {
                    display: 'inline-block',
                    textAlign: 'center',
                    top: img_json.top+"px",
                    left: img_json.left+"px"
                }
            },
            draggable: {
                constrain: true,
                constrainTo: me.el,
                listeners: {
                    'dragend': function( ths, e, eOpts ){
                        // me.img_json.top = ths.dragTarget.offsetTop;
                        // me.img_json.left= ths.dragTarget.offsetLeft;
                        var img_json = Ext.decode(me.img_json);
                        img_json.top = ths.dragTarget.offsetTop;;
                        img_json.left = ths.dragTarget.offsetLeft;;
                        me.img_json = JSON.stringify(img_json);
                    }
                }
            },

            
            itemId: "img_panel",
            // padding: 10,
            html: '<img class="img" style="'+stl+'" src="'+img_json.src+'" width="'+img_json.width+'" height="'+img_json.height+'"></img>'
        }]
        this.callParent();
    }
    // items: [{
    //     xtype: 'component',

    //     autoEl: {
    //         tag: "div",
    //         style: {
    //             display: 'inline-block'
    //         }
    //     },
    //     draggable: {
    //         constrain: true,
    //         // constrainTo: me.el,
    //         listeners: {
    //             'dragend': function( ths, e, eOpts ){
                    
    //             }
    //         }
    //     },

    //     style: 'text-align:center;',
    //     itemId: "img_panel",
    //     // padding: 10,
    //     html: '<img class="img" style="height: 150px;" src="http://vignette4.wikia.nocookie.net/fable/images/5/53/Image_Upload.png/revision/latest?cb=20101002231116"></img>'
    // }]
});