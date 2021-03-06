Ext.define("CaptivePortal.view.editor.LoginButtonSettingPartial",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.login_button_setting_partial',
    cls: 'login_button_setting_partial',
    layout: 'vbox',
    initComponent: function () {
    	var btn_json = this.button_json;
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
                        value: btn_json["text"],
                        listeners: {
                            'change': function(){
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                button_panel.down('#button_panel').el.query('.text')[0].textContent = this.value
                                var btn_json = Ext.decode(button_panel.button_json, true);
                                btn_json['text'] = this.value;
                                button_panel.button_json = JSON.stringify(btn_json);
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
                        value: btn_json["font_size"],
                        listeners: {
                            'change': function(ths, newValue, oldValue, eOpts){
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
                                btn.style.fontSize = newValue+"px"

                                var btn_json = Ext.decode(button_panel.button_json, true);
                                btn_json['font_size'] = newValue;
                                button_panel.button_json = JSON.stringify(btn_json);
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
                        text: 'Border Radius (In px)'
                    },
                    {
                        xtype: 'numberfield',
                        margin: '0 10 0 10',
                        width: '100%',
                        minValue: 0,
                        value: btn_json["border_radius"],
                        listeners: {
                            'change': function(ths, newValue, oldValue, eOpts){
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
                                btn.style.borderRadius = newValue+"px"

                                var btn_json = Ext.decode(button_panel.button_json, true);
                                btn_json['border_radius'] = newValue;
                                button_panel.button_json = JSON.stringify(btn_json);
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
                        text: 'Size'
                    },
                    {
                        xtype: 'sliderfield',
                        margin: '0 10 0 10',
                        width: '100%',
                        value: btn_json["padding_val"],
                        increment: 5,
                        minValue: 0,
                        maxValue: 25,
                        listeners: {
                            change: function(slider, newValue, thumb, eOpts){
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
                                var newPadding = newValue+"px"+" "+newValue*2+"px"
                                btn.style.padding = newPadding

                                var btn_json = Ext.decode(button_panel.button_json, true);
                                btn_json['padding_val'] = newValue;
                                button_panel.button_json = JSON.stringify(btn_json);
                            }
                        }
                    }
                ]
            }
    	]
    	this.callParent();
    },
    listeners: {
        afterrender: function(panel){
            console.log("..........out.......");
            var btn_json = this.button_json;
            if(btn_json.connect == "form"){
                console.log("..........in.......");
                panel.add({
                    xtype: 'tabpanel',
                    margin: '15 0 0 0',
                    width: '100%',
                    items: [
                        {
                            title: "Text",
                            items: [
                                {
                                    xtype: 'colorfield',
                                    fieldLabel: 'Color Field',
                                    labelWidth: 75,
                                    value: btn_json["txt_color"],
                                    width: '92%',
                                    margin: '10 10 10 10',
                                    listeners: {
                                        change: function(picker){

                                            var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                            var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
                                            btn.style.color = '#'+picker.getValue();;

                                            var btn_json = Ext.decode(button_panel.button_json, true);
                                            btn_json['txt_color'] = picker.getValue();;
                                            button_panel.button_json = JSON.stringify(btn_json);
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            title: "Button",
                            items: [
                                {
                                    xtype: 'colorfield',
                                    fieldLabel: 'Color Field',
                                    labelWidth: 75,
                                    value: btn_json["bg_color"],
                                    width: '92%',
                                    margin: '10 10 10 10',
                                    listeners: {
                                        change: function(picker){

                                            var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                            var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
                                            btn.style.background = '#'+picker.getValue();

                                            var btn_json = Ext.decode(button_panel.button_json, true);
                                            btn_json['bg_color'] = picker.getValue();
                                            button_panel.button_json = JSON.stringify(btn_json);
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                })
            }
        }
    }
});





