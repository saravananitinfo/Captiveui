Ext.define("CaptivePortal.view.editor.LoginButtonWidget",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.login_button_widget',
    requires: [
        'CaptivePortal.view.editor.LoginButtonSetting'
    ],
	width: '100%',
    height: '100%',
    cls: 'login_button_widget',
    bodyStyle: "background: transparent;",
    // button_json: '{"type":"Button","connect":"fb","text":"Login","url":"https://","padding_val":5,"font_size":13,txt_color:"",bg_color:"",border_radius: 0,top:50,left:50}',
    
    button_json: '{"type":"Button","connect":"fb","text":"Login","url":"https://","padding_val":5,"font_size":13,txt_color:"",bg_color:"",border_radius: 0,top:50,left:50}',
    link_json: '{"type":"Link","connect":"fb","text":"Connect With Facebook","url":"https://","font_size":13,txt_color:"000000",top:50,left:50}',
    form_json: {email: {enable: false, optional: false},first_name: {enable: false, optional: false},last_name: {enable: false, optional: false},gender: {enable: false, optional: false},birth_day: {enable: false, optional: false},mobile_number: {enable: false, optional: false},password: {enable: false, optional: false},verify_email: {enable: false, optional: false}},
    trigger_type: 'Button',
    header: {
        titlePosition: 0,
        title: 'Login Button'
    },
    tools: [{
        type:'gear',
        handler: function(event, toolEl, panel){
            console.log(this.up(".login_button_widget").id);
            var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0];
            var panel = editor_settings.down('#editor_setting_panel');
            panel.removeAll();
            panel.add({
                xtype: 'login_button_setting',
                cls: this.up(".login_button_widget").id,
                button_id: this.up(".login_button_widget").id,
                btn_json: this.up(".login_button_widget").button_json,
                link_json: this.up(".login_button_widget").link_json,
                trigger_type: this.up(".login_button_widget").trigger_type,
                header: {
                    titlePosition: 0,
                    title: 'Login Button Settings'
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
            var setting = Ext.ComponentQuery.query('#editor_settings')[0];
            console.log(setting.getLayout().activeItem);

            if(setting.getLayout().getActiveItem().itemId === 'editor_setting_panel'){
                var login_button_setting = setting.getLayout().getActiveItem().down('login_button_setting')
                if(login_button_setting){
                    if(setting.getLayout().getActiveItem().down('login_button_setting').button_id == this.up('.login_button_widget').id){
                        setting.setActiveItem(0);
                    }
                }
            }

            var theme = this.up('.login_button_widget').up();
            var indx = theme.items.indexOf(this.up('.login_button_widget'));
            theme.remove(this.up('.login_button_widget'));


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
        var link_json = Ext.decode(me.link_json);
        var trigger_type = me.trigger_type;

        // var local = {'fb': 'facebook', 'g': 'google', 'tw': 'twitter'}
        // if(button_json.type === 'Button'){
        //     var stl = 'background: #'+button_json.bg_color+';color: #'+button_json.txt_color+';border-radius: '+button_json.border_radius+'px'+';font-size: '+button_json.font_size+'px'+';padding: '+button_json.padding_val+'px '+button_json.padding_val*2+'px;';
        //     var htm = '<a href="#"><button '+'style="'+stl+'type="button" class="'+button_json.connect+'Btn edtBtn btn-default"><span style="margin-right: 5px;" class="icon"><i class="fa fa-'+local[button_json.connect]+'"></i></span><span class="text">'+button_json.text+'</span></button></a>'
        // }else if(button_json.type === 'Link'){
        //     var stl = 'font-size: '+button_json.font_size+'px;'
        //     var htm = '<a style="text-decoration: none;'+stl+'" href="#">'+button_json.text+'</a>'
        // }


        var local = {'fb': 'facebook', 'g': 'google', 'tw': 'twitter'}
        if(trigger_type === 'Button'){
            var stl = 'background: #'+button_json.bg_color+';color: #'+button_json.txt_color+';border-radius: '+button_json.border_radius+'px'+';font-size: '+button_json.font_size+'px'+';padding: '+button_json.padding_val+'px '+button_json.padding_val*2+'px;';
            var htm = '<a href="#"><button '+'style="'+stl+'type="button" class="'+button_json.connect+'Btn edtBtn btn-default"><span class="icon"><i class="fa fa-'+local[button_json.connect]+'"></i></span><span class="text" style="margin: 0 5px;">'+button_json.text+'</span></button></a>'
        }else if(trigger_type === 'Link'){
            var stl = 'font-size: '+link_json.font_size+'px;'
            var htm = '<a style="text-decoration: none;'+stl+'" href="#">'+link_json.text+'</a>'
        }

        this.items = [
            {
                xtype: 'component',
                text: 'Default',
                autoEl: {
                    tag: "div",
                    style: {
                        display: 'inline-block',
                        top: button_json['top']+"px",
                        left: button_json['left']+"px"
                    }
                },
                draggable: {
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
                itemId: "button_panel",
                html: htm
            }
        ]
        this.callParent(arguments);
    }
});