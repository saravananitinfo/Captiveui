Ext.define("CaptivePortal.view.editor.LoginLinkSettingPartial",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.login_link_setting_partial',
    cls: 'login_link_setting_partial',
    layout: 'vbox',
    initComponent: function () {
    	var link_json = this.link_json;
    	this.items = [
    		{
                xtype: 'panel',
                layout: 'vbox',
                width: '100%',
                items: [
                    {
                        xtype: 'label',
                        margin: '10 10 0 10',
                        text: 'Text'
                    },
                    {
                        xtype: 'textfield',
                        margin: '0 10 0 10',
                        width: '100%',
                        cls: 'btn_text',
                        value: link_json["text"],
                        listeners: {
                            'change': function(){
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                button_panel.down('#button_panel').el.query('a')[0].textContent = this.value
                                var link_json = Ext.decode(button_panel.link_json, true);
                                link_json['text'] = this.value;
                                button_panel.link_json = JSON.stringify(link_json);
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'vbox',
                width: '100%',
                items: [
                    {
                        xtype: 'label',
                        margin: '10 10 0 10',
                        text: 'Font Size (In px)'
                    },
                    {
                        xtype: 'numberfield',
                        margin: '0 10 0 10',
                        width: '100%',
                        minValue: 0,
                        value: link_json["font_size"],
                        listeners: {
                            'change': function(ths, newValue, oldValue, eOpts){
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                var btn = button_panel.down('#button_panel').el.query('a')[0]
                                btn.style.fontSize = newValue+"px"

                                var link_json = Ext.decode(button_panel.link_json, true);
                                link_json['font_size'] = newValue;
                                button_panel.link_json = JSON.stringify(link_json);
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'vbox',
                width: '100%',
                items: [
                    {
                        xtype: 'label',
                        margin: '10 10 0 10',
                        text: 'Font Color'
                    },
                    // {
                    //     xtype: 'colorpicker',
                    //     itemId: 'link_txt_color',
                    //     value: link_json["txt_color"],
                    //     listeners: {
                    //         select: function( ths, color, eOpts ){
                    //             var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                    //             var link = button_panel.down('#button_panel').el.query('a')[0]
                    //             link.style.color = '#'+color;

                    //             var link_json = Ext.decode(button_panel.link_json, true);
                    //             link_json['txt_color'] = color;
                    //             button_panel.link_json = JSON.stringify(link_json);
                    //         }
                    //     }
                    // },
                    {
                        xtype: 'colorfield',
                        fieldLabel: 'Color Field',
                        labelWidth: 75,
                        value: link_json["txt_color"],
                        width: '92%',
                        margin: '10 10 0 10',
                        listeners: {
                            change: function(picker){
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                var link = button_panel.down('#button_panel').el.query('a')[0]
                                link.style.color = '#'+picker.getValue();

                                var link_json = Ext.decode(button_panel.link_json, true);
                                link_json['txt_color'] = picker.getValue();
                                button_panel.link_json = JSON.stringify(link_json);
                            }
                        }
                    }
                ]
            }
    	]
    	this.callParent();
    }
});