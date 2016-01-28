Ext.define("CaptivePortal.view.editor.LoginFormWidgetSetting",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.login_form_widget_setting',
	title: 'Login Form Settings',
    closable : true,
    cls: 'login_form_widget_setting',
    bodyCls: 'login_form_widget_setting',
    itemId: 'login_form_widget_setting',
    layout: 'vbox',
    listeners: {
      'close': function() {
          var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0]
          editor_settings.setActiveItem(0)
      }
    }
});