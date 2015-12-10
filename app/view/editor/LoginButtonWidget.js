Ext.define("CaptivePortal.view.editor.LoginButtonWidget",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.login_button_widget',
    requires: [
        'CaptivePortal.view.editor.LoginButtonSetting'
    ],
	width: '100%',
    height: '100%',
    cls: 'login_button_widget',
    button_json: '{"text":"Default"}',
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
                if(setting.getLayout().getActiveItem().down('login_button_setting').button_id == this.up('.login_button_widget').id){
                    setting.setActiveItem(0);
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

        this.items = [

        ]
        this.callParent(arguments);
    }
});