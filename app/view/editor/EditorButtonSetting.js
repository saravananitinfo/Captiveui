Ext.define("CaptivePortal.view.editor.EditorButtonSetting",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.editor_button_setting',
	title: 'Button Settings',
    closable : true,
    bodyCls: 'editor_button_setting',
    layout: 'vbox',
    initComponent: function () {
        var btn_json = Ext.decode(this.btn_json);
        this.items = [
            {
                xtype: 'panel',
                layout: 'vbox',
                width: '100%',
                items: [
                    {
                        xtype: 'label',
                        margin: '10 10 0 10',
                        text: 'Url'
                    },
                    {
                        xtype: 'textfield',
                        margin: '0 10 0 10',
                        width: '100%',
                        cls: 'btn_url',
                        value: btn_json["url"],
                        listeners: {
                            'change': function(){
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
                                // button_panel.down('#button_panel').el.query('a')[0].href = this.value

                                var btn_json = Ext.decode(button_panel.button_json, true);
                                btn_json['url'] = this.value;
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
                layout: 'vbox',
                width: '100%',
                items: [
                    {
                        xtype: 'label',
                        margin: '10 10 0 10',
                        text: 'Font Size'
                    },
                    {
                        xtype: 'numberfield',
                        margin: '0 10 0 10',
                        width: '100%',
                        minValue: 0,
                        value: btn_json["font_size"],
                        listeners: {
                            'change': function(ths, newValue, oldValue, eOpts){
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
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
                        text: 'Radius'
                    },
                    {
                        xtype: 'numberfield',
                        margin: '0 10 0 10',
                        width: '100%',
                        minValue: 0,
                        value: btn_json["border_radius"],
                        listeners: {
                            'change': function(ths, newValue, oldValue, eOpts){
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
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
                        text: 'Alignment'
                    },
                    {
                        xtype: 'panel',
                        margin: '0 10 0 10',
                        layout: 'vbox',
                        items: [
                            {
                                items:[{
                                    xtype: 'button',

                                    iconCls : 'align_left',
                                    scale: 'large',
                                    autoWidth : true,
                                    autoHeight : true,
                                    tooltip : 'Align Left',
                                    
                                    margin: '0 10 0 0',
                                    // text: 'Left',
                                    handler: function(){
                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
                                        // var btn = button_panel.down('#button_panel')
                                        // btn.el.dom.style.textAlign = 'left'
                                        button_panel.layout.tdAttrs.align = "left";
                                        button_panel.doLayout();
                                        var btn_json = Ext.decode(button_panel.button_json, true);
                                        btn_json['align'] = "left";
                                        button_panel.button_json = JSON.stringify(btn_json);
                                    }
                                },
                                {
                                    xtype: 'button',

                                    iconCls : 'align_center',
                                    scale: 'large',
                                    autoWidth : true,
                                    autoHeight : true,
                                    tooltip : 'Align Center',

                                    margin: '0 10 0 0',
                                    // text: 'Center',
                                    handler: function(){
                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
                                        // var btn = button_panel.down('#button_panel')
                                        // btn.el.dom.style.textAlign = 'center'
                                        button_panel.layout.tdAttrs.align = "center";
                                        button_panel.doLayout();
                                        var btn_json = Ext.decode(button_panel.button_json, true);
                                        btn_json['align'] = "center";
                                        button_panel.button_json = JSON.stringify(btn_json);
                                    }
                                },
                                {
                                    xtype: 'button',

                                    iconCls : 'align_right',
                                    scale: 'large',
                                    autoWidth : true,
                                    autoHeight : true,
                                    tooltip : 'Align Right',

                                    margin: '0 50 0 0',
                                    // text: 'Right',
                                    handler: function(){
                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
                                        // var btn = button_panel.down('#button_panel')
                                        // btn.el.dom.style.textAlign = 'right'
                                        button_panel.layout.tdAttrs.align = "right";
                                        button_panel.doLayout();
                                        var btn_json = Ext.decode(button_panel.button_json, true);
                                        btn_json['align'] = "right";
                                        button_panel.button_json = JSON.stringify(btn_json);
                                    }
                                }]
                            },




                            {
                                items:[{
                                    xtype: 'button',

                                    iconCls : 'valign_top',
                                    scale: 'large',
                                    autoWidth : true,
                                    autoHeight : true,
                                    tooltip : 'Valign Top',

                                    margin: '0 10 0 0',
                                    // text: 'Top',
                                    handler: function(){
                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
                                        // var btn = button_panel.down('#button_panel')
                                        // btn.el.dom.style.textAlign = 'left'
                                        button_panel.layout.tdAttrs.valign = "top";
                                        button_panel.doLayout();
                                        var btn_json = Ext.decode(button_panel.button_json, true);
                                        btn_json['valign'] = "top";
                                        button_panel.button_json = JSON.stringify(btn_json);
                                    }
                                },
                                {
                                    xtype: 'button',

                                    iconCls : 'valign_middle',
                                    scale: 'large',
                                    autoWidth : true,
                                    autoHeight : true,
                                    tooltip : 'Valign Middle',

                                    margin: '0 10 0 0',
                                    // text: 'Middle',
                                    handler: function(){
                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
                                        // var btn = button_panel.down('#button_panel')
                                        // btn.el.dom.style.textAlign = 'center'
                                        button_panel.layout.tdAttrs.valign = "middle";
                                        button_panel.doLayout();
                                        var btn_json = Ext.decode(button_panel.button_json, true);
                                        btn_json['valign'] = "middle";
                                        button_panel.button_json = JSON.stringify(btn_json);
                                    }
                                },
                                {
                                    xtype: 'button',

                                    iconCls : 'valign_bottom',
                                    scale: 'large',
                                    autoWidth : true,
                                    autoHeight : true,
                                    tooltip : 'Valign Bottom',

                                    margin: '0 10 0 0',
                                    // text: 'Bottom',
                                    handler: function(){
                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
                                        // var btn = button_panel.down('#button_panel')
                                        // btn.el.dom.style.textAlign = 'right'
                                        button_panel.layout.tdAttrs.valign = "bottom";
                                        button_panel.doLayout();
                                        var btn_json = Ext.decode(button_panel.button_json, true);
                                        btn_json['valign'] = "bottom";
                                        button_panel.button_json = JSON.stringify(btn_json);
                                    }
                                }]
                            }
                        ]

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
                margin: '15 0 0 0',
                width: '100%',
                items: [
                    {
                        title: "Text",
                        items: [
                            // {
                            //     xtype: 'colorpicker',
                            //     itemId: 'btn_txt_color',
                            //     value: btn_json["txt_color"],
                            //     listeners: {
                            //         select: function( ths, color, eOpts ){
                            //             var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
                            //             var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
                            //             btn.style.color = '#'+color;

                            //             var btn_json = Ext.decode(button_panel.button_json, true);
                            //             btn_json['txt_color'] = color;
                            //             button_panel.button_json = JSON.stringify(btn_json);
                            //         }
                            //     }
                            // },
                            {
                                xtype: 'colorfield',
                                fieldLabel: 'Color Field',
                                labelWidth: 75,
                                value: btn_json["txt_color"],
                                width: '92%',
                                margin: '10 10 10 10',
                                listeners: {
                                    change: function(picker){

                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
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
                            // {
                            //     xtype: 'colorpicker',
                            //     itemId: 'btn_bg_color',
                            //     value: btn_json["bg_color"],
                            //     listeners: {
                            //         select: function( ths, color, eOpts ){
                            //             var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
                            //             var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
                            //             btn.style.background = '#'+color;

                            //             var btn_json = Ext.decode(button_panel.button_json, true);
                            //             btn_json['bg_color'] = color;
                            //             button_panel.button_json = JSON.stringify(btn_json);
                            //         }
                            //     }
                            // },
                            {
                                xtype: 'colorfield',
                                fieldLabel: 'Color Field',
                                labelWidth: 75,
                                value: btn_json["bg_color"],
                                width: '92%',
                                margin: '10 10 10 10',
                                listeners: {
                                    change: function(picker){

                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.editor_button_setting').button_id)[0]
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
            }
        ]
        this.callParent(arguments);
    },
    listeners: {
        afterrender: function(){
            // var button_panel = Ext.ComponentQuery.query('#'+this.button_id)[0]
            // var btn_json = Ext.decode(button_panel.button_json, true)
            // console.log("........editor_button_setting render.......");
            // this.query("textfield")[0].setValue(btn_json["text"]);
            // this.query("sliderfield")[0].setValue(btn_json["padding_val"]);
        }
    },
});