Ext.define("CaptivePortal.view.editor.LoginFormWidget",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.login_form_widget',
    requires: [
        'CaptivePortal.view.editor.LoginFormWidgetSetting'
    ],
	width: '100%',
    height: '100%',
    cls: 'login_form_widget',
    header: {
        titlePosition: 0,
        title: 'Login Form'
    },
    tools: [
        {
            type:'gear',
            handler: function(){
                var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0];
                var editor_setting_panel = Ext.ComponentQuery.query('#editor_setting_panel')[0];
                editor_setting_panel.removeAll();
                editor_setting_panel.add({
                    xtype: 'login_form_widget_setting',
                    login_form_widget_id: this.up(".login_form_widget").id
                });
                editor_settings.setActiveItem(1);
            }
        },{
            type:'close',
            handler: function(){
                var setting = Ext.ComponentQuery.query('#editor_settings')[0];
                console.log(setting.getLayout().activeItem);

                if(setting.getLayout().getActiveItem().itemId === 'editor_setting_panel'){
                    var button_setting = setting.getLayout().getActiveItem().down('login_form_widget_setting')
                    if(button_setting){
                        if(setting.getLayout().getActiveItem().down('login_form_widget_setting').login_form_widget_id == this.up('.login_form_widget').id){
                            setting.setActiveItem(0);
                        }
                    }
                }
                window.ths = this;
                var theme = Ext.ComponentQuery.query('#'+this.el.up('.dpanel').id)[0];
                var indx = theme.items.indexOf(this.up('login_form_widget'));
                theme.remove(this.up('login_form_widget'));
                theme.insert(indx,{
                    xtype: "dropPanel",
                    cls: "dropPanel"
                });
                
            }
        }
    ],
    initComponent: function(){
        this.items = [
            {
                xtype: 'component',
                itemId: "text_panel",
                style: 'text-align: center;font-size: 22px;',
                padding: 10,
                html: '<img src="/resources/images/login_form.png"/>'
            }
        ]
        this.callParent();
    },
});