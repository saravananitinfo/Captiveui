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
            {
                xtype: 'panel',
                layout: 'vbox',
                width: '100%',
                items: [
                    {
                        xtype: 'label',
                        margin: '10 10 10 10',
                        text: 'Login Type'
                    },
                    {
                        xtype: 'combobox',
                        margin: '0 10 0 10',
                        width: '100%',
                        allowBlank: false,
                        name: 'gateway_type',
                        queryMode: 'local',
                        itemId: 'login_connect_type',
                        valueField: 'id',
                        value: this.gateway_type ? this.gateway_type : 'fb',
                        displayField: 'name',
                        store: 'CaptivePortal.store.editor.LoginButtonTypes',
                        listeners: {
                            'select': function(combo, record, eOpts ){
                                var local = {'fb': 'facebook', 'g': 'google', 'tw': 'twitter'}
                                console.log("..........select ............");
                                console.log(record);
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
                                var login_button = button_panel.down('#button_panel').el.query('.edtBtn')[0];
                                // window.abc = button_panel;
                                login_button.className = record.id+'Btn'+' edtBtn btn-default';
                                button_panel.down('#button_panel').el.query('i')[0].className = "fa fa-"+local[record.id];

                                Ext.ComponentQuery.query("#"+this.up('.login_button_setting').el.down('.btn_text').id)[0].setValue('Login');
                                // window.abc = this.up('.login_button_setting');
                                // login_button.classList.remove(record.id+'Btn')
                                // login_button.classList.remove(record.id+'Btn')
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                width: '100%',
                margin: '10 0 0 0',
                items: [
                    {
                        title: "Button",
                        items: [
                            {
                                xtype: 'panel',
                                layout: 'vbox',
                                width: '100%',
                                items: [
                                    {
                                        xtype: 'label',
                                        margin: '10 10 10 10',
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
                                        margin: '10 10 10 10',
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
                                        margin: '10 10 10 10',
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
                                        margin: '10 10 10 10',
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
                    },
                    {
                        title: "Link",
                        items: [
                            {
                                xtype: 'panel',
                                layout: 'vbox',
                                width: '100%',
                                items: [
                                    {
                                        xtype: 'panel',
                                        layout: 'vbox',
                                        width: '100%',
                                        items: [
                                            {
                                                xtype: 'label',
                                                margin: '10 10 10 10',
                                                text: 'Text'
                                            },
                                            {
                                                xtype: 'textfield',
                                                margin: '0 10 0 10',
                                                width: '100%',
                                                cls: 'btn_text',
                                                // value: btn_json["text"],
                                                listeners: {
                                                    'change': function(){
                                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                                        button_panel.down('#button_panel').el.query('.a')[0].textContent = this.value
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
                                                margin: '10 10 10 10',
                                                text: 'Font Size'
                                            },
                                            {
                                                xtype: 'numberfield',
                                                margin: '0 10 0 10',
                                                width: '100%',
                                                minValue: 0,
                                                // value: btn_json["font_size"],
                                                listeners: {
                                                    'change': function(ths, newValue, oldValue, eOpts){
                                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                                        var btn = button_panel.down('#button_panel').el.query('a')[0]
                                                        btn.style.fontSize = newValue+"px"

                                                        var btn_json = Ext.decode(button_panel.button_json, true);
                                                        btn_json['font_size'] = newValue;
                                                        button_panel.button_json = JSON.stringify(btn_json);
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                    // {
                                    //     xtype: 'label',
                                    //     margin: '10 10 10 10',
                                    //     text: 'Font Size'
                                    // },
                                    // {
                                    //     xtype: 'numberfield',
                                    //     margin: '0 10 0 10',
                                    //     width: '100%',
                                    //     minValue: 0,
                                    //     value: btn_json["font_size"],
                                    //     listeners: {
                                    //         'change': function(ths, newValue, oldValue, eOpts){
                                    //             var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                    //             var btn = button_panel.down('#button_panel').el.query('a')[0]
                                    //             btn.style.fontSize = newValue+"px"

                                    //             var btn_json = Ext.decode(button_panel.button_json, true);
                                    //             btn_json['font_size'] = newValue;
                                    //             button_panel.button_json = JSON.stringify(btn_json);
                                    //         }
                                    //     }
                                    // }
                                ]
                            }
                        ]

                    }
                ],
                listeners: {
                    'tabchange': function(tabPanel, newCard, oldCard, eOpts){
                        var local = {'fb': 'facebook', 'g': 'google', 'tw': 'twitter'}
                        console.log(newCard);
                        connect_type = Ext.ComponentQuery.query('#login_connect_type')[0]
                        console.log(connect_type);
                        switch(newCard.title){
                            case "Link":
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
                                var btn = button_panel.down('#button_panel').update('<a style="text-decoration: none;" href="#">Connect With '+CaptivePortal.util.Utility.capitalizeFirstLetter(local[connect_type.value])+'</a>');
                                newCard.down()
                                break;
                            case "Button":
                                var str = '<a href="#"><button type="button" class="fbBtn edtBtn btn-default"><span style="margin-right: 5px;" class="icon"><i class="fa fa-facebook"></i></span><span class="text">Login</span></button></a>'
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
                                var btn = button_panel.down('#button_panel').update(str);
                                break;
                        }
                    }
                }
            }
            // {
            //     xtype: 'panel',
            //     layout: 'vbox',
            //     width: '100%',
            //     items: [
            //         {
            //             xtype: 'label',
            //             margin: '10 10 10 10',
            //             text: 'Login Type'
            //         },
            //         {
            //             xtype: 'combobox',
            //             margin: '0 10 0 10',
            //             width: '100%',
            //             allowBlank: false,
            //             name: 'gateway_type',
            //             queryMode: 'local',
            //             itemId: 'gateway_type',
            //             valueField: 'id',
            //             value: this.gateway_type ? this.gateway_type : 'Facebook',
            //             displayField: 'name',
            //             store: 'CaptivePortal.store.editor.LoginButtonTypes',
            //             listeners: {
            //                 'select': function(combo, record, eOpts ){
            //                     var local = {'fb': 'facebook', 'g': 'google', 'tw': 'twitter'}
            //                     console.log("..........select ............");
            //                     console.log(record);
            //                     var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
            //                     var login_button = button_panel.down('#button_panel').el.query('.edtBtn')[0];
            //                     // window.abc = button_panel;
            //                     login_button.className = record.id+'Btn'+' edtBtn btn-default';
            //                     button_panel.down('#button_panel').el.query('i')[0].className = "fa fa-"+local[record.id];

            //                     Ext.ComponentQuery.query("#"+this.up('.login_button_setting').el.down('.btn_text').id)[0].setValue('Login');
            //                     // window.abc = this.up('.login_button_setting');
            //                     // login_button.classList.remove(record.id+'Btn')
            //                     // login_button.classList.remove(record.id+'Btn')
            //                 }
            //             }
            //         }
            //     ]
            // },
            // {
            //     xtype: 'panel',
            //     layout: 'vbox',
            //     width: '100%',
            //     items: [
            //         {
            //             xtype: 'label',
            //             margin: '10 10 10 10',
            //             text: 'Text'
            //         },
            //         {
            //             xtype: 'textfield',
            //             margin: '0 10 0 10',
            //             width: '100%',
            //             cls: 'btn_text',
            //             value: btn_json["text"],
            //             listeners: {
            //                 'change': function(){
            //                     var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
            //                     button_panel.down('#button_panel').el.query('.text')[0].textContent = this.value
            //                     var btn_json = Ext.decode(button_panel.button_json, true);
            //                     btn_json['text'] = this.value;
            //                     button_panel.button_json = JSON.stringify(btn_json);
            //                 }
            //             }
            //         }
            //     ]
            // },
            // {
            //     xtype: 'panel',
            //     layout: 'vbox',
            //     width: '100%',
            //     items: [
            //         {
            //             xtype: 'label',
            //             margin: '10 10 10 10',
            //             text: 'Font Size'
            //         },
            //         {
            //             xtype: 'numberfield',
            //             margin: '0 10 0 10',
            //             width: '100%',
            //             minValue: 0,
            //             value: btn_json["font_size"],
            //             listeners: {
            //                 'change': function(ths, newValue, oldValue, eOpts){
            //                     var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
            //                     var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
            //                     btn.style.fontSize = newValue+"px"

            //                     var btn_json = Ext.decode(button_panel.button_json, true);
            //                     btn_json['font_size'] = newValue;
            //                     button_panel.button_json = JSON.stringify(btn_json);
            //                 }
            //             }
            //         }
            //     ]
            // },
            // {
            //     xtype: 'panel',
            //     layout: 'vbox',
            //     width: '100%',
            //     items: [
            //         {
            //             xtype: 'label',
            //             margin: '10 10 10 10',
            //             text: 'Radius'
            //         },
            //         {
            //             xtype: 'numberfield',
            //             margin: '0 10 0 10',
            //             width: '100%',
            //             minValue: 0,
            //             value: btn_json["border_radius"],
            //             listeners: {
            //                 'change': function(ths, newValue, oldValue, eOpts){
            //                     var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
            //                     var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
            //                     btn.style.borderRadius = newValue+"px"

            //                     var btn_json = Ext.decode(button_panel.button_json, true);
            //                     btn_json['border_radius'] = newValue;
            //                     button_panel.button_json = JSON.stringify(btn_json);
            //                 }
            //             }
            //         }
            //     ]
            // },
            // {
            //     xtype: 'panel',
            //     layout: 'vbox',
            //     width: '100%',
            //     items: [
            //         {
            //             xtype: 'label',
            //             margin: '10 10 10 10',
            //             text: 'Size'
            //         },
            //         {
            //             xtype: 'sliderfield',
            //             margin: '0 10 0 10',
            //             width: '100%',
            //             value: btn_json["padding_val"],
            //             increment: 5,
            //             minValue: 0,
            //             maxValue: 25,
            //             listeners: {
            //                 change: function(slider, newValue, thumb, eOpts){
            //                     var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
            //                     var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
            //                     var newPadding = newValue+"px"+" "+newValue*2+"px"
            //                     btn.style.padding = newPadding

            //                     var btn_json = Ext.decode(button_panel.button_json, true);
            //                     btn_json['padding_val'] = newValue;
            //                     button_panel.button_json = JSON.stringify(btn_json);
            //                 }
            //             }
            //         }
            //     ]
            // }
        ]
        this.callParent(arguments);
    }
});