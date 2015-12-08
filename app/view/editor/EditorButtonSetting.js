Ext.define("CaptivePortal.view.editor.EditorButtonSetting",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.editor_button_setting',
	title: 'Button Settings',
    closable : true,
    cls: 'editor_button_setting',
    layout: 'vbox',
    items: [
        {
            xtype: 'panel',
            width: '100%',
            items: [
                {
                    xtype: 'textfield',
                    listeners: {
                        'change': function(){
                            var btpanel = Ext.ComponentQuery.query('#button_panel')[0]
                            window.abc = btpanel;
                            console.log(btpanel);
                        }
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            width: '100%',
            items: [
                {
                    xtype: 'textfield'
                }
            ]
        }
    ]
});