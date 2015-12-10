Ext.define("CaptivePortal.view.editor.LoginButtonSetting",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.login_button_setting',
	title: 'Button Settings',
    closable : true,
    cls: 'login_button_setting',
    layout: 'vbox',
    initComponent: function () {
        var btn_json = Ext.decode(this.btn_json);
        this.items = [

        ]
        this.callParent(arguments);
    }
});