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
                    cls: 'btn_text',
                    listeners: {
                        'change': function(){
                            var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
                            button_panel.down('#button_panel').el.query('.edtBtn')[0].textContent = this.value
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
            width: '100%',
            items: [
                {
                    xtype: 'sliderfield',
                    width: 100,
                    value: 5,
                    increment: 5,
                    minValue: 0,
                    maxValue: 25,
                    listeners: {
                        change: function(slider, newValue, thumb, eOpts){
                            var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
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
        },
        {
            xtype: 'tabpanel',
            width: '100%',
            items: [
                {
                    title: "Text",
                    items: [
                        {
                            xtype: 'colorpicker'
                        }
                    ]
                },
                {
                    title: "Button",
                    items: [
                        {
                            xtype: 'colorpicker'
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: function(){
            var button_panel = Ext.ComponentQuery.query('#'+this.button_id)[0]
            var btn_json = Ext.decode(button_panel.button_json, true)
            console.log("........editor_button_setting render.......");
            this.query("textfield")[0].setValue(btn_json["text"]);
            this.query("sliderfield")[0].setValue(btn_json["padding_val"])
        }
    },
});